# Express CI CD Application with [Harness](https://www.harness.io/)

### To run the application in local
- The application needs atleast node `18.x.xx` to run. If you have `nvm` installed do `nvm use` or manually install the required node version
- Run `npm run clobber` and `npm i` to install the dependencies
- With hot-reload `npm run dev` 
- With hot-reload and eslint enabled `npm run dev-reload` 
- Without hot-reload `npm run start`

### To run the application in local against prod env
- With hot-reload `npm run dev-prod`

### To run the application in production mode
- With pm2 `npm run prod-pm2`
- Without pm2 `npm run prod`

### To run the application in local using Docker (make sure docker is installed)
- `docker build --no-cache -f ./Dockerfile -t workout-app .`
- `docker run -dp 5000:5000 workout-app`

### To push the images to docker hub
- `docker buildx create --name mydockerbuilder --driver docker-container --bootstrap`
- `docker buildx use mydockerbuilder`
- `docker buildx inspect`
- `docker login --username <docker-hub-username> --password <docker-hub-password>`
- `docker buildx build --no-cache --platform=linux/arm64 --platform=linux/amd64 -t docker.io/<docker-hub-username>/<image-name>:<tag> --push -f ./Dockerfile .` or
- `docker build --no-cache --platform=linux/arm64,linux/amd64 -f ./Dockerfile --push -t <docker-hub-username>/<image-name>:<tag> .`
