#!/bin/bash

# HOME=$(pwd)
NARGO_VERSION="v0.3.2"

# Download and install nargo
mkdir -p $HOME/.nargo/bin && \
curl -o $HOME/.nargo/bin/nargo-x86_64-unknown-linux-gnu.tar.gz -L https://github.com/noir-lang/noir/releases/download/v0.3.2/nargo-x86_64-unknown-linux-gnu.tar.gz && \
tar -xvf $HOME/.nargo/bin/nargo-x86_64-unknown-linux-gnu.tar.gz -C $HOME/.nargo/bin/ && \
echo -e '\nexport PATH=$PATH:$HOME/.nargo/bin' >> ~/.bashrc && \
source ~/.bashrc

# Wait until nargo is installed
while ! command -v nargo >/dev/null 2>&1; do
  echo "Waiting for nargo to be installed..."
  sleep 1
done

# Display nargo version
nargo -V