# Modifications made to upstream chart
## chart/Chart.yaml
- set custom BigBang chart version 

## chart/values.yaml
- set image: registry1.dso.mil/ironbank/gitlab/gitlab-runner/gitlab-runner:vX.X.X
- set gitlabUrl: http://gitlab-webservice-default.gitlab.svc.cluster.local:8181
- set unregisterRunners: true
- set concurrent: 50
- set rbac.create: true
- set runners.config and runners.*
- set runUntagged: true
- set protected: true
- set secret: gitlab-gitlab-runner-secret
- set securityContext.runAsUser: 998
- set securityContext.fsGroup: 996
- set securityContext.runAsUser: 1000
- set resources limits
- set BigBang additional values monitoring.enabled: false

## chart/templates/bigbang/*
- add template for service
- add templated for servicemonitor

## chart/.gitignore
- comment ```charts/*``` need to include the gluon tgz archive

## chart/requirements.yaml
- add requirements file for the gluon library

## chart/templates/deployment.yaml
- remove /usr/bin/dumb-init line 89. That path does not exist in IronBank hardened image
