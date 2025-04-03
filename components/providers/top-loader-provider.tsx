'use client'

import { useState, useRef, useEffect, usePathname, Suspense } from '@/lib/react-npm';
import { LoadingBar, type LoadingBarRef } from '@/lib/npm';

export default function TopLoaderProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [previousLocation, setPreviousLocation] = useState("")
  const pathname = usePathname();

  const ref = useRef<LoadingBarRef | null>(null);

  useEffect(() => {

    setPreviousLocation(pathname);

    ref.current?.continuousStart()

    if (pathname === previousLocation) {
      setPreviousLocation('');
    }

  }, [pathname])

  useEffect(() => {
    ref.current?.complete();
  }, [previousLocation])

  return (
    <>
      <LoadingBar height={2} color="#C3CC5A" ref={ref} shadow={true} />
      <Suspense>
        {children}
      </Suspense>
    </>
  )
}