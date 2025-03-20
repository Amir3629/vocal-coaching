# Simple GitHub Pages Deployment Script

Write-Host "Starting deployment process for Vocal Coaching Website..." -ForegroundColor Cyan
Write-Host "Target: https://amir3629.github.io/vocal-coaching/" -ForegroundColor Cyan
Write-Host ""

# Build the project
Write-Host "Building the project..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Build failed. Please fix the errors and try again." -ForegroundColor Red
    exit 1
}

# Stage all changes
Write-Host "Staging changes..." -ForegroundColor Cyan
git add -A

# Commit changes
$commitMessage = Read-Host "Enter commit message (or press Enter for default message)"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Update website content and deploy to GitHub Pages"
}

git commit -m $commitMessage
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to commit changes." -ForegroundColor Red
    exit 1
}

# Push changes to GitHub
Write-Host "Pushing changes to GitHub..." -ForegroundColor Cyan
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to push changes to GitHub." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Deployment successful!" -ForegroundColor Green
Write-Host "Your website should be live at: https://amir3629.github.io/vocal-coaching/" -ForegroundColor Green
Write-Host "Note: It may take a few minutes for the changes to propagate." -ForegroundColor Yellow 