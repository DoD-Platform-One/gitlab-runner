# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.39.0-bb.2] - 2022-04-26
### Changed
- Minor port name change to support istio mTLS

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
