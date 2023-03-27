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
The gitlab-runner pod is deployed in the gitlab namespace via a Helm chart.

### Daily Application Use

Gitlab Runner is configured to run as a globally shared runner.  Any repository in the gitlab installation will have this runner available for CI/CD pipelines. This runner automatically registers with the gitlab installation upon installation.

This globally shared gitlab-runner pod can be seen in any repository CI/CD Settings page eg:
https://code.bigbang.dev/GROUP/PROJECT/-/settings/ci_cd

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

To verify that the metrics are working, open a browser to your prometheus endpoint (e.g. https://prometheus.bigbang.dev).  Under `Status`, select `Targets`.  You should find `monitoring/gitlab-gitlab-runner/0` (if using Big Bang) or the name of your Service Monitor as a target and the State should be `UP`.

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

On a default installation, there will be a single pod loaded in the format `gitlab-runner-gitlab-runner-#` in the `gitlab` namespace as shown below.

```bash
NAME                                          READY   STATUS    RESTARTS   AGE
gitlab-runner-gitlab-runner-858b5c6796-s694b  1/1     Running   0          156m
```

#### Useful Queries

- `kubernetes.pod_name : "gitlab-runner-gitlab-runner-#"` to get logs from a specific # pod
- `kubernetes.container_name : "gitlab-runner-gitlab-runner"` to get logs from a specific container
- `kubernetes.labels.release : "gitlab-runner"` to get logs from all gitlab runners

#### Network Policies

Big Bang 1.X
By default, Gitlab Runner will inherit the [network policies](https://repo1.dso.mil/big-bang/product/packages/gitlab/-/tree/main/chart/templates/bigbang/networkpolicies) from the Gitlab namespace. Until a long-term solution is implemented that works for all Platform One teams, Gitlab Runner users may manually create their own network policies for the Gitlab Runner pods. For example:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: runner-allow-egress
  namespace: gitlab
spec:
  policyTypes:
  - Egress
  podSelector:
    matchLabels:
      app: gitlab-runner-gitlab-runner
  egress:
  - to:
    - ipBlock:
        cidr: 0.0.0.0/0
        # ONLY Block requests to AWS metadata IP
        except:
        - 169.254.169.254/32

Big Bang 2.X
By default, Gitlab Runner egress for runner jobs is locked down. You can dynamicaly create additional network policies with a values override. For example:

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

The gitlab-runner is configured to clone the repository from the gitlab webservice via the "clone_url" setting so the runner clones from the same endpoint it uses to register with the gitlab webservice API which is the gitlab-webservice kubernetes service in the gitlab namespace.
If gitlab webservice is behind HTTPS ingress then within the values.yaml file "certSecretName" can be populated with certificate and key files if there are certificate issues when cloning.
