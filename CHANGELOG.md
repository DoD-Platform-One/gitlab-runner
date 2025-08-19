# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.79.1-bb.1] (2025-08-19)

### Changed

- Removing default upstream values from values.yaml file

## [0.79.1-bb.0] (2025-08-05)

### Changed

- Update gitlab-runner chart version minor v0.79.0 -> v0.79.1

## [0.79.0-bb.0] (2025-07-24)

### Changed

- Update gitlab-runner chart version minor v0.77.2 -> v0.79.0

## [0.77.2-bb.5] (2025-07-24)

### Changed

- ironbank/gitlab/gitlab-runner/gitlab-runner (source) v18.0.2 -> v18.2.0
- ironbank/gitlab/gitlab-runner/gitlab-runner-helper (source) v18.0.2 -> v18.2.0
- registry1.dso.mil/ironbank/gitlab/gitlab-runner/gitlab-runner v18.0.2 -> v18.2.0
- registry1.dso.mil/ironbank/gitlab/gitlab-runner/gitlab-runner-helper v18.0.2 -> v18.2.0

## [0.77.2-bb.4] (2025-07-18)

### Changed

- gluon 0.6.3 -> 0.7.0

## [0.77.2-bb.3] (2025-07-08)

### Changed

- gluon 0.5.19 -> 0.6.3
- registry1.dso.mil/ironbank/redhat/ubi/ubi9 (source) 9.5 -> 9.6

## [0.77.2-bb.2] (2025-07-10)

### Changed

- fix netpols to reflect proper app label selector

## [0.77.2-bb.1] (2025-06-17)

### Changed

- refactor chart to passthrough pattern

## [0.77.2-bb.0] (2025-06-06)

### Changed

- registry1.dso.mil/ironbank/gitlab/gitlab-runner/gitlab-runner v17.10.0 -> v18.0.2
- registry1.dso.mil/ironbank/gitlab/gitlab-runner/gitlab-runner-helper v17.10.0 -> v18.0.2

## [0.75.1-bb.2] (2025-05-09)

### Changed

- gluon 0.5.17 -> 0.5.19

## [0.75.1-bb.1] (2025-05-01)

### Changed

- gluon 0.5.15 -> 0.5.17

## [0.75.0-bb.0] (2025-04-04)

### Changed

- gluon 0.5.14 -> 0.5.15
- registry1.dso.mil/ironbank/gitlab/gitlab-runner/gitlab-runner v17.8.0 -> v17.10.0
- registry1.dso.mil/ironbank/gitlab/gitlab-runner/gitlab-runner-helper v17.8.0 -> v17.10.0

## [0.73.0-bb.3] - 2025-03-25

### Changed

- Enabled dyanmic network policy support

## [0.73.0-bb.2] - 2025-03-25

### Changed

- Changed NetworkPolicy resources to match the deployed gitlab runner pods using their full name.

## [0.73.0-bb.1] - 2025-03-06

### Changed

- Changed cypress test to use  data-testid

## [0.73.0-bb.0] - 2025-01-22

### Changed

- gluon 0.5.12 -> 0.5.14
- ironbank/gitlab/gitlab-runner/gitlab-runner (source) v17.5.4 -> v17.8.0
- ironbank/gitlab/gitlab-runner/gitlab-runner (source) v17.5.4 -> v17.8.0
- ironbank/gitlab/gitlab-runner/gitlab-runner-helper (source) v17.5.4 -> v17.8.0
- registry1.dso.mil/ironbank/gitlab/gitlab-runner/gitlab-runner (source) v17.5.4 -> v17.8.0
- registry1.dso.mil/ironbank/gitlab/gitlab-runner/gitlab-runner-helper (source) v17.5.4 -> v17.8.0

## [0.70.4-bb.1] - 2024-12-19

### Changed

- Add deploymentLabels (app.kubernetes.io/name and app.kubernetes.io/version) interpolation.

## [0.70.4-bb.0] - 2024-12-17

### Changed

