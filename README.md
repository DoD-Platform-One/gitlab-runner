# gitlab-runner

![Version: 0.65.0-bb.0](https://img.shields.io/badge/Version-0.65.0--bb.0-informational?style=flat-square) ![AppVersion: 17.0.0](https://img.shields.io/badge/AppVersion-17.0.0-informational?style=flat-square)

GitLab Runner

## Upstream References

* <https://gitlab.com/gitlab-org/charts/gitlab-runner>
* <https://gitlab.com/gitlab-org/gitlab-runner>
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
| image.registry | string | `"registry1.dso.mil"` |  |
| image.image | string | `"ironbank/gitlab/gitlab-runner/gitlab-runner"` |  |
| image.tag | string | `"v17.0.0"` |  |
| useTini | bool | `true` |  |
| imagePullPolicy | string | `"IfNotPresent"` |  |
| gitlabUrl | string | `"http://gitlab-webservice-default.gitlab.svc.cluster.local:8181"` |  |
| terminationGracePeriodSeconds | int | `3600` |  |
| concurrent | int | `50` |  |
| shutdown_timeout | int | `0` |  |
| checkInterval | int | `3` |  |
| sessionServer.enabled | bool | `false` |  |
| rbac.create | bool | `true` |  |
| rbac.generatedServiceAccountName | string | `""` |  |
| rbac.rules | list | `[]` |  |
| rbac.clusterWideAccess | bool | `false` |  |
| rbac.podSecurityPolicy.enabled | bool | `false` |  |
| rbac.podSecurityPolicy.resourceNames[0] | string | `"gitlab-runner"` |  |
| metrics.enabled | bool | `false` |  |
| metrics.portName | string | `"tcp-metrics"` |  |
| metrics.port | int | `9252` |  |
| metrics.serviceMonitor.enabled | bool | `false` |  |
| service.enabled | bool | `true` |  |
| service.type | string | `"ClusterIP"` |  |
| runners.job.registry | string | `"registry1.dso.mil"` |  |
| runners.job.repository | string | `"ironbank/redhat/ubi/ubi9"` |  |
| runners.job.tag | string | `"9.4"` |  |
| runners.helper.registry | string | `"registry1.dso.mil"` |  |
| runners.helper.repository | string | `"ironbank/gitlab/gitlab-runner/gitlab-runner-helper"` |  |
| runners.helper.tag | string | `"v17.0.0"` |  |
| runners.config | string | `"[[runners]]\n  clone_url = \"http://gitlab-webservice-default.gitlab.svc.cluster.local:8181\"\n  cache_dir = \"/tmp/gitlab-runner/cache\"\n  [runners.kubernetes]\n    pull_policy = \"always\"\n    namespace = \"{{.Release.Namespace}}\"\n    image = \"{{ printf \"%s/%s:%s\" .Values.runners.job.registry .Values.runners.job.repository .Values.runners.job.tag }}\"\n    helper_image = \"{{ printf \"%s/%s:%s\" .Values.runners.helper.registry .Values.runners.helper.repository .Values.runners.helper.tag }}\"\n    image_pull_secrets = [\"private-registry\"]\n  [runners.kubernetes.pod_security_context]\n    run_as_non_root = true\n    run_as_user = 1001\n  [runners.kubernetes.helper_container_security_context]\n    run_as_non_root = true\n    run_as_user = 1001\n  [runners.kubernetes.pod_labels]\n    \"job_id\" = \"${CI_JOB_ID}\"\n    \"job_name\" = \"${CI_JOB_NAME}\"\n    \"pipeline_id\" = \"${CI_PIPELINE_ID}\"\n    \"app\" = \"gitlab-runner\"\n"` |  |
| runners.configPath | string | `""` |  |
| runners.locked | bool | `false` |  |
| runners.runUntagged | bool | `true` |  |
| runners.protected | bool | `true` |  |
| runners.secret | string | `"gitlab-gitlab-runner-secret"` |  |
| runners.cache | object | `{}` |  |
| runners.builds | object | `{}` |  |
| runners.services | object | `{}` |  |
| runners.helpers | object | `{}` |  |
| topologySpreadConstraints | object | `{}` |  |
| securityContext.allowPrivilegeEscalation | bool | `false` |  |
| securityContext.readOnlyRootFilesystem | bool | `false` |  |
| securityContext.runAsNonRoot | bool | `true` |  |
| securityContext.runAsUser | int | `1001` |  |
| securityContext.runAsGroup | int | `1001` |  |
| securityContext.privileged | bool | `false` |  |
| securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| strategy | object | `{}` |  |
| podSecurityContext.runAsUser | int | `1001` |  |
| podSecurityContext.runAsNonRoot | bool | `true` |  |
| podSecurityContext.fsGroup | int | `65533` |  |
| containerSecurityContext.runAsNonRoot | bool | `true` |  |
| capabilities.drop[0] | string | `"ALL"` |  |
| resources.limits.memory | string | `"256Mi"` |  |
| resources.limits.cpu | string | `"200m"` |  |
| resources.requests.memory | string | `"256Mi"` |  |
| resources.requests.cpu | string | `"200m"` |  |
| affinity | object | `{}` |  |
| nodeSelector | object | `{}` |  |
| tolerations | list | `[]` |  |
| extraEnv | object | `{}` |  |
| extraEnvFrom | object | `{}` |  |
| hostAliases | list | `[]` |  |
| deploymentAnnotations | object | `{}` |  |
| deploymentLabels | object | `{}` |  |
| podAnnotations | object | `{}` |  |
| podLabels | object | `{}` |  |
| priorityClassName | string | `""` |  |
| secrets | list | `[]` |  |
| configMaps | object | `{}` |  |
| volumeMounts | list | `[]` |  |
| volumes | list | `[]` |  |
| extraObjects | list | `[]` |  |
| istio.enabled | bool | `false` |  |
| istio.hardened.enabled | bool | `false` |  |
| istio.hardened.outboundTrafficPolicyMode | string | `"REGISTRY_ONLY"` |  |
| istio.hardened.customServiceEntries | list | `[]` |  |
| istio.injection | string | `"disabled"` |  |
| istio.hardened.enabled | bool | `false` |  |
| istio.hardened.customAuthorizationPolicies | list | `[]` |  |
| istio.hardened.gitlab.enabled | bool | `true` |  |
| istio.hardened.gitlab.namespaces[0] | string | `"gitlab"` |  |
| istio.hardened.monitoring.enabled | bool | `true` |  |
| istio.hardened.monitoring.namespaces[0] | string | `"monitoring"` |  |
| istio.hardened.monitoring.principals[0] | string | `"cluster.local/ns/monitoring/sa/monitoring-grafana"` |  |
| istio.hardened.monitoring.principals[1] | string | `"cluster.local/ns/monitoring/sa/monitoring-monitoring-kube-alertmanager"` |  |
| istio.hardened.monitoring.principals[2] | string | `"cluster.local/ns/monitoring/sa/monitoring-monitoring-kube-operator"` |  |
| istio.hardened.monitoring.principals[3] | string | `"cluster.local/ns/monitoring/sa/monitoring-monitoring-kube-prometheus"` |  |
| istio.hardened.monitoring.principals[4] | string | `"cluster.local/ns/monitoring/sa/monitoring-monitoring-kube-state-metrics"` |  |
| istio.hardened.monitoring.principals[5] | string | `"cluster.local/ns/monitoring/sa/monitoring-monitoring-prometheus-node-exporter"` |  |
| istio.mtls | object | `{"mode":"STRICT"}` | Default peer authentication |
| istio.mtls.mode | string | `"STRICT"` | STRICT = Allow only mutual TLS traffic, PERMISSIVE = Allow both plain text and mutual TLS traffic |
| monitoring.enabled | bool | `false` |  |
| networkPolicies.enabled | bool | `false` |  |
| networkPolicies.controlPlaneCidr | string | `"0.0.0.0/0"` |  |
| networkPolicies.kubeAPIPort | string | `""` | Kube API Port, defaults to 443 and 6443 within the template but can be set to custom port The port where the Kubernetes API server listens for secure connections.  |
| networkPolicies.additionalPolicies | list | `[]` |  |
| autoRegister.enabled | bool | `false` |  |
| bbtests.enabled | bool | `false` |  |
| bbtests.cypress.artifacts | bool | `true` |  |
| bbtests.cypress.envs.cypress_url | string | `"http://gitlab-webservice-default.gitlab.svc.cluster.local:8181"` |  |
| bbtests.cypress.envs.cypress_gitlab_project | string | `"runner-hello-world"` |  |
| bbtests.cypress.secretEnvs[0].name | string | `"cypress_adminpassword"` |  |
| bbtests.cypress.secretEnvs[0].valueFrom.secretKeyRef.name | string | `"gitlab-gitlab-initial-root-password"` |  |
| bbtests.cypress.secretEnvs[0].valueFrom.secretKeyRef.key | string | `"password"` |  |
| openshift | bool | `false` |  |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.
