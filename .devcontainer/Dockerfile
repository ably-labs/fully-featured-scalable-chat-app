# Append -bullseye variants on local arm64/Apple Silicon.

ARG VARIANT=16
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:${VARIANT}

RUN su node -c "npm install -g npm"
RUN su node -c "npm install -g azure-functions-core-tools@4"
