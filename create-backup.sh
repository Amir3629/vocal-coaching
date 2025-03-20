#!/bin/bash
# Vocal Coaching Website - Full Backup Script (Unix/Linux/macOS)
# This script creates a comprehensive backup of the project

# Exit on error
set -e

# Get current timestamp for backup file name
timestamp=$(date +"%Y-%m-%d-%H-%M-%S")
backup_name="vocal-coaching-backup-$timestamp"
backup_dir="./backups"
backup_path="$backup_dir/$backup_name.zip"

# Create backups directory if it doesn't exist
if [ ! -d "$backup_dir" ]; then
    mkdir -p "$backup_dir"
    echo "Created backup directory at: $backup_dir"
fi

# Define directories to include in the backup
include_dirs=(
    "app"
    "public"
    "pages"
    "components"
    "lib"
    "utils"
    "hooks"
    "styles"
    "images"
    "assets"
    "js"
)

# Define file patterns to include
include_files=(
    "*.json"
    "*.js"
    "*.ts"
    "*.tsx"
    "*.md"
    "*.css"
    "*.config.js"
    "*.config.ts"
    ".env.local"
    ".env.example"
    "next.config.js"
    "next.config.mjs"
    "tailwind.config.js"
    "tailwind.config.ts"
    "postcss.config.js"
)

# Define directories to exclude
exclude_dirs=(
    "node_modules"
    ".next"
    ".git"
    "out"
    "dist"
)

# Create a temporary directory for backup preparation
temp_dir="./temp_backup_$timestamp"
mkdir -p "$temp_dir"
echo "Created temporary directory for backup preparation"

# Copy BACKUP_GUIDE.md to the temp directory
if [ -f "BACKUP_GUIDE.md" ]; then
    cp "BACKUP_GUIDE.md" "$temp_dir/"
    echo "Added backup guide to the package"
fi

# Copy directories
for dir in "${include_dirs[@]}"; do
    if [ -d "$dir" ]; then
        mkdir -p "$temp_dir/$dir"
        
        # Create exclude pattern for rsync
        exclude_pattern=""
        for exclude in "${exclude_dirs[@]}"; do
            exclude_pattern="$exclude_pattern --exclude=$exclude"
        done
        
        # Use rsync to copy directory contents, excluding specified dirs
        rsync -av --quiet $exclude_pattern "$dir/" "$temp_dir/$dir/"
        
        echo "Copied directory: $dir"
    fi
done

# Copy individual config files from root
echo "Copying configuration files..."
for pattern in "${include_files[@]}"; do
    # Use find to locate files matching the pattern
    while IFS= read -r file; do
        if [ -f "$file" ]; then
            cp "$file" "$temp_dir/"
            echo "  - $(basename "$file")"
        fi
    done < <(find . -maxdepth 1 -name "$pattern" -type f)
done

# Create the ZIP file
echo "Creating ZIP archive..."
cd "$temp_dir"
zip -r "../$backup_path" ./*
cd ..

# Clean up the temporary directory
rm -rf "$temp_dir"
echo "Cleaned up temporary directory"

echo "Backup completed successfully!"
echo "Backup file created: $backup_path"
echo "Backup size: $(du -h "$backup_path" | cut -f1)"
echo ""
echo "To restore this backup, use the instructions in BACKUP_GUIDE.md" 