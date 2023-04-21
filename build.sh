#!/bin/bash

# HOME="~"
NARGO_VERSION="v0.3.2"

# echo "Installing at $HOME"

git clone git@github.com:noir-lang/noir.git
cd noir && git checkout tags/$NARGO_VERSION
sudo apt update && sudo apt install clang lld cmake libomp-dev
nargo --version




# Download and install nargo
# mkdir -p $HOME/.nargo/bin && \
# curl -o $HOME/.nargo/bin/nargo-x86_64-unknown-linux-gnu.tar.gz -L https://github.com/noir-lang/noir/releases/download/v0.3.2/nargo-x86_64-unknown-linux-gnu.tar.gz && \
# tar -xvf $HOME/.nargo/bin/nargo-x86_64-unknown-linux-gnu.tar.gz -C $HOME/.nargo/bin/ && \
# echo -e '\nexport PATH=$PATH:$HOME/.nargo/bin' >> ~/.bashrc && \
# source ~/.bashrc

# # Wait until nargo is installed
# while ! command -v nargo >/dev/null 2>&1; do
#   echo "Waiting for nargo to be installed..."
#   sleep 1
# done

# # Display nargo version
# nargo -V