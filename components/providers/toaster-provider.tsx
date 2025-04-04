'use client'

import { Toaster } from '@/lib/npm';

export default function ToasterProvider({ children }: { children: React.ReactNode }) {

  return (
    <>

      {children}

      <Toaster
        position='top-right'
        closeButton={true}
        richColors
        visibleToasts={1}
      />

    </>
  )
}
