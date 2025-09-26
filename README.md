<!-- Warning: Do not manually edit this file. See notes on gluon + helm-docs at the end of this file for more information. -->
# gitlab-runner

![Version: 0.81.0-bb.0](https://img.shields.io/badge/Version-0.81.0--bb.0-informational?style=flat-square) ![AppVersion: v18.4.0](https://img.shields.io/badge/AppVersion-v18.4.0-informational?style=flat-square) ![Maintenance Track: bb_integrated](https://img.shields.io/badge/Maintenance_Track-bb_integrated-green?style=flat-square)

GitLab Runner

## Upstream References

- <https://gitlab.com/gitlab-org/charts/gitlab-runner>
- <https://gitlab.com/gitlab-org/gitlab-runner>
- <https://docs.gitlab.com/runner/>

## Upstream Release Notes

- [Find our upstream chart's CHANGELOG here](https://gitlab.com/gitlab-org/charts/gitlab-runner/-/blob/v0.79.0/CHANGELOG.md)
- [and our upstream application release notes here](https://gitlab.com/gitlab-org/charts/gitlab-runner/-/blob/v0.79.0/CHANGELOG.md?ref_type=tags#v0790-2025-07-12)

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
| upstream.fullnameOverride | string | `"gitlab-runner"` |  |
| upstream.image.registry | string | `"registry1.dso.mil"` |  |
| upstream.image.image | string | `"ironbank/gitlab/gitlab-runner/gitlab-runner"` |  |
| upstream.image.tag | string | `"v18.3.0"` |  |
| upstream.useTini | bool | `true` |  |
| upstream.gitlabUrl | string | `"http://gitlab-webservice-default.gitlab.svc.cluster.local:8181"` |  |
| upstream.concurrent | int | `50` |  |
| upstream.rbac.create | bool | `true` |  |
| upstream.rbac.generatedServiceAccountName | string | `""` |  |
| upstream.metrics.enabled | bool | `false` |  |
| upstream.metrics.portName | string | `"tcp-metrics"` |  |
| upstream.service.enabled | bool | `true` |  |
| upstream.runners.job.registry | string | `"registry1.dso.mil"` |  |
| upstream.runners.job.repository | string | `"ironbank/redhat/ubi/ubi9"` |  |
| upstream.runners.job.tag | string | `"9.6"` |  |
| upstream.runners.helper.registry | string | `"registry1.dso.mil"` |  |
| upstream.runners.helper.repository | string | `"ironbank/gitlab/gitlab-runner/gitlab-runner-helper"` |  |
| upstream.runners.helper.tag | string | `"v18.4.0"` |  |
| upstream.runners.config | string | `"[[runners]]\n  clone_url = \"http://gitlab-webservice-default.gitlab.svc.cluster.local:8181\"\n  cache_dir = \"/tmp/gitlab-runner/cache\"\n  [runners.kubernetes]\n    pull_policy = \"always\"\n    namespace = \"{{.Release.Namespace}}\"\n    image = \"{{ printf \"%s/%s:%s\" .Values.runners.job.registry .Values.runners.job.repository .Values.runners.job.tag }}\"\n    helper_image = \"{{ printf \"%s/%s:%s\" .Values.runners.helper.registry .Values.runners.helper.repository .Values.runners.helper.tag }}\"\n    image_pull_secrets = [\"private-registry\"]\n  [runners.kubernetes.pod_security_context]\n    run_as_non_root = true\n    run_as_user = 1001\n  [runners.kubernetes.helper_container_security_context]\n    run_as_non_root = true\n    run_as_user = 1001\n  [runners.kubernetes.pod_labels]\n    \"job_id\" = \"${CI_JOB_ID}\"\n    \"job_name\" = \"${CI_JOB_NAME}\"\n    \"pipeline_id\" = \"${CI_PIPELINE_ID}\"\n    \"app\" = \"gitlab-runner\"\n"` |  |
| upstream.runners.secret | string | `"gitlab-gitlab-runner-secret"` |  |
| upstream.securityContext.allowPrivilegeEscalation | bool | `false` |  |
| upstream.securityContext.readOnlyRootFilesystem | bool | `false` |  |
| upstream.securityContext.runAsNonRoot | bool | `true` |  |
| upstream.securityContext.runAsUser | int | `1001` |  |
| upstream.securityContext.runAsGroup | int | `1001` |  |
| upstream.securityContext.privileged | bool | `false` |  |
| upstream.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| upstream.podSecurityContext.runAsUser | int | `1001` |  |
| upstream.podSecurityContext.runAsNonRoot | bool | `true` |  |
| upstream.podSecurityContext.fsGroup | int | `65533` |  |
| upstream.containerSecurityContext.runAsNonRoot | bool | `true` |  |
| upstream.capabilities.drop[0] | string | `"ALL"` |  |
| upstream.resources.limits.memory | string | `"256Mi"` |  |
| upstream.resources.limits.cpu | string | `"200m"` |  |
| upstream.resources.requests.memory | string | `"256Mi"` |  |
| upstream.resources.requests.cpu | string | `"200m"` |  |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.

---

_This file is programatically generated using `helm-docs` and some BigBang-specific templates. The `gluon` repository has [instructions for regenerating package READMEs](https://repo1.dso.mil/big-bang/product/packages/gluon/-/blob/master/docs/bb-package-readme.md)._

