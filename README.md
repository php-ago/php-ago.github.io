# Documentation website for [ago](https://github.com/php-ago/ago) library

## Contribute

### NPM Commands
#### Install Dependencies
```bash
npm i
```

#### Watch File Changes
```bash
npm run dev
```

Navigate to `http://localhost:5173` to see your documentation if you run project locally. For containers, visit `http://localhost:3000`.

### With Container Engine
> [!NOTE]
> If you use [🐳 Docker](https://app.docker.com/) instead of [🦦 Podman](https://podman.io/), just replace `podman-compose` with `docker compose`, and `podman` with `docker` in code examples below.

#### Build an Image
To build an image, navigate to the root of the project and run this command:

```bash
podman-compose build
```

#### Create `node_modules`
Run this command to install npm packages and generate a `node_modules` directory on your local machine:

```bash
podman-compose run --rm app npm i
```

#### Run the Container
To run a container, navigate to the root of the project and run this command:

```bash
podman-compose up -d
```

You can visit `http://localhost:3000` to see your documentation.

#### Enter the container
To enter inside of the container, run this command:

```bash
podman-compose exec app sh
```

You'll be able to run NPM commands inside of the container.

#### Stop the container
After you are done working, run this to cleanup containers:

```bash
podman-compose down
```
