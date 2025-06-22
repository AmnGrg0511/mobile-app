import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function RedirectToRoutine() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/routine');
  }, []);
  return null;
}
