export PATH="$PATH:$HOME/.nargo/bin/"
curl -L https://raw.githubusercontent.com/noir-lang/noirup/main/install | bash
noirup -n
nargo -v
cd src/noir-script
nargo compile noir-script