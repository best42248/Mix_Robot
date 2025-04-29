FROM nodered/node-red:latest

WORKDIR /data

USER root

# Combine COPY and RUN commands to reduce layers
COPY package.json flows_cred.json flows.json ./
COPY /uibuilder ./uibuilder

# Combine RUN commands and clean npm cache
RUN npm install --unsafe-perm --no-update-notifier --no-fund --only=production \
    && npm cache clean --force \
    && mkdir -p uibuilder \
    && chown -R node-red:node-red /data \
    && chmod -R 755 /data

# Switch back to non-root user for security
USER node-red

WORKDIR /usr/src/node-red