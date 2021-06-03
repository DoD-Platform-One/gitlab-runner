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
- set securityContext.runAsUser: 1000
- set BigBang additional values monitoring.enabled: false

## chart/templates/bigbang/*
- add template for service
- add templated for servicemonitor

# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.26.0-bb.2] - 2021-06-01
- added network policy docs
- added helm tests for CI pipeline
- added pod labels on gitlab jobs by default

## [0.26.0-bb.1] - 2021-05-26
- bug fix: Permission denied when using cache in gitlab-ci.yml"
- added documentation

## [0.26.0-bb.0] - 2021-03-11
- upgrade to app version 13.9.0 chart version 0.26.0

## [0.19.2-bb.3] - 2021-02-19
- temporary fix for gitlab-runner-helper image

## [0.19.2-bb.2] - 2021-02-04
- use protected: true

## [0.19.2-bb.1] - 2020-12-16
- ititial release of app version 13.2.2 chart version 0.19.2