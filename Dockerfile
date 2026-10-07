FROM node:24-bookworm-slim

RUN npm install --global pnpm@10.17.1

WORKDIR /app
COPY . .

RUN pnpm install --frozen-lockfile && pnpm build

ENV NODE_ENV=production
ENV PORT=3000
ENV SUNNAH_REPO_ROOT=/app

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

USER node

CMD ["node", "apps/mcp/dist/http.js"]
