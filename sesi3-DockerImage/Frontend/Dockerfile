#Define base image to use
FROM public.ecr.aws/docker/library/node:22-alpine AS builder

#WORKDIR: Place to store code
WORKDIR /app

#COPY [sc file (bisa multiple)] [target]
COPY package.json package-lock.json ./

#Run command on machine
RUN npm install

#Copy evrything from sc to target
COPY . .

# npm run -> run setelah semua selesai (CMD)
# CMD ["npm", "run", "dev"]

# RUN build script
RUN npm run build

#Base image for NGINX
FROM public.ecr.aws/nginx/nginx:stable-alpine AS production

#Copy previously build code
COPY --from=builder /app/dist /usr/share/nginx/html

#Run NGINX in Background
CMD ["nginx", "-g", "daemon off;"]
