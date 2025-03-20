#!/bin/bash
# Vocal Coaching Website - Backup Restoration Script (Unix/Linux/macOS)
# This script restores a backup created by create-backup.sh

# Function to display usage information
show_usage() {
    echo "Usage: $0 <backup_file_path> [destination_path]"
    echo ""
    echo "Arguments:"
    echo "  backup_file_path   - Path to the backup ZIP file"
    echo "  destination_path   - Path to extract the backup to (default: current directory)"
    exit 1
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check arguments
if [ $# -lt 1 ]; then
    show_usage
fi

BACKUP_PATH="$1"
DESTINATION_PATH="${2:-.}"

# Validate backup file exists
if [ ! -f "$BACKUP_PATH" ]; then
    echo "Error: Backup file does not exist at $BACKUP_PATH"
    exit 1
fi

# Create destination directory if it doesn't exist
if [ ! -d "$DESTINATION_PATH" ]; then
    mkdir -p "$DESTINATION_PATH"
    echo "Created destination directory at: $DESTINATION_PATH"
fi

# Extract the backup
echo "Extracting backup file to $DESTINATION_PATH..."
unzip -q "$BACKUP_PATH" -d "$DESTINATION_PATH"

echo "Backup extracted successfully!"

# Check if npm is installed
if ! command_exists npm; then
    echo "Warning: npm is not installed. You will need to install Node.js and npm to run the project."
else
    # Ask if user wants to run npm install
    echo -n "Do you want to run 'npm install' to install dependencies? (y/n): "
    read -r RUN_NPM_INSTALL
    if [[ "$RUN_NPM_INSTALL" == "y" || "$RUN_NPM_INSTALL" == "Y" ]]; then
        echo "Installing dependencies... This may take a few minutes."
        cd "$DESTINATION_PATH" || exit
        npm install
        echo "Dependencies installed successfully!"
        
        # Ask if user wants to start the development server
        echo -n "Do you want to start the development server now? (y/n): "
        read -r START_DEV
        if [[ "$START_DEV" == "y" || "$START_DEV" == "Y" ]]; then
            echo "Starting development server..."
            npm run dev
        else
            echo "To start the server later, navigate to the project directory and run 'npm run dev'"
        fi
    else
        echo "Skipping dependency installation. To install dependencies later, navigate to the project directory and run 'npm install'"
    fi
fi

echo ""
echo "Restoration complete!"
echo "Your project has been restored to $DESTINATION_PATH"
echo ""
echo "Next steps:"
echo "1. Ensure Node.js and npm are installed"
echo "2. Navigate to the project directory: cd $DESTINATION_PATH"
echo "3. Install dependencies: npm install"
echo "4. Start the development server: npm run dev"
echo "5. Open your browser and navigate to: http://localhost:3000" 