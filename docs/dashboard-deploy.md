# Gitlab CI Piplines grafana dashboard migration

If you have previously used the Gitlab CI Pipelines dashboard, this method has been deprecated and the dashboard has been migrated to a maintained project: <https://repo1.dso.mil/big-bang/product/maintained/gitlab-ci-pipelines-exporter>

The above project contains the resources and instructions on deploying the `gitlab-ci-pipelines-exporter` maintained gitlab addon for runner metrics, acquired through the gitlab API using an automated token.  For `gitlab-ci-pipelines-exporter` chart installation details, see: <https://repo1.dso.mil/big-bang/product/maintained/gitlab-ci-pipelines-exporter/-/blob/main/docs/overview.md?ref_type=heads>.  This supports both existing and new gitlab deployments; the only thing required is an API token and connectivity for the exporter to communicate with the gitlab API.
