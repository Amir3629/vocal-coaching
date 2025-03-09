const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');
const { execSync } = require('child_process');
const AWS = require('aws-sdk');
const { GoogleAuth } = require('google-auth-library');
const { Storage } = require('@google-cloud/storage');

// Configuration
const config = {
  local: {
    backupDir: path.join(process.cwd(), 'backups'),
    maxBackups: 5
  },
  s3: {
    bucket: process.env.AWS_BACKUP_BUCKET,
    region: process.env.AWS_REGION
  },
  gcs: {
    bucket: process.env.GCS_BACKUP_BUCKET,
    projectId: process.env.GCS_PROJECT_ID
  }
};

// 1. Local File System Backup
async function createLocalBackup() {
  console.log('Creating local backup...');
  
  // Create backup directory if it doesn't exist
  fs.ensureDirSync(config.local.backupDir);

  // Create timestamp for backup name
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(config.local.backupDir, `backup-${timestamp}.zip`);
  
  // Create a zip archive
  const output = fs.createWriteStream(backupPath);
  const archive = archiver('zip', { zlib: { level: 9 } });
  
  archive.pipe(output);
  
  // Add source files
  archive.directory('app/', 'app');
  archive.directory('public/', 'public');
  archive.directory('scripts/', 'scripts');
  archive.file('package.json');
  archive.file('next.config.js');
  archive.file('tailwind.config.js');
  
  // Git data
  if (fs.existsSync('.git')) {
    archive.directory('.git/', '.git');
  }
  
  await archive.finalize();
  
  // Rotate old backups
  const backups = fs.readdirSync(config.local.backupDir)
    .filter(file => file.startsWith('backup-'))
    .sort()
    .reverse();
    
  if (backups.length > config.local.maxBackups) {
    backups.slice(config.local.maxBackups).forEach(backup => {
      fs.unlinkSync(path.join(config.local.backupDir, backup));
    });
  }
  
  console.log(`Local backup created: ${backupPath}`);
  return backupPath;
}

// 2. Git Repository Backup
async function createGitBackup() {
  console.log('Creating Git backup...');
  
  try {
    // Create a new backup branch
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupBranch = `backup-${timestamp}`;
    
    // Create and switch to backup branch
    execSync(`git checkout -b ${backupBranch}`);
    
    // Add all changes
    execSync('git add -A');
    
    // Commit changes
    execSync(`git commit -m "Backup: ${timestamp}"`);
    
    // Push to remote
    execSync(`git push origin ${backupBranch}`);
    
    // Switch back to main branch
    execSync('git checkout main');
    
    console.log(`Git backup created: ${backupBranch}`);
    return backupBranch;
  } catch (error) {
    console.error('Git backup failed:', error.message);
    // Clean up if needed
    try {
      execSync('git checkout main');
    } catch (e) {
      // Ignore cleanup errors
    }
    throw error;
  }
}

// 3. Cloud Storage Backup (AWS S3 and Google Cloud Storage)
async function createCloudBackup(localBackupPath) {
  console.log('Creating cloud backups...');
  
  const filename = path.basename(localBackupPath);
  const promises = [];
  
  // AWS S3 Backup
  if (config.s3.bucket) {
    const s3 = new AWS.S3({ region: config.s3.region });
    promises.push(
      s3.upload({
        Bucket: config.s3.bucket,
        Key: `backups/${filename}`,
        Body: fs.createReadStream(localBackupPath)
      }).promise()
    );
  }
  
  // Google Cloud Storage Backup
  if (config.gcs.bucket) {
    const storage = new Storage({
      projectId: config.gcs.projectId
    });
    const bucket = storage.bucket(config.gcs.bucket);
    promises.push(
      bucket.upload(localBackupPath, {
        destination: `backups/${filename}`
      })
    );
  }
  
  await Promise.all(promises);
  console.log('Cloud backups completed');
}

// Main backup function
async function performBackup() {
  try {
    // 1. Create local backup
    const localBackupPath = await createLocalBackup();
    
    // 2. Create Git backup
    await createGitBackup();
    
    // 3. Create cloud backups
    await createCloudBackup(localBackupPath);
    
    console.log('All backups completed successfully!');
  } catch (error) {
    console.error('Backup failed:', error);
    process.exit(1);
  }
}

// Run backup if called directly
if (require.main === module) {
  performBackup();
}

module.exports = {
  performBackup,
  createLocalBackup,
  createGitBackup,
  createCloudBackup
}; 