#!/bin/bash

HOME=$(pwd)
NARGO_VERSION="v0.3.2"

# Download and install nargo
mkdir -p $HOME/.nargo/bin && \
curl -o $HOME/.nargo/bin/nargo-aarch64-apple-darwin.tar.gz -L https://github.com/noir-lang/noir/releases/download/$NARGO_VERSION/nargo-aarch64-apple-darwin.tar.gz && \
tar -xvf $HOME/.nargo/bin/nargo-aarch64-apple-darwin.tar.gz -C $HOME/.nargo/bin/ && \
echo '\nexport PATH=$PATH:$HOME/.nargo/bin' >> ~/.zshrc && \
source ~/.zshrc

# Wait until nargo is installed
while ! command -v nargo >/dev/null 2>&1; do
  echo "Waiting for nargo to be installed..."
  sleep 1
done

# Display nargo version
nargo -V