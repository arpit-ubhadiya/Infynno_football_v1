'use client'

import { useEffect, useState } from '@/lib/react-npm';
const ClientOnlyProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? children : null;
};

export default ClientOnlyProvider;
