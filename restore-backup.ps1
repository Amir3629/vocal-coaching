# Vocal Coaching Website - Backup Restoration Script
# This script restores a backup created by create-full-backup.ps1

param (
    [Parameter(Mandatory=$true)]
    [string]$BackupPath,
    
    [Parameter(Mandatory=$false)]
    [string]$DestinationPath = "."
)

# Function to check if a command exists
function Test-Command {
    param (
        [Parameter(Mandatory=$true)]
        [string]$Command
    )
    
    $exists = $null -ne (Get-Command $Command -ErrorAction SilentlyContinue)
    return $exists
}

# Validate backup file exists
if (-not (Test-Path -Path $BackupPath)) {
    Write-Host "Error: Backup file does not exist at $BackupPath" -ForegroundColor Red
    exit 1
}

# Create destination directory if it doesn't exist
if (-not (Test-Path -Path $DestinationPath)) {
    New-Item -ItemType Directory -Path $DestinationPath -Force | Out-Null
    Write-Host "Created destination directory at: $DestinationPath"
}

# Extract the backup
Write-Host "Extracting backup file to $DestinationPath..." -ForegroundColor Cyan
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::ExtractToDirectory($BackupPath, $DestinationPath)

Write-Host "Backup extracted successfully!" -ForegroundColor Green

# Check if npm is installed
$npmInstalled = Test-Command -Command "npm"
if (-not $npmInstalled) {
    Write-Host "Warning: npm is not installed. You will need to install Node.js and npm to run the project." -ForegroundColor Yellow
} else {
    # Ask if user wants to run npm install
    $runNpmInstall = Read-Host "Do you want to run 'npm install' to install dependencies? (y/n)"
    if ($runNpmInstall -eq "y" -or $runNpmInstall -eq "Y") {
        Write-Host "Installing dependencies... This may take a few minutes." -ForegroundColor Cyan
        Set-Location -Path $DestinationPath
        npm install
        Write-Host "Dependencies installed successfully!" -ForegroundColor Green
        
        # Ask if user wants to start the development server
        $startDev = Read-Host "Do you want to start the development server now? (y/n)"
        if ($startDev -eq "y" -or $startDev -eq "Y") {
            Write-Host "Starting development server..." -ForegroundColor Cyan
            npm run dev
        } else {
            Write-Host "To start the server later, navigate to the project directory and run 'npm run dev'" -ForegroundColor Cyan
        }
    } else {
        Write-Host "Skipping dependency installation. To install dependencies later, navigate to the project directory and run 'npm install'" -ForegroundColor Cyan
    }
}

Write-Host ""
Write-Host "Restoration complete!" -ForegroundColor Green
Write-Host "Your project has been restored to $DestinationPath" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Ensure Node.js and npm are installed" -ForegroundColor Cyan
Write-Host "2. Navigate to the project directory: cd $DestinationPath" -ForegroundColor Cyan
Write-Host "3. Install dependencies: npm install" -ForegroundColor Cyan
Write-Host "4. Start the development server: npm run dev" -ForegroundColor Cyan
Write-Host "5. Open your browser and navigate to: http://localhost:3000" -ForegroundColor Cyan 