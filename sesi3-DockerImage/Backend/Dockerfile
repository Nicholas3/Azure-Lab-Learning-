FROM public.ecr.aws/docker/library/node:22-alpine AS builder

WORKDIR /app

COPY package*.json .

# install depedency
RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

FROM public.ecr.aws/docker/library/node:22-alpine AS production

WORKDIR /app

#/node_modules ; /dist ; /prisma ; package*.json

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./

ENTRYPOINT ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && npm run start:prod"]