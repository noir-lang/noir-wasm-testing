export PATH="$PATH:$HOME/.nargo/bin/"
curl -L https://raw.githubusercontent.com/noir-lang/noirup/main/install | bash
noirup --version 0.4.1
nargo -V
cd src/nargo-compiler
nargo compile nargo-compiler