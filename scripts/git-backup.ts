import { execSync } from 'child_process';

function runGitBackup() {
  try {
    // Check if there are any changes
    const status = execSync('git status --porcelain').toString();
    if (!status.trim()) {
      console.log('No changes detected in the repository.');
      return;
    }

    console.log('Changes detected! Starting backup...');
    
    // Stage all changes
    execSync('git add .', { stdio: 'inherit' });
    
    // Commit with a timestamp
    const timestamp = new Date().toISOString();
    execSync(`git commit -m "Auto backup: ${timestamp}"`, { stdio: 'inherit' });
    
    // Push to remote repository
    execSync('git push', { stdio: 'inherit' });
    
    console.log('Backup completed successfully.');
  } catch (error) {
    console.error('Git backup failed:', error);
  }
}

runGitBackup();
