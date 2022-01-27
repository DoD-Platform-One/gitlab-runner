# gitlab-runner

![Version: 0.36.0-bb.1](https://img.shields.io/badge/Version-0.36.0--bb.1-informational?style=flat-square) ![AppVersion: 14.6.0](https://img.shields.io/badge/AppVersion-14.6.0-informational?style=flat-square)

GitLab Runner

## Upstream References

* <https://hub.docker.com/r/gitlab/gitlab-runner/>
* <https://docs.gitlab.com/runner/>

## Learn More
* [Application Overview](docs/overview.md)
* [Other Documentation](docs/)

## Pre-Requisites

* Kubernetes Cluster deployed
* Kubernetes config installed in `~/.kube/config`
* Helm installed

Install Helm

https://helm.sh/docs/intro/install/

## Deployment

* Clone down the repository
* cd into directory
```bash
helm install gitlab-runner chart/
```

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| image | string | `"registry1.dso.mil/ironbank/gitlab/gitlab-runner/gitlab-runner:v14.6.0"` |  |
| imagePullPolicy | string | `"IfNotPresent"` |  |
| gitlabUrl | string | `"http://gitlab-webservice-default.gitlab.svc.cluster.local:8181"` |  |
| unregisterRunners | bool | `true` |  |
| terminationGracePeriodSeconds | int | `3600` |  |
| concurrent | int | `50` |  |
| checkInterval | int | `30` |  |
| rbac.create | bool | `true` |  |
| rbac.rules | list | `[]` |  |
| rbac.clusterWideAccess | bool | `false` |  |
| rbac.podSecurityPolicy.enabled | bool | `false` |  |
| rbac.podSecurityPolicy.resourceNames[0] | string | `"gitlab-runner"` |  |
| metrics.enabled | bool | `false` |  |
| metrics.portName | string | `"metrics"` |  |
| metrics.port | int | `9252` |  |
| metrics.serviceMonitor.enabled | bool | `false` |  |
| service.enabled | bool | `true` |  |
| service.type | string | `"ClusterIP"` |  |
| runners.config | string | `"[[runners]]\n  clone_url = \"http://gitlab-webservice-default.gitlab.svc.cluster.local:8181\"\n  cache_dir = \"/tmp/gitlab-runner/cache\"\n  [runners.kubernetes]\n    namespace = \"{{.Release.Namespace}}\"\n    image = \"registry1.dso.mil/ironbank/redhat/ubi/ubi8:8.4\"\n    helper_image = \"registry1.dso.mil/ironbank/gitlab/gitlab-runner/gitlab-runner-helper:v14.4.0\"\n    image_pull_secrets = [\"private-registry\"]\n  [runners.kubernetes.pod_labels]\n    \"job_id\" = \"${CI_JOB_ID}\"\n    \"job_name\" = \"${CI_JOB_NAME}\"\n    \"pipeline_id\" = \"${CI_PIPELINE_ID}\"\n"` |  |
| runners.locked | bool | `false` |  |
| runners.runUntagged | bool | `true` |  |
| runners.protected | bool | `true` |  |
| runners.secret | string | `"gitlab-gitlab-runner-secret"` |  |
| runners.cache | object | `{}` |  |
| runners.builds | object | `{}` |  |
| runners.services | object | `{}` |  |
| runners.helpers | object | `{}` |  |
| securityContext.runAsUser | int | `998` |  |
| securityContext.fsGroup | int | `996` |  |
| resources.limits.memory | string | `"256Mi"` |  |
| resources.limits.cpu | string | `"200m"` |  |
| resources.requests.memory | string | `"256Mi"` |  |
| resources.requests.cpu | string | `"200m"` |  |
| affinity | object | `{}` |  |
| nodeSelector | object | `{}` |  |
| tolerations | list | `[]` |  |
| hostAliases | list | `[]` |  |
| podAnnotations | object | `{}` |  |
| podLabels | object | `{}` |  |
| secrets | list | `[]` |  |
| configMaps | object | `{}` |  |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.
