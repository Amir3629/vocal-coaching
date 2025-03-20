# Vocal Coaching Website - Backup Verification Script
# This script verifies if a backup is valid and contains all essential files

param (
    [Parameter(Mandatory=$true)]
    [string]$BackupPath
)

# Check if the backup file exists
if (-not (Test-Path -Path $BackupPath)) {
    Write-Host "Error: Backup file does not exist at $BackupPath" -ForegroundColor Red
    exit 1
}

# Create a temporary directory for extraction
$tempDir = ".\temp_verify_backup"
if (Test-Path $tempDir) {
    Remove-Item -Path $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Extract the backup
Write-Host "Extracting backup for verification: $BackupPath" -ForegroundColor Cyan
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::ExtractToDirectory($BackupPath, $tempDir)

# Essential directories to check
$essentialDirs = @(
    "app",
    "public",
    "components"
)

# Essential files to check
$essentialFiles = @(
    "package.json",
    "next.config.js"
)

# Check if essential directories exist
$missingDirs = @()
foreach ($dir in $essentialDirs) {
    if (-not (Test-Path -Path "$tempDir\$dir")) {
        $missingDirs += $dir
    }
}

# Check if essential files exist
$missingFiles = @()
foreach ($file in $essentialFiles) {
    if (-not (Test-Path -Path "$tempDir\$file")) {
        $missingFiles += $file
    }
}

# Clean up
Remove-Item -Path $tempDir -Recurse -Force

# Display results
if ($missingDirs.Count -eq 0 -and $missingFiles.Count -eq 0) {
    Write-Host "Backup validation successful! The backup contains all essential files and directories." -ForegroundColor Green
    exit 0
} else {
    Write-Host "Backup validation failed! The backup is missing essential files or directories:" -ForegroundColor Red
    
    if ($missingDirs.Count -gt 0) {
        Write-Host "Missing directories:" -ForegroundColor Yellow
        foreach ($dir in $missingDirs) {
            Write-Host "  - $dir" -ForegroundColor Yellow
        }
    }
    
    if ($missingFiles.Count -gt 0) {
        Write-Host "Missing files:" -ForegroundColor Yellow
        foreach ($file in $missingFiles) {
            Write-Host "  - $file" -ForegroundColor Yellow
        }
    }
    
    exit 1
} 