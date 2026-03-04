import { useEffect, useRef } from 'react';
import { createAutoBackup } from '@/lib/forumStorage';
import { pruneBackups } from '@/lib/storage';

const BACKUP_INTERVAL = 30 * 60 * 1000; // 30 minutes

export function useAutoBackup() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Initial backup after 1 minute
    const initialTimeout = setTimeout(async () => {
      try {
        await createAutoBackup();
        await pruneBackups(10);
        console.log('[AutoBackup] Initial backup created');
      } catch (e) {
        console.error('[AutoBackup] Failed:', e);
      }
    }, 60 * 1000);

    // Regular backups every 30 minutes
    intervalRef.current = setInterval(async () => {
      try {
        await createAutoBackup();
        await pruneBackups(10);
        console.log('[AutoBackup] Periodic backup created');
      } catch (e) {
        console.error('[AutoBackup] Failed:', e);
      }
    }, BACKUP_INTERVAL);

    return () => {
      clearTimeout(initialTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
}
