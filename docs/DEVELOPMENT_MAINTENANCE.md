# How to upgrade the Gitlab Runner Package chart
BigBang makes modifications to the upstream helm chart. The full list of changes is at the end of  this document.
1. Renovate may have already made changes in the development branch. If that is the case then just verify that the changes are correct as you go through these steps.
1. Discover the chart version tag that matches with the application version from the [upstream chart](https://gitlab.com/gitlab-org/charts/gitlab-runner) by looking at the Chart.yaml. Do diff between old and new release tags to become aware of any significant chart changes. A graphical diff tool such as [Meld](https://meldmerge.org/) is useful. You can see where the current helm chart came from by inspecting ```/chart/kptfile```
1. Read the /CHANGELOG.md from the release tag from upstream [upstream chart](https://gitlab.com/gitlab-org/charts/gitlab-runner). Also, be aware of changes in the Gitlab chart that could affect the runner chart. Take note of any special upgrade instructions, if any.
1. If Renovate has not created a development branch and merge request then manually create them.
1. Merge/Sync the new helm chart with the existing Gitlab Runner package code. A graphical diff tool like [Meld](https://meldmerge.org/) is useful. Reference the "Modifications made to upstream chart" section below. Be careful not to overwrite Big Bang Package changes that need to be kept. Note that some files will have combinations of changes that you will overwrite and changes that you keep. Stay alert. The hardest file to update is the ```/chart/values.yaml``` because many defaults are changed.
1. Look in ```/chart/Chart.yaml``` at the dependencies and verify that you have the most recent version of the [Big Bang Gluon](https://repo1.dso.mil/platform-one/big-bang/apps/library-charts/gluon/-/tags) library. If not, delete the ```/chart/charts/gluon-x.x.x.tgz``` file and the ```/requirements.lock``` file. You will replace these files in the next step.
1. Run a helm dependency command to update the chart/charts/*.tgz archives and create a new requirements.lock file. You will commit the tar archives along with the requirements.lock that was generated.
    ```bash
    export HELM_EXPERIMENTAL_OCI=1
    helm dependency update ./chart
    ```
1. In ```/chart/values.yaml``` update all the gitlab image tags to the new version. There are 3 images: gitlab-runner, gitlab-runner-helper, and the ubi.
1. Update the Kptfile to point to the new tag and commit hash of the upstream repo.
1. Update ```/tests/images.txt``` with the new image tags. This file insures that the images are packaged in the pipelines.
1. Update /CHANGELOG.md with an entry for "upgrade gitlab-runner to app version X.X.X chart version X.X.X-bb.X". Or, whatever description is appropriate.
1. Update the /README.md following the [gluon library script](https://repo1.dso.mil/platform-one/big-bang/apps/library-charts/gluon/-/blob/master/docs/bb-package-readme.md)
1. Update /chart/Chart.yaml to the appropriate versions. The annotation version is the actual image tag and should match the ```appVersion``` with a prepended `v`.
    ```yaml
    version: X.X.X-bb.X
    appVersion: X.X.X
    annotations:
      bigbang.dev/applicationVersions: |
        - Gitlab Runner: vX.X.X
    dependencies:
      - name: gluon
        version: X.X.X
        repository: oci://registry.dso.mil/platform-one/big-bang/apps/library-charts/gluon
    ```
1. Use a development environment to deploy and test Gitlab Runner. See more detailed testing instructions in [Gitlab Package documentation](https://repo1.dso.mil/platform-one/big-bang/apps/developer-tools/gitlab/-/blob/main/docs/DEVELOPMENT_MAINTENANCE.md). Test with Gitlab Package enabled to make sure the new gitlab-runner version still works with Gitlab. Also test an upgrade by deploying the old version first and then deploying the new version. Verify that the upgrade goes smoothly.
1. When the Package pipeline runs expect the cypress tests to fail due to UI changes. Note that most of the cypress test files are synced from the [Gitlab Package](https://repo1.dso.mil/platform-one/big-bang/apps/developer-tools/gitlab/-/tree/main/chart/tests/cypress) to avoid having two different versions of the same tests. Gitlab-runner has a fifth `05` test that the Gitlab package does not have. If you sync the first 4 cypress tests from Gitlab you should not have any trouble. See the [Gitlab Package documentation](https://repo1.dso.mil/platform-one/big-bang/apps/developer-tools/gitlab/-/blob/main/docs/DEVELOPMENT_MAINTENANCE.md) if you do need to run the cypress tests locally. This test should be able to pass on BOTH clean install and upgrade stages with the appropriate updates.
1. Update the /README.md again if you have made any additional changes during the upgrade/testing process.


# Testing new Gitlab Runner version
1. Follow the testing instructions from the [Gitlab Package documentation](https://repo1.dso.mil/platform-one/big-bang/apps/developer-tools/gitlab/-/blob/main/docs/DEVELOPMENT_MAINTENANCE.md). The details are not repeated here.

# Modifications made to upstream chart
This is a high-level list of modifications that Big Bang has made to the upstream helm chart. You can use this as as cross-check to make sure that no modifications were lost during the upgrade process.

##  /chart/charts/*.tgz
- The BigBang Gluon library is added to the chart. Run ```helm dependency update ./chart```.
- commit the tar archive that was downloaded from the helm dependency update command. And also commit the requirements.lock that was generated.

## /chart/dashboards/*
- add Grafana dashboards

## /chart/templates/bigbang/*
- add support for Grafana dashboards

## /chart/templates/tests/*
- add templates for helm tests

## chart/templates/deployment.yaml
- remove `"/usr/bin/dumb-init", "--",` line 64. That path does not exist in IronBank hardened image
- ensure the security context is present ~ line 51
```
        securityContext:
          allowPrivilegeEscalation: false
          {{- toYaml $.Values.containerSecurityContext | nindent 10 }}
```

## /chart/tests/cypress/*
- add cypress tests scripts

## /chart/.gitignore
- comment the ```charts/*```

## /chart/Chart.yaml
- The Chart.yaml is updated with BigBang version changes and dependencies

## /Kptfile
- Add the Kptfile to point to the upstream repo

## /requirements.lock
- added by the helm dependency update

## /templates/_helpers.tpl
- Modifies `gitlab-runner.image` to use the image value if defined, otherwise use registry, repository and tag

## /chart/values.yaml
- GitlabUrl: http://gitlab-webservice-default.gitlab.svc.cluster.local:8181
- unregisterRunners: true
- concurrent: 50
- rbac.create: true
- portName: tcp-metrics
- service.enabled: true
- runners.config:  multiple changes
- locked: false
- runUntagged: true
- protected: true
- secret: gitlab-gitlab-runner-secret
- securityContext: changes to work with IB images
- resources: set requests and limits to the same values
- registry: independently customize registry
- repository: independently customize repository
- tag: independently customize tag
- runners.job: independently customize UBI image details
- runners.helper: independently customize Gitlab Runner Helper image details
- monitoring.enabled: value added to support BB monitoring
- bbtests: values added to support CI testing with gluon
- networkPolicies.enabled: value added to support NPs (for CI testing only)
