#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
BACKUP_DIR="$PROJECT_ROOT/backups/directus"

mkdir -p "$BACKUP_DIR"

# Prompt for SFTP password (hidden input)
echo "Backup Directus database from next.tourdelorraine.ch"
read -s -p "SFTP Password: " SFTP_PASSWORD
echo ""

if [ -z "$SFTP_PASSWORD" ]; then
    echo "Error: Password is required." >&2
    exit 1
fi

TIMESTAMP=$(date +%Y-%m-%dT%H-%M-%S)
LOCAL_FILE="$BACKUP_DIR/data-$TIMESTAMP.db"

echo "Downloading database..."
NODE_PATH="/tmp/sftp-upload/node_modules" SFTP_PASSWORD="$SFTP_PASSWORD" node -e "
const Client = require('ssh2-sftp-client');
const sftp = new Client();
(async () => {
    try {
        const password = process.env.SFTP_PASSWORD;
        await sftp.connect({
            host: 'ftp-7.glei.ch',
            username: 'next.tourdelorraine.ch',
            password: password,
            port: 22,
        });
        await sftp.fastGet('data/directus/database/data.db', '$LOCAL_FILE');
        console.log('✅ Backup saved to: $LOCAL_FILE');
    } catch(e) {
        console.error('❌ Error:', e.message);
        process.exit(1);
    }
    sftp.end();
})();
"

# Keep only the 5 most recent backups
echo "Cleaning up old backups (keeping 5 most recent)..."
cd "$BACKUP_DIR"
ls -t data-*.db 2>/dev/null | tail -n +6 | xargs -r rm -f

BACKUP_COUNT=$(ls data-*.db 2>/dev/null | wc -l)
echo "Total backups available: $BACKUP_COUNT"
