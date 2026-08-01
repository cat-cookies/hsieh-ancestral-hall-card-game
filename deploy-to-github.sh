#!/usr/bin/env bash
set -euo pipefail

GITHUB_USER="${1:-}"
REPOSITORY="${2:-hsieh-ancestral-hall-card-game}"

if [[ -z "$GITHUB_USER" ]]; then
  echo "用法：./deploy-to-github.sh <GitHub帳號> [儲存庫名稱]" >&2
  exit 1
fi

[[ -f index.html ]] || { echo "請在遊戲專案根目錄執行。" >&2; exit 1; }

REMOTE="https://github.com/${GITHUB_USER}/${REPOSITORY}.git"
[[ -d .git ]] || git init
git add .
if git rev-parse --verify HEAD >/dev/null 2>&1; then
  git commit -m "Update playable release" || true
else
  git commit -m "Initial playable release"
fi
git branch -M main
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE"
else
  git remote add origin "$REMOTE"
fi
git push -u origin main

echo "已推送至 $REMOTE"
echo "到 Repository Settings > Pages，將 Source 設為 GitHub Actions。"
echo "預期網址：https://${GITHUB_USER}.github.io/${REPOSITORY}/"