- Update GitLab Runner version to v17.5.4
- Update Gluon version to 0.5.12
- Update Gitlab Runner helm chart to v0.70.4
- Update Ubi9 to 9.5

## [0.68.1-bb.2] - 2024-12-11

### Changed

- Updated Kyverno policy due to deprecated field

## [0.68.1-bb.1] - 2024-12-06

### Changed

- removed gitlab-ci-pipelines_rev1.json in favor of gitlab-ci-pipelines-exporter feature chart: <https://repo1.dso.mil/big-bang/product/maintained/gitlab-ci-pipelines-exporter>

## [0.68.1-bb.0] - 2024-12-04

### Changed

- gluon 0.5.4 -> 0.5.10
- ironbank/gitlab/gitlab-runner/gitlab-runner (source) 17.2.1 -> 17.3.1
- ironbank/gitlab/gitlab-runner/gitlab-runner (source) v17.2.1 -> v17.3.1
- ironbank/gitlab/gitlab-runner/gitlab-runner-helper (source) v17.2.1 -> v17.3.1
- registry1.dso.mil/ironbank/gitlab/gitlab-runner/gitlab-runner (source) v17.2.1 -> v17.3.1
- registry1.dso.mil/ironbank/gitlab/gitlab-runner/gitlab-runner-helper (source) v17.2.1 -> v17.3.1
- registry1.dso.mil/ironbank/redhat/ubi/ubi9 (source) 9.4 -> 9.5

## [0.67.1-bb.1] - 2024-09-09

### Changed

- Fix changelog notes
- Add AuthorizationPolicy for metrics port targets
- Added the maintenance track annotation and badge

## [0.67.1-bb.0] - 2024-09-04

### Changed

- Update gluon 0.5.0 -> 0.5.4
- Update registry1.dso.mil/ironbank/gitlab/gitlab-runner/gitlab-runner 17.1.0 -> 17.2.1
- Update registry1.dso.mil/ironbank/gitlab/gitlab-runner/gitlab-runner-helper 17.1.0 -> 17.2.1

## [0.66.0-bb.1] - 2024-08-20

### Changed

- Update kyverno cluster policy to handle the runner secret sync to multiple external namespaces

## [0.66.0-bb.0] - 2024-07-17

### Changed

