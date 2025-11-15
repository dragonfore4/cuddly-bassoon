# cuddly-bassoon backend

## Local development

To install dependencies:

```bash
bun install
```

To run the backend locally (from the `backend` folder):

```bash
cd backend
bun run dev
```

This project was created using `bun init` in bun v1.3.0. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

## GitHub Action: security scan, build & push to Docker Hub

A workflow is defined at `.github/workflows/dockerhub-build-and-push.yml`.

It will:

- Build the Docker image from `backend/Dockerfile`.
- Run a Trivy vulnerability scan on the built image (failing the workflow on HIGH/CRITICAL issues).
- If the scan passes, log in to Docker Hub.
- Tag it as `${DOCKERHUB_USERNAME}/cuddly-bassoon-backend`.
- Push tags on every push to `main` that touches the backend or the workflow file.

### Required GitHub secrets

In your repository settings → **Secrets and variables** → **Actions**, define:

- `DOCKERHUB_USERNAME` – your Docker Hub username.
- `DOCKERHUB_TOKEN` – a Docker Hub access token or password with permission to push.

## OpenShift deployment

OpenShift manifests are under the `openshift/` directory:

- `openshift/deployment.yaml` – Deployment, Service, and Route for the backend.
- `openshift/imagestream.yaml` – ImageStream that tracks the Docker Hub image.

Update `YOUR_DOCKERHUB_USERNAME` in these files to your actual Docker Hub username.

To apply on an OpenShift cluster (after logging in with `oc login`):

```bash
oc apply -f openshift/imagestream.yaml
oc apply -f openshift/deployment.yaml
```

After the Route is created, you can access the app via the generated hostname. The health endpoint is `/health`, and the main endpoint is `/`.
