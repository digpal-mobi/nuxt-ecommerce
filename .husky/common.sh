export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"

if [ -s "$HOME/.nvm/nvm.sh" ]; then
  . "$HOME/.nvm/nvm.sh"
  nvm use 22 >/dev/null 2>&1 || nvm use >/dev/null 2>&1 || true
elif [ -x "$HOME/.fnm/fnm" ]; then
  eval "$("$HOME/.fnm/fnm" env)"
fi
