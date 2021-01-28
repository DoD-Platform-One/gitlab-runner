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

To verify that the metrics are working, open a browser to your prometheus endpoint (e.g. https://prometheus.bigbang.dev).  Under `Status`, select `Targets`.  You should find `gitlab/gitlab-runner/0` as a target and the State should be `UP`.

#### Elastic

##### Pre-requisites

- Monitoring stack is deployed
- ECK stack deployed

##### Configuration Items

- Login to Kibana
  - username: elastic
  - Password : can be obtained by querying kubectl get secret elasticsearch-es-elastic-user -n elastic -o yaml
- Create Index by  selecting Management icon from the left menu and  clicking Index patterns under Kibana.  In the Create Index patterns enter <gitlab-*> and click create index pattern.  In the the next step Click on the dropdown and select "@timestamp"

- For Search click on Discovery from the side menu

- In KQL textbox enter `kubernetes.labels.app : global-shared-gitlab-runner`

- Click Refresh/Update

- Note: Logs from the monitoring stack can be viewd on Kibana. The default index pattern is logstash-*. Logs for the entire gitlab installation can be procured by filtering on the "gitlab" namespace.

create an index pattern for fluentd if not already created

```bash
gitlab.*
```

There are several pods associated with various apps in a monitoring deployment.
See each app below in order to see how each pod is split.
These pods can be pulled via the command `kubectl get pods -n gitlab`.

#### Global Shared Gitlab Runner

There are several pods for alertmanager.
On a default installation, there will be a single pod loaded in the format `global-shared-gitlab-runner-#` as shown below.

```bash
NAME                                          READY   STATUS    RESTARTS   AGE
global-shared-gitlab-runner-858b5c6796-s694b  1/1     Running   0          156m
```

Further filters that can be used are:

#### Useful Queries

- `kubernetes.pod_name`   = `global-shared-gitlab-runner-#` to get logs from a specific # pod
- `kubernetes.container_name` = `global-shared-gitlab-runner` to get logs from a specific container

#### Troubleshooting Tips

The gitlab-runner is configured to clone the repository from the gitlab webservice via the "clone_url" setting sqo the runner clones from the same endpoint it uses to register with the gitlab webservice API which is the gitlab-webservice kubernetes service in the gitlab namespace.
If gitlab webservice is behind HTTPS ingress then within the values.yaml file "certSecretName" can be populated with certificate and key files if there are certificate issues when cloning.