- Upgrade gitlab runner from 17.0.0 to 17.1.0:
  - Make lifecycle options configurable in the deployment [upstream !473](https://gitlab.com/gitlab-org/charts/gitlab-runner/-/merge_requests/473)
  - Add dedicated ServiceAccount configuration [upstream !415](https://gitlab.com/gitlab-org/charts/gitlab-runner/-/merge_requests/415/commits)
  - Updated registry1.dso.mil/ironbank/gitlab/gitlab-runner/gitlab-runner 17.0.0 -> 17.1.0
  - Updated registry1.dso.mil/ironbank/gitlab/gitlab-runner/gitlab-runner-helper 17.0.0 -> 17.1.0

## [0.65.0-bb.3] - 2024-07-01

### Fixed

- Removed the allow nothing policy
- Moved the authorization policies
- Updated the istio hardened doc

## [0.65.0-bb.2] - 2024-06-21

### Fixed

- Removed duplicate istio.hardened entry in chart/values.yaml

## [0.65.0-bb.1] - 2024-06-20

### Fixed

- Updated authorizationPolicy to properly reflect matchLabel selector and port for metrics

## [0.65.0-bb.0] - 2024-05-24

### Changed

- Updated registry1.dso.mil/ironbank/gitlab/gitlab-runner/gitlab-runner 16.11.0 -> 17.0.0
- Updated registry1.dso.mil/ironbank/gitlab/gitlab-runner/gitlab-runner-helper 16.11.1 -> 17.0.0

## [0.64.0-bb.0] - 2024-05-02

### Changed

- Updated gluon 0.4.10 -> 0.5.0
- Updated registry1.dso.mil/ironbank/gitlab/gitlab-runner/gitlab-runner 16.10.0 -> 16.11.0
- Updated registry1.dso.mil/ironbank/gitlab/gitlab-runner/gitlab-runner-helper 16.10.0 -> 16.11.0
- Updated registry1.dso.mil/ironbank/redhat/ubi/ubi9 9.3 -> 9.4

## [0.63.0-bb.10] - 2024-05-14

### Changed

- Refactored kubeapiPort to kubeAPIPort and added documentation for kubeAPIPort

## [0.63.0-bb.9] - 2024-05-14

### Changed

- Updated grafana dashboards to work with both prometheus and thanos datasource's

## [0.63.0-bb.8] - 2024-05-13

### Removed

- Removed the kubeversion from chart

## [0.63.0-bb.7] - 2024-05-08

### Changed

- Fixed bug with Control Plane CIDR for Network Policies. Refacrtored egress network policies for Gitlab Runner.

## [0.63.0-bb.6] - 2024-05-01

### Added

- Added Istio Authorization Policies Support

## [0.63.0-bb.5] - 2024-04-29

### Added

- Templates for Istio Sidecars and ServiceEntries, IstioHardened.md doc, values update

## [0.63.0-bb.4] - 2024-04-26

### Changed

- Updated gluon to 0.4.10

## [0.63.0-bb.3] - 2024-04-24

### Changed

- Fixed bug cypress test resource requests/limits

## [0.63.0-bb.2] - 2024-04-16

### Changed

- Updated gluon to 0.4.9

## [0.63.0-bb.1] - 2024-04-08

### Changed

- Fixed redirect issue with Cypress test

## [0.63.0-bb.0] - 2024-04-03

### Changed

- Updated images to v16.10.0

## [0.62.0-bb.0] - 2024-03-12

### Changed

- Updated images to v16.9.0
- Updated gluon to 0.4.8

## [0.59.1-bb.4] - 2024-03-05

### Changed

- Added Openshift update for deploying gitlab-runner into Openshift cluster

## [0.59.1-bb.3] - 2024-01-31

### Changed

- Updated Gluon to 0.4.7
- Updated cypress to use shared commands from gluon
- Removed cypress config as it is now using shared config from gluon

## [0.59.1-bb.2] - 2024-01-23

### Changed

- fixing and consolidating gitlab-runner cypress tests

## [0.59.1-bb.1] - 2023-12-18

### Changed

- Update ubi base image ubi9:9.3

## [0.59.1-bb.0] - 2023-11-29

### Changed

- Updated chart to 0.59.1
- Updated images to v16.6.0
- Update ubi base image ubi8:8.9
- Fixed syntax in chart/templates/tests/test-gitlab-runners.yaml
- Increased available cypress test resources in chart/values.yaml

## [0.58.1-bb.0] - 2023-11-09

### Changed

- Updated ironbank/gitlab/gitlab-runner/gitlab-runner v15.11.0 -> v16.5.0
- Updated ironbank/gitlab/gitlab-runner/gitlab-runner-helper v15.11.0 -> v16.5.0
- Updated registry1.dso.mil/ironbank/gitlab/gitlab-runner/gitlab-runner v15.11.0 -> v16.5.0
- Updated registry1.dso.mil/ironbank/gitlab/gitlab-runner/gitlab-runner-helper v15.11.0 -> v16.5.0
- Updated gluon 0.4.1 -> 0.4.4

## [0.52.0-bb.8] - 2023-11-03

### Changed

- Added additional kubernetes label to runner to allow it to work with network policy by default

## [0.52.0-bb.7] - 2023-10-05

### Changed

- Update cypress tests for compatibility with latest gitlab version (7.4.1)

## [0.52.0-bb.6] - 2023-09-21

### Changed

- Update securityContext to enforce run-as-non-root-group
- Add apiVersion to cluster policy template

## [0.52.0-bb.5] - 2023-09-20

### Changed

- Updated gluon from 0.4.0 to 0.4.1
- Updated cypress test structure to accommodate cypress 13.X+

## [0.52.0-bb.4] - 2023-09-07

### Changed

- Update podSecurityContext for runner config

## [0.52.0-bb.3] - 2023-08-31

### Changed

- Update configmap to work if runAsNonRoot is set

## [0.52.0-bb.2] - 2023-08-28

### Changed

- Changed the image pull policy to always to ensure the access policies are checked

## [0.52.0-bb.1] - 2023-07-25

### Removed

- Removed name element on both submit buttons for cypress test 03, 04 and 05

## [0.52.0-bb.0] - 2023-06-30

### Changed

- Update images to 15.11.0
- Update chart to 0.52.0 base

## [0.51.0-bb.2] - 2023-05-19

### Changed

- Update cypress tests for compatibility with latest gitlab version (6.11.2)

## [0.51.0-bb.1] - 2023-04-26

### Changed

- Fixed bug in network policy ranging

## [0.51.0-bb.0] - 2023-04-05

### Changed

- Updated images to 15.10.0
- Updated chart to 0.51.0

## [0.49.1-bb.3] - 2023-03-24

### Changed

- added conditional networkPolices if not in gitlab namespace
- added conditional istio integration and PeerAuthenticaton policy for metrics monitoring

## [0.49.1-bb.2] - 2023-03-20

### Changed

- updated renovate file to update image tag in chart/values.yaml

## [0.49.1-bb.1] - 2023-03-15

### Added

- Added conditional Kyverno ClusterPolicy to support runner auto registration

## [0.49.1-bb.0] - 2023-02-22

### Changed

- Updated images to latest (15.8.1)
- Updated chart to 0.49.1

## [0.48.2-bb.0] - 2023-01-17

### Changed

- Updated images to latest (15.7.3)
- Updated chart to 0.48.2

## [0.47.0-bb.2] - 2023-01-17

### Changed

- Update gluon to new registry1 location + latest version (0.3.2)

## [0.47.0-bb.1] - 2022-12-06

### Changed

- Updated test gitlab-runner-helper image

## [0.47.0-bb.0] - 2022-11-29

### Changed

- Updated to upstream chart 0.47.0
- Updated gitlab runner to v15.6.0

## [0.45.0-bb.3] - 2022-11-21

### Changed

- UBI image update to `8.7`
- updated `renovate.json` to sync `appVersion` from ironbank

## [0.45.0-bb.2] - 2022-10-25

### Fixed

- Modified Cypress test to handle upgrades appropriately

### Changed

- Moved `bbtests` values into the main `chart/values.yaml` to reduce duplication at BB level

## [0.45.0-bb.1] - 2022-10-11

### Updated

- Correct Iron Bank image version

## [0.45.0-bb.0] - 2022-10-11

### Updated

- Update helm chart to v0.45.0 app version 15.4.0

## [0.44.0-bb.0] - 2022-09-26

### Updated

- Update helm chart to v0.44.0 app version 15.3.0

## [0.43.1-bb.2] - 2022-09-20

### Updated

- Add capabilities drop ALL

## [0.43.1-bb.0] - 2022-08-16

### Updated

- Update helm chart to v0.43.1 app version 15.2.1

## [0.41.0-bb.1] - 2022-06-13

### Updated

- Makes Gitlab Runner and UBI image repositories configurable

## [0.41.0-bb.0] - 2022-06-13

### Updated

- Update helm chart to v0.41.0 app version 15.0.0

## [0.39.0-bb.3] - 2022-05-26

### Changed

- Minor port name change to support istio mTLS

## [0.39.0-bb.2] - 2022-05-25

### Changed

- Updated to latest ubi8 8.6

## [0.39.0-bb.1] - 2022-04-26

### Changed

- Updated to latest gluon 0.2.9
- Changed cypress compression to much lower value
- Moved dependencies into Chart.yaml, deleted requirements.yaml

## [0.39.0-bb.0] - 2022-04-6

### Updated

- Updated images to 14.9.1

## [0.38.1-bb.1] - 2022-03-10

### Fixed

- Fixed cypress test in 05-run-pipeline.spec.js to find the Retry btn

## [0.38.1-bb.0] - 2022-03-10

### Updated

- Update helm chart to v0.38.1 app version 14.8.2
- ironbank/gitlab/gitlab-runner/gitlab-runner minor v14.7.0 -> v14.8.2
- registry1.dso.mil/ironbank/gitlab/gitlab-runner/gitlab-runner minor v14.7.0 -> v14.8.2
- registry1.dso.mil/ironbank/gitlab/gitlab-runner/gitlab-runner-helper minor v14.4.0 -> v14.7.0
- registry1.dso.mil/ironbank/redhat/ubi/ubi8 minor 8.4 -> 8.5
- updated tests/images.txt versions

## [0.37.2-bb.1] - 2022-03-04

### Changed

- Add Grafana Dashboard templates to be picked up by Monitoring package

## [0.37.2-bb.0] - 2022-02-23

### Changed

- Update helm chart to v0.37.2 app version 14.7.0

## [0.36.0-bb.2] - 2022-01-31

### Changed

- Update Chart.yaml to follow new standardization for release automation
- Added renovate check to update new standardization

## [0.36.0-bb.1] - 2022-01-27

### Changed

- default metrics enabled to false

## [0.36.0-bb.0] - 2022-01-26

### Changed

- Update helm chart to v0.36.0 app version 14.6.0
- upstream chart added support for metrics scraping.

### Removed

- Removed BigBang templates for Service and ServiceMonitor because upstream chart now provides them.

## [0.34.0-bb.1] - 2022-01-11

### Fixed

- Fix cypress run script

## [0.34.0-bb.0] - 2022-01-07

### Changed

- Update helm chart to v0.34.0 with GitLab 14.4.0 support

## [0.33.1-bb.5] - 2021-11-10

### Fixed

- fix CI pipeline cypress tests

## [0.33.1-bb.4] - 2021-11-01

### Fixed

- CI pipeline cyprest increase test wait time
- update README.md

## [0.33.1-bb.3] - 2021-10-20

### Changed

- changed default variables to match BB CI
- changed timeouts
- dependent on increased limits for gitaly to pass BB CI

## [0.33.1-bb.2] - 2021-10-15

### Changed

- update readme
- increase CI pipeline test wait time

## [0.33.1-bb.1] - 2021-10-15

### Added

- add gitlab-runner-helper image to images.txt so that it will get packaged

## [0.33.1-bb.0] - 2021-10-14

### Changed

- upgrade to app version 14.3.1 helm chart version v0.33.1

## [0.32.0-bb.1] - 2021-10-08

### Added

- Adding in images.txt so gitlab-helper-image is included in release artifact

## [0.32.0-bb.0] - 2021-09-29

### Changed

- upgrade to app version 14.2.0 helm chart version v0.32.0

## [0.29.0-bb.1] - 2021-09-01

### Changed

- added resource limits and requests for gitlab-runner pod in charts/values.yaml

## [0.29.0-bb.0] - 2021-08-12

### Changed

- upgrade to app version 13.12.9 helm chart version v0.29.0

## [0.26.0-bb.3] - 2021-06-15

### Changed

- updated runner image to use UBI 8.4 from Registry1

## [0.26.0-bb.2] - 2021-06-01

### Added

- added network policy docs
- added helm tests for CI pipeline
- added pod labels on gitlab jobs by default

## [0.26.0-bb.1] - 2021-05-26

### Changed

- bug fix: Permission denied when using cache in gitlab-ci.yml"
- added documentation

## [0.26.0-bb.0] - 2021-03-11

### Changed

- upgrade to app version 13.9.0 chart version 0.26.0

## [0.19.2-bb.3] - 2021-02-19

### Changed

- temporary fix for gitlab-runner-helper image

## [0.19.2-bb.2] - 2021-02-04

### Changed

- use protected: true

## [0.19.2-bb.1] - 2020-12-16

### Changed

- ititial release of app version 13.2.2 chart version 0.19.2
