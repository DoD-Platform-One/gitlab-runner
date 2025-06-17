```yaml
domain: dev.bigbang.mil

addons:
  gitlabRunner:
    enabled: true
    git:
      tag: null
      branch: "your-development-branch-name"

  # This will pull the current "main" gitlab chart tag.
  gitlab:
    enabled: true

    hostnames:
      gitlab: gitlab
      registry: registry
    sso:
      enabled: true
      label: "Platform One SSO"
      client_id: "platform1_a8604cc9-f5e9-4656-802d-d05624370245_bb8-gitlab"
      client_secret: ""
