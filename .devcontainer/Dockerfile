# [Choice] Node.js version (use -bullseye variants on local arm64/Apple Silicon): 18, 16, 14, 18-bullseye, 16-bullseye, 14-bullseye, 18-buster, 16-buster, 14-buster
ARG VARIANT=16
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node packages
# RUN su node -c "npm install -g <your-package-list -here>"

# We download the latest Azure Functions Core Tools here
RUN wget https://github.com/Azure/azure-functions-core-tools/releases/download/4.0.4785/Azure.Functions.Cli.linux-x64.4.0.4785.zip && \
    mkdir /usr/local/azure-functions-cli && \
    unzip -d /usr/local/azure-functions-cli Azure.Functions.Cli.linux-x64.*.zip && \
    rm Azure.Functions.Cli.linux-x64.*.zip && \
    chmod +x /usr/local/azure-functions-cli/func && chmod +x /usr/local/azure-functions-cli/gozip

ENV PATH="${PATH}:/usr/local/azure-functions-cli"