# Vocal Coaching Website - Full Backup Script
# This script creates a comprehensive backup of the project

# Get current timestamp for backup file name
$timestamp = Get-Date -Format "yyyy-MM-dd-HH-mm-ss"
$backupName = "vocal-coaching-backup-$timestamp"
$backupDir = ".\backups"
$backupPath = "$backupDir\$backupName.zip"

# Create backups directory if it doesn't exist
if (-not (Test-Path -Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir | Out-Null
    Write-Host "Created backup directory at: $backupDir"
}

# Define directories and files to include in the backup
$includeDirs = @(
    "app",
    "public",
    "pages",
    "components",
    "lib",
    "utils",
    "hooks",
    "styles",
    "images",
    "assets",
    "js"
)

$includeFiles = @(
    "*.json",
    "*.js",
    "*.ts",
    "*.tsx",
    "*.md",
    "*.css",
    "*.config.js",
    "*.config.ts",
    ".env.local",
    ".env.example",
    "next.config.js",
    "next.config.mjs",
    "tailwind.config.js",
    "tailwind.config.ts",
    "postcss.config.js"
)

# Define directories to exclude
$excludeDirs = @(
    "node_modules",
    ".next",
    ".git",
    "out",
    "dist"
)

# Create a temporary directory for backup preparation
$tempDir = ".\temp_backup_$timestamp"
New-Item -ItemType Directory -Path $tempDir | Out-Null
Write-Host "Created temporary directory for backup preparation"

# Copy BACKUP_GUIDE.md to the temp directory
Copy-Item -Path ".\BACKUP_GUIDE.md" -Destination "$tempDir\" -Force
Write-Host "Added backup guide to the package"

# Copy directories
foreach ($dir in $includeDirs) {
    if (Test-Path -Path ".\$dir") {
        $destination = "$tempDir\$dir"
        New-Item -ItemType Directory -Path $destination -Force | Out-Null
        
        # Use robocopy to copy directory contents, excluding specified dirs
        $excludeArgs = $excludeDirs | ForEach-Object { "/XD $_ " }
        $excludeString = $excludeArgs -join " "
        
        $robocopyCmd = "robocopy .\$dir $destination /E /NP /NFL /NDL $excludeString"
        Invoke-Expression $robocopyCmd | Out-Null
        
        Write-Host "Copied directory: $dir"
    }
}

# Copy individual config files from root
Write-Host "Copying configuration files..."
foreach ($filePattern in $includeFiles) {
    $files = Get-ChildItem -Path "." -Filter $filePattern -File
    foreach ($file in $files) {
        Copy-Item -Path $file.FullName -Destination "$tempDir\" -Force
        Write-Host "  - $($file.Name)"
    }
}

# Create the ZIP file
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($tempDir, $backupPath)

# Clean up the temporary directory
Remove-Item -Path $tempDir -Recurse -Force
Write-Host "Cleaned up temporary directory"

Write-Host "Backup completed successfully!" -ForegroundColor Green
Write-Host "Backup file created: $backupPath" -ForegroundColor Green
Write-Host "Backup size: $([Math]::Round((Get-Item $backupPath).Length / 1MB, 2)) MB" -ForegroundColor Green
Write-Host ""
Write-Host "To restore this backup, use the instructions in BACKUP_GUIDE.md" -ForegroundColor Cyan 