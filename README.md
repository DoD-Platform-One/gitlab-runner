<!-- Warning: Do not manually edit this file. See notes on gluon + helm-docs at the end of this file for more information. -->
# gitlab-runner

![Version: 0.77.2-bb.4](https://img.shields.io/badge/Version-0.77.2--bb.4-informational?style=flat-square) ![AppVersion: v18.0.2](https://img.shields.io/badge/AppVersion-v18.0.2-informational?style=flat-square) ![Maintenance Track: bb_integrated](https://img.shields.io/badge/Maintenance_Track-bb_integrated-green?style=flat-square)

GitLab Runner

## Upstream References

- <https://gitlab.com/gitlab-org/charts/gitlab-runner>
- <https://gitlab.com/gitlab-org/gitlab-runner>
- <https://docs.gitlab.com/runner/>

## Upstream Release Notes

- [Find our upstream chart's CHANGELOG here](https://gitlab.com/gitlab-org/charts/gitlab-runner/-/blob/v0.70.4/CHANGELOG.md)
- [and our upstream application release notes here](https://gitlab.com/gitlab-org/charts/gitlab-runner/-/blob/v0.70.4/CHANGELOG.md?ref_type=tags#v0704-2024-11-20)

## Learn More

- [Application Overview](docs/overview.md)
- [Other Documentation](docs/)

## Pre-Requisites

- Kubernetes Cluster deployed
- Kubernetes config installed in `~/.kube/config`
- Helm installed

Install Helm

https://helm.sh/docs/intro/install/

## Deployment

- Clone down the repository
- cd into directory

```bash
helm install gitlab-runner chart/
```

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| upstream.fullnameOverride | string | `"gitlab-runner"` |  |
| upstream.image.registry | string | `"registry1.dso.mil"` |  |
| upstream.image.image | string | `"ironbank/gitlab/gitlab-runner/gitlab-runner"` |  |
| upstream.image.tag | string | `"v18.0.2"` |  |
| upstream.useTini | bool | `true` |  |
| upstream.imagePullPolicy | string | `"IfNotPresent"` |  |
| upstream.livenessProbe | object | `{}` |  |
| upstream.readinessProbe | object | `{}` |  |
| upstream.gitlabUrl | string | `"http://gitlab-webservice-default.gitlab.svc.cluster.local:8181"` |  |
| upstream.unregisterRunners | bool | `true` |  |
| upstream.terminationGracePeriodSeconds | int | `3600` |  |
| upstream.concurrent | int | `50` |  |
| upstream.shutdown_timeout | int | `0` |  |
| upstream.checkInterval | int | `3` |  |
| upstream.sessionServer.enabled | bool | `false` |  |
| upstream.sessionServer.serviceType | string | `"LoadBalancer"` |  |
| upstream.sessionServer.ingress.enabled | bool | `false` |  |
| upstream.sessionServer.ingress.className | string | `""` |  |
| upstream.sessionServer.ingress.annotations | object | `{}` |  |
| upstream.sessionServer.ingress.tls[0].secretName | string | `"gitlab-runner-session-server"` |  |
| upstream.rbac.create | bool | `true` |  |
| upstream.rbac.generatedServiceAccountName | string | `""` |  |
| upstream.rbac.rules | list | `[]` |  |
| upstream.rbac.clusterWideAccess | bool | `false` |  |
| upstream.rbac.podSecurityPolicy.enabled | bool | `false` |  |
| upstream.rbac.podSecurityPolicy.resourceNames[0] | string | `"gitlab-runner"` |  |
| upstream.rbac.imagePullSecrets | list | `[]` |  |
| upstream.serviceAccount.name | string | `""` |  |
| upstream.serviceAccount.annotations | object | `{}` |  |
| upstream.serviceAccount.imagePullSecrets | list | `[]` |  |
| upstream.metrics.enabled | bool | `false` |  |
| upstream.metrics.portName | string | `"tcp-metrics"` |  |
| upstream.metrics.port | int | `9252` |  |
| upstream.metrics.serviceMonitor.enabled | bool | `false` |  |
| upstream.metrics.serviceMonitor.namespace | string | `""` |  |
| upstream.service.enabled | bool | `true` |  |
| upstream.service.type | string | `"ClusterIP"` |  |
| upstream.runners.job.registry | string | `"registry1.dso.mil"` |  |
| upstream.runners.job.repository | string | `"ironbank/redhat/ubi/ubi9"` |  |
| upstream.runners.job.tag | string | `"9.6"` |  |
| upstream.runners.helper.registry | string | `"registry1.dso.mil"` |  |
| upstream.runners.helper.repository | string | `"ironbank/gitlab/gitlab-runner/gitlab-runner-helper"` |  |
| upstream.runners.helper.tag | string | `"v18.0.2"` |  |
| upstream.runners.config | string | `"[[runners]]\n  clone_url = \"http://gitlab-webservice-default.gitlab.svc.cluster.local:8181\"\n  cache_dir = \"/tmp/gitlab-runner/cache\"\n  [runners.kubernetes]\n    pull_policy = \"always\"\n    namespace = \"{{.Release.Namespace}}\"\n    image = \"{{ printf \"%s/%s:%s\" .Values.runners.job.registry .Values.runners.job.repository .Values.runners.job.tag }}\"\n    helper_image = \"{{ printf \"%s/%s:%s\" .Values.runners.helper.registry .Values.runners.helper.repository .Values.runners.helper.tag }}\"\n    image_pull_secrets = [\"private-registry\"]\n  [runners.kubernetes.pod_security_context]\n    run_as_non_root = true\n    run_as_user = 1001\n  [runners.kubernetes.helper_container_security_context]\n    run_as_non_root = true\n    run_as_user = 1001\n  [runners.kubernetes.pod_labels]\n    \"job_id\" = \"${CI_JOB_ID}\"\n    \"job_name\" = \"${CI_JOB_NAME}\"\n    \"pipeline_id\" = \"${CI_PIPELINE_ID}\"\n    \"app\" = \"gitlab-runner\"\n"` |  |
| upstream.runners.configPath | string | `""` |  |
| upstream.runners.secret | string | `"gitlab-gitlab-runner-secret"` |  |
| upstream.runners.cache | object | `{}` |  |
| upstream.runners.builds | object | `{}` |  |
| upstream.runners.services | object | `{}` |  |
| upstream.runners.helpers | object | `{}` |  |
| upstream.topologySpreadConstraints | object | `{}` |  |
| upstream.securityContext.allowPrivilegeEscalation | bool | `false` |  |
| upstream.securityContext.readOnlyRootFilesystem | bool | `false` |  |
| upstream.securityContext.runAsNonRoot | bool | `true` |  |
| upstream.securityContext.runAsUser | int | `1001` |  |
| upstream.securityContext.runAsGroup | int | `1001` |  |
| upstream.securityContext.privileged | bool | `false` |  |
| upstream.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| upstream.strategy | object | `{}` |  |
| upstream.podSecurityContext.runAsUser | int | `1001` |  |
| upstream.podSecurityContext.runAsNonRoot | bool | `true` |  |
| upstream.podSecurityContext.fsGroup | int | `65533` |  |
| upstream.containerSecurityContext.runAsNonRoot | bool | `true` |  |
| upstream.capabilities.drop[0] | string | `"ALL"` |  |
| upstream.resources.limits.memory | string | `"256Mi"` |  |
| upstream.resources.limits.cpu | string | `"200m"` |  |
| upstream.resources.requests.memory | string | `"256Mi"` |  |
| upstream.resources.requests.cpu | string | `"200m"` |  |
| upstream.affinity | object | `{}` |  |
| upstream.runtimeClassName | string | `""` |  |
| upstream.nodeSelector | object | `{}` |  |
| upstream.tolerations | list | `[]` |  |
| upstream.extraEnv | object | `{}` |  |
| upstream.extraEnvFrom | object | `{}` |  |
| upstream.hostAliases | list | `[]` |  |
| upstream.deploymentAnnotations | object | `{}` |  |
| upstream.deploymentLabels | object | `{}` |  |
| upstream.deploymentLifecycle | object | `{}` |  |
| upstream.podAnnotations | object | `{}` |  |
| upstream.podLabels | object | `{}` |  |
| upstream.priorityClassName | string | `""` |  |
| upstream.secrets | list | `[]` |  |
| upstream.configMaps | object | `{}` |  |
| upstream.volumeMounts | list | `[]` |  |
| upstream.volumes | list | `[]` |  |
| upstream.extraObjects | list | `[]` |  |
| istio.enabled | bool | `false` |  |
| istio.injection | string | `"disabled"` |  |
| istio.hardened.enabled | bool | `false` |  |
| istio.hardened.outboundTrafficPolicyMode | string | `"REGISTRY_ONLY"` |  |
| istio.hardened.customServiceEntries | list | `[]` |  |
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
| networkPolicies.kubeAPIPort | string | `""` | Kube API Port, defaults to 443 and 6443 within the template but can be set to custom port The port where the Kubernetes API server listens for secure connections. |
| networkPolicies.additionalPolicies | list | `[]` |  |
| autoRegister.enabled | bool | `false` |  |
| autoRegister.selectorLabels | object | `{}` |  |
| bbtests.enabled | bool | `false` |  |
| bbtests.cypress.artifacts | bool | `true` |  |
| bbtests.cypress.envs.cypress_url | string | `"http://gitlab-webservice-default.gitlab.svc.cluster.local:8181"` |  |
| bbtests.cypress.envs.cypress_gitlab_project | string | `"runner-hello-world"` |  |
| bbtests.cypress.secretEnvs[0].name | string | `"cypress_adminpassword"` |  |
| bbtests.cypress.secretEnvs[0].valueFrom.secretKeyRef.name | string | `"gitlab-gitlab-initial-root-password"` |  |
| bbtests.cypress.secretEnvs[0].valueFrom.secretKeyRef.key | string | `"password"` |  |
| openshift | bool | `false` |  |
| extraContainers | list | `[]` |  |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.

---

_This file is programatically generated using `helm-docs` and some BigBang-specific templates. The `gluon` repository has [instructions for regenerating package READMEs](https://repo1.dso.mil/big-bang/product/packages/gluon/-/blob/master/docs/bb-package-readme.md)._

