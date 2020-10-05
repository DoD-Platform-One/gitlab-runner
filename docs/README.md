# Gitlab Runner

## Table Of Contents

- Application Overview
- Daily Application Use
- Integrations
    - Prometheus
    - ECK
- Troubleshooting Tips

### Application Overview

GitLab Runner is the open source project that is used to run your jobs and send the results back to GitLab. It is used in conjunction with GitLab CI/CD, the open-source continuous integration service included with GitLab that coordinates the jobs.
The global-shared-gitlab-runner pod is deployed in the gitlab namespace.
Deployed via Helm Chart.

### Daily Application Use

Gitlab Runner is configured to have a single pod run as a globally shared runner, so any repository configured with the connected gitlab installation will have a single runner pod available for use. This runner automatically registers with the gitlab installation using it's kubernetes service URL upon installation.

This globally shared gitlab-runner pod can be seen in any repository CI/CD Settings page eg:
https://code.fences.dsop.io/GROUP/PROJECT/-/settings/ci_cd

The runner has a single UBI8 based image from the IronBank available to it to run jobs on as specified in the values.yml file.

### Integrations

#### Prometheus.md

#### Configuration Items

Metrics are exposed via a built in configuration within the helm chart and the corresponding values.yml file.

#### List of metrics gathered

The exposed information includes:
  - Runner business logic metrics (e.g., the number of currently running jobs)
  - Go-specific process metrics (garbage collection stats, goroutines, memstats, etc.)
  - General process metrics (memory usage, CPU usage, file descriptor usage, etc.)
  - Build version information 

#### Elastic.md

#### Pre-requisites
- Monitoring stack is deployed
- ECK stack deployed

#### Configuration Items

- Login to Kibana
  - username: elastic
  - Password : can be obtained by querying kubectl get secret elasticsearch-es-elastic-user -n elastic -o yaml
- Create Index by  selecting Management icon from the left menu and  clicking Index patterns under Kibana.  In the Create Index patterns enter <gitlab-*> and click create index pattern.  In the the next step Click on the dropdown and select "@timestamp"

- For Search click on Discovery from the side menu

- In KQL textbox enter `kubernetes.labels.app : global-shared-gitlab-runner`

- Click Refresh/Update

- Note: Logs from the monitoring stack can be viewd on Kibana. The default index pattern is logstash-*. Logs for the entire gitlab installation can be procured by filtering on the "gitlab" namespace.

create an index pattern for fluentd if not already created
```
gitlab.*
```

There are several pods associated with various apps in a monitoring deployment.
See each app below in order to see how each pod is split.
These pods can be pulled via the command <code>kubectl get pods -n gitlab</code>.

#### Global Shared Gitlab Runner
There are several pods for alertmanager.   
On a default installation, there will be a single pod loaded in the format <code>global-shared-gitlab-runner-#</code> as shown below.
```
NAME                                          READY   STATUS    RESTARTS   AGE
global-shared-gitlab-runner-858b5c6796-s694b  1/1     Running   0          156m
```
Further filters that can be used are:

#### Useful Queries

- `kubernetes.pod_name`   = `global-shared-gitlab-runner-#` to get logs from a specific # pod
- `kubernetes.container_name` = `global-shared-gitlab-runner` to get logs from a specific container
