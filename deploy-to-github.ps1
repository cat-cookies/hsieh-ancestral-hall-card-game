param(
    [Parameter(Mandatory = $true)]
    [string]$GitHubUser,

    [string]$Repository = "hsieh-ancestral-hall-card-game"
)

$ErrorActionPreference = "Stop"
$Remote = "https://github.com/$GitHubUser/$Repository.git"

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    throw "找不到 Git。請先安裝 Git for Windows。"
}

if (-not (Test-Path "index.html")) {
    throw "請在遊戲專案根目錄執行本指令。"
}

if (-not (Test-Path ".git")) {
    git init
}

git add .
$hasHead = git rev-parse --verify HEAD 2>$null
if ($LASTEXITCODE -ne 0) {
    git commit -m "Initial playable release"
} else {
    git commit -m "Update playable release" 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "目前沒有新的檔案變更需要提交。"
    }
}

git branch -M main
$existingRemote = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    git remote set-url origin $Remote
} else {
    git remote add origin $Remote
}

git push -u origin main
Write-Host "已推送至 $Remote"
Write-Host "接著到 Repository Settings > Pages，將 Source 設為 GitHub Actions。"
Write-Host "預期網址：https://$GitHubUser.github.io/$Repository/"
