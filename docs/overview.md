# Gitlab Runner

## Table Of Contents

- [Gitlab Runner](#gitlab-runner)
  - [Table Of Contents](#table-of-contents)
    - [Application Overview](#application-overview)
    - [Daily Application Use](#daily-application-use)
    - [Integrations](#integrations)
      - [Prometheus](#prometheus)
        - [Prerequisites](#prerequisites)
        - [Configuration Items](#configuration-items)
        - [List of metrics gathered](#list-of-metrics-gathered)
        - [Verification](#verification)
      - [Elastic](#elastic)
        - [Pre-requisites](#pre-requisites)
        - [Configuration Items](#configuration-items-1)
      - [Global Shared Gitlab Runner](#global-shared-gitlab-runner)
      - [Useful Queries](#useful-queries)
      - [Network Policies](#network-policies)
      - [Troubleshooting Tips](#troubleshooting-tips)

### Application Overview

GitLab Runner is the open source project that is used to run your jobs and send the results back to GitLab. It is used in conjunction with GitLab CI/CD, the open-source continuous integration service included with GitLab that coordinates the jobs.
The gitlab-runner pod is deployed via a Helm chart into its own dedicated **`gitlab-runner`** namespace for improved security and isolation.

**Note:** If using the `autoRegister.enabled=true` feature (default when enabling via Big Bang umbrella values), **Kyverno is required**. A Kyverno policy (`sync-gitlab-runner-secret`) is used to automatically copy the necessary registration token secret from the `gitlab` namespace to the `gitlab-runner` namespace. See the [Global Shared Gitlab Runner](#global-shared-gitlab-runner) section for more details.

### Daily Application Use

Gitlab Runner is configured to run as a globally shared runner.  Any repository in the gitlab installation will have this runner available for CI/CD pipelines. This runner automatically registers with the gitlab installation upon installation.

This globally shared gitlab-runner pod can be seen in any repository CI/CD Settings page eg:
<https://code.bigbang.dev/GROUP/PROJECT/-/settings/ci_cd>

The runner uses the IronBank RedHat UBI8 image to run jobs.

### Integrations

#### Prometheus

##### Prerequisites

- Monitoring stack or Prometheus

##### Configuration Items

Setting `metrics.enabled` to `true` will expose the gitlab-runner `/metrics` endpoint to the cluster using port 9252.
If using the monitoring stack with BigBang, it will detect that gitlab-runner is enabled and automatically create a service monitor to scrape the endpoint with Prometheus.

##### List of metrics gathered

The exposed information includes:

- Runner business logic metrics (e.g., the number of currently running jobs)
- Go-specific process metrics (garbage collection stats, goroutines, memstats, etc.)
- General process metrics (memory usage, CPU usage, file descriptor usage, etc.)
- Build version information

Reference: [GitLab Runner monitoring](https://docs.gitlab.com/runner/monitoring/)

##### Verification

To verify that the metrics are working, open a browser to your prometheus endpoint (e.g. <https://prometheus.bigbang.dev>).  Under `Status`, select `Targets`.  You should find `monitoring/gitlab-gitlab-runner/0` (if using Big Bang) or the name of your Service Monitor as a target and the State should be `UP`.

#### Elastic

##### Pre-requisites

- Monitoring stack is deployed
- ECK stack deployed

##### Configuration Items

- Login to Kibana
  - Username: elastic
  - Password: obtain with `kubectl get secret logging-ek-es-elastic-user -n logging -o json | jq -r .data.elastic | base64 -d`
- Create Index by selecting `Management` > `Stack Management` from the left menu, then click `Kibana` > `Index patterns`.  In the Create Index patterns enter `logstash-*` and click `Create index pattern`.  In the the next step, click on the time filed dropdown and select `@timestamp`.  Finally, create `Create index pattern`
- To use the index, click `Kibana` > `Discovery` on the side menu.  In the KQL entry box, enter `kubernetes.labels.release : "gitlab-runner"` and press enter.

#### Global Shared Gitlab Runner

On a default installation, there will be a single pod loaded in the format `gitlab-runner-gitlab-runner-#` in the **`gitlab-runner`** namespace as shown below.

```bash
# Example from gitlab-runner namespace
NAME                                          READY   STATUS    RESTARTS   AGE
gitlab-runner-gitlab-runner-7d48f9cc9c-abcde  1/1     Running   0          42m
```

**Important Note on Namespace and Auto-Registration:**
As mentioned in the Application Overview, GitLab Runner resides in its own `gitlab-runner` namespace, separate from the main GitLab components in the `gitlab` namespace. This enhances security.

For the runner to automatically register with GitLab (`autoRegister.enabled=true`), it needs access to the registration token stored in the `gitlab-gitlab-runner-secret` within the `gitlab` namespace. Since Kubernetes namespaces provide isolation, direct access is blocked.

Big Bang solves this using a **Kyverno ClusterPolicy** named `sync-gitlab-runner-secret`. This policy automatically:

1. Detects the `gitlab-runner` namespace.
2. Clones the `gitlab-gitlab-runner-secret` from the `gitlab` namespace into the `gitlab-runner` namespace.
3. Keeps the cloned secret synchronized with the original.

This ensures the runner in the `gitlab-runner` namespace can securely obtain the token needed for registration without compromising namespace isolation. **Kyverno must be installed and functional for auto-registration to work.**

#### Useful Queries

- `kubernetes.pod_name : "gitlab-runner-gitlab-runner-#"` to get logs from a specific # pod
- `kubernetes.container_name : "gitlab-runner-gitlab-runner"` to get logs from a specific container
- `kubernetes.labels.release : "gitlab-runner"` to get logs from all gitlab runners

#### Network Policies

By default, Gitlab Runner egress for runner jobs is locked down within its dedicated `gitlab-runner` namespace. You can dynamically create additional network policies with a values override. For example:

```yaml
networkPolicies:
  additionalPolicies:
  # expected use case is to open egress for runner jobs
  # This is a dev example policy spec and CIDR 0.0.0.0/0 is unsafe for operational environments
  # requests to controlPlane should also be blocked in an operational policy
  - name: egress-runner-jobs
    spec: 
      podSelector: {}
      policyTypes:
      - Egress
      egress:
      - to:
        - ipBlock:
            cidr: 0.0.0.0/0
            except:
            # Block requests to AWS cloud metadata IP
            - 169.254.169.254/32
            # Block requests to controlPlane if CIDR not 0.0.0.0/0
            - "{{ $.Values.networkPolicies.controlPlaneCidr }}"
```

**Note:** By default, the Big Bang Gitlab Runner package is configured to pull kubernetes executor images from registry1.dso.mil. Also, the gitlab-runner pod will require egress to the kube-apiserver in order to create pods for CI jobs. The networkPolicy templates handle creation of the necessary policy.

#### Troubleshooting Tips

- The gitlab-runner is configured to clone the repository from the gitlab webservice via the "clone_url" setting. This setting typically points to the GitLab instance's external URL or internal service name (e.g., `gitlab-webservice.gitlab.svc...`). The runner also uses this endpoint (or the one specified in `gitlabUrl`) to register with the GitLab API.
- If the GitLab instance (webservice) is behind HTTPS ingress and uses a certificate not trusted by the runner's environment (e.g., a self-signed or private CA), certificate issues can occur during cloning or registration. In such cases, the `certsSecretName` value in `values.yaml` can be populated with the name of a secret containing the necessary CA certificate (`ca.crt`) and optionally client certificates (`tls.crt`, `tls.key`). The runner will mount these certificates to establish trust.
- **Registration Failure:** If the runner fails to register (often seen as errors in the runner pod logs about failing to connect or register), and you have `autoRegister.enabled=true`, verify the following:
  - Kyverno is installed and running correctly in the cluster.
  - The Kyverno `ClusterPolicy` named `sync-gitlab-runner-secret` exists and is active.
  - Check if the `gitlab-gitlab-runner-secret` has been successfully created/synced into the `gitlab-runner` namespace (`kubectl get secret gitlab-gitlab-runner-secret -n gitlab-runner`). If this secret is missing, the runner cannot get the token to register. Investigate Kyverno policy status and logs.
