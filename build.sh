# Version 1:
# git clone https://github.com/noir-lang/noir.git
# cd noir && git checkout tags/$NARGO_VERSION
# sudo apt update && sudo apt install clang lld cmake libomp-dev
# cargo install --locked --path=crates/nargo
# nargo --version

# Version 2:
# git clone https://github.com/noir-lang/noir.git
# cd noir && git checkout tags/$NARGO_VERSION
# cargo install --locked --path=crates/nargo --no-default-features --features plonk_bn254_wasm
# nargo --version

# Version 3:
#!/bin/bash

set -x
set -e

NARGO_VERSION="v0.3.2"

mkdir -p $HOME/.nargo/bin
curl -o $HOME/.nargo/bin/nargo-x86_64-unknown-linux-gnu.tar.gz -L https://github.com/noir-lang/noir/releases/download/$NARGO_VERSION/nargo-x86_64-unknown-linux-gnu.tar.gz
tar -xvf $HOME/.nargo/bin/nargo-x86_64-unknown-linux-gnu.tar.gz -C $HOME/.nargo/bin/
echo -e '\nexport PATH=$PATH:$HOME/.nargo/bin' >> ~/.bashrc
source ~/.bashrc

nargo --version