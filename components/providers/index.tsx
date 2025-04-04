

import CustomSidebarProvider from './custom-sidebar-provider'
import NuqsAdapterProvider from './nuqs-adapter-provider';
import ReactQueryProvider from './react-query-provider';
import ToasterProvider from './toaster-provider';
import TopLoaderProvider from './top-loader-provider';

// const ConnectionProvider = dynamic(() => import('./ConnectionProvider'), { ssr: false, })

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TopLoaderProvider>
      <ReactQueryProvider>
        <NuqsAdapterProvider>
          <CustomSidebarProvider>
            <ToasterProvider>
              {children}
            </ToasterProvider>
          </CustomSidebarProvider>
        </NuqsAdapterProvider>
      </ReactQueryProvider>
    </TopLoaderProvider>
  )
}
