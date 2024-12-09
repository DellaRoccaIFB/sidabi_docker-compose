FROM node:lts-alpine as build-stage

ENV VUE_APP_API_BASE_URL="dashboard_api"
ENV VUE_APP_API_PORT="5000"
ENV VUE_APP_JWT_SECRET="14857ead6482ecb20cb0d94ffdffde3a3b12e90ae7c26092a5f34e2b3dafcf4a6c1707f2c49840ef365a26c1f0aabb69ce3e587611d89599877e8d64d6a3dbd8bb5f1aa209a0a7135c602ff9be526a79fb3caf8850fa0189e468e3536c64fe0dc4c86a773a1792fe1147d58894df1d9c41d73e2ce1e3bd4984a4c3cb2dcad54af9d6818b3fe71f63ce5798bc0c5e170127812b43f121da88a0a241577e9dfc14cfe4415426e99c690dfaef2d658a7771d797cf83ccb4a93d7fcd07948df228effac4eabece3f499e72b41044f3c52ec3e43f77d120bb429c93ac027d196cfa425e0157dba3da0a3baedab3ec3b935bfcb9348129ff90319d83de236689758019"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", "run", "serve" ]

# FROM nginx as production-stage

# WORKDIR /app

# COPY --from=build-stage /app/dist /app

# COPY nginx.conf /etc/nginx/nginx.conf

# ENTRYPOINT ["nginx", "-g", "daemon off;"]

