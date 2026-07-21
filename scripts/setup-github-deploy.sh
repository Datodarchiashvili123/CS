#!/usr/bin/env bash
#
# GitHub Actions deploy-ის კონფიგურაცია — deploy-გასაღები + GitHub Secrets.
# გაუშვი ლოკალურად (შენს Mac-ზე). საჭიროა ავტორიზებული `gh` CLI.
#
#   bash setup-github-deploy.sh <host> <ssh_user> [deploy_path] [ssh_port]
#
# მაგალითი:
#   bash setup-github-deploy.sh tsre.in deploy
#   bash setup-github-deploy.sh 164.90.10.20 root /var/www/tsre.in 22
#
set -euo pipefail

REPO="Datodarchiashvili123/CS"
HOST="${1:?გამოყენება: setup-github-deploy.sh <host> <ssh_user> [deploy_path] [ssh_port]}"
SSH_USER="${2:?ssh მომხმარებელი აუცილებელია}"
DEPLOY_PATH="${3:-/var/www/tsre.in}"
PORT="${4:-22}"
KEY="deploy_key"

command -v gh >/dev/null 2>&1 || { echo "❌ საჭიროა gh CLI:  brew install gh && gh auth login"; exit 1; }

if [ ! -f "$KEY" ]; then
  echo "▶ deploy-გასაღების შექმნა ($KEY)..."
  ssh-keygen -t ed25519 -C "github-deploy-tsre" -f "$KEY" -N ""
else
  echo "ℹ $KEY უკვე არსებობს — ვიყენებ არსებულს."
fi

echo "▶ GitHub secrets დაყენება ($REPO)..."
gh secret set DEPLOY_HOST    --repo "$REPO" --body "$HOST"
gh secret set DEPLOY_USER    --repo "$REPO" --body "$SSH_USER"
gh secret set DEPLOY_PATH    --repo "$REPO" --body "$DEPLOY_PATH"
gh secret set DEPLOY_PORT    --repo "$REPO" --body "$PORT"
gh secret set DEPLOY_SSH_KEY --repo "$REPO" < "$KEY"
echo "✅ secrets დაყენდა (DEPLOY_HOST, DEPLOY_USER, DEPLOY_PATH, DEPLOY_PORT, DEPLOY_SSH_KEY)."

echo
echo "▶ საჯარო გასაღები დაამატე droplet-ზე (ერთხელ):"
echo "    ssh-copy-id -i ${KEY}.pub ${SSH_USER}@${HOST}"
echo "  ან ხელით ~/.ssh/authorized_keys-ში ჩასვი:"
echo "    $(cat "${KEY}.pub")"
echo
echo "▶ მერე უბრალოდ:  git push   →   Actions   →   deploy 🎉"
echo "   (ან: gh workflow run 'CI / Deploy to tsre.in')"
