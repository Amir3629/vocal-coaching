# Vocal Coaching Website Backup Tools

This folder contains tools for backing up and restoring the Vocal Coaching Website project.

## Available Scripts

### PowerShell Scripts (Windows)

- `create-full-backup.ps1`: Creates a comprehensive backup of the project
- `restore-backup.ps1`: Restores a backup
- `verify-backup.ps1`: Verifies a backup contains all essential files

### Bash Scripts (macOS/Linux)

- `create-backup.sh`: Creates a comprehensive backup of the project
- `restore-backup.sh`: Restores a backup

## Quick Backup Guide

### Creating a Backup

#### On Windows:

```powershell
.\create-full-backup.ps1
```

The backup will be created in the `backups` directory with a timestamp in the filename.

#### On macOS/Linux:

```bash
./create-backup.sh
```

### Verifying a Backup

#### On Windows:

```powershell
.\verify-backup.ps1 -BackupPath .\backups\your-backup-file.zip
```

### Restoring a Backup

#### On Windows:

```powershell
.\restore-backup.ps1 -BackupPath .\backups\your-backup-file.zip -DestinationPath C:\path\to\destination
```

#### On macOS/Linux:

```bash
./restore-backup.sh ./backups/your-backup-file.zip /path/to/destination
```

## What's in the Backup?

The backup includes:

- All application code and components
- Configuration files
- Assets and resources
- Documentation

The backup does not include:
- `node_modules` directory
- Build artifacts

## For More Information

See the detailed [BACKUP_GUIDE.md](./BACKUP_GUIDE.md) for comprehensive information on backup and restoration procedures. 