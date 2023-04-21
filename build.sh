NARGO_VERSION="v0.3.2"

git clone https://github.com/noir-lang/noir.git
cd noir && git checkout tags/$NARGO_VERSION
sudo apt update && sudo apt install clang lld cmake libomp-dev
cargo install --locked --path=crates/nargo
nargo --version
