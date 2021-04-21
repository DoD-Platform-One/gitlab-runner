# Configuration for rootless podman and buildah

There is special k8s node configuration required for running rootless podman or buildah in a Gitlab CI pipeline. You will see an error like this
```
cannot clone: Invalid argument
user namespaces are not enabled in /proc/sys/user/max_user_namespaces
Error: Connot connect to the Podman socket, make sure there is a Podman REST API service running.
```
On nodes where gitlab-runners execute user.max_user_namespaces must be set. 
```
sysctl user.max_user_namespaces=28633
```
Here is an example of an Ansible script
```
- name: Configure sysctl on gitlab-runner nodes to allow rootless podman builds
  hosts: all
  become: yes
  tasks:
  - name: Enable user namespaces
    sysctl:
      name: user.max_user_namespaces
      value: 28633
      state: present
      reload: yes
      sysctl_set: yes
    when: node_pool == "gitlab-runner"
``` 
Example pipeline scripts. You will need to pass a storage-diver argument
```
buildah bud \
  $args_parameters \
  --build-arg=BASE_REGISTRY="${BASE_REGISTRY}" \
  $label_parameters \
  --label=maintainer="ironbank@dsop.io" \
  --label=org.opencontainers.image.created="$(date --rfc-3339=seconds)" \
  --label=org.opencontainers.image.source="${CI_PROJECT_URL}" \
  --label=org.opencontainers.image.revision="${CI_COMMIT_SHA}" \
  --add-host="satellite:${SATELLITE_URL}" \
  --authfile /tmp/prod_auth.json \
  --format=docker \
  --loglevel=3 \
  --storage-driver=vfs \
  -t "${IMAGE_REGISTRY_REPO}" \
  .

buildah tag --storage-driver=vfs "${IMAGE_REGISTRY_REPO}" "${IMAGE_FULLTAG}"

buildah push --storage-driver=vfs --authfile staging_auth.json --digestfile="${ARTIFACT_DIR}/digest" "${IMAGE_FULLTAG}"

```

