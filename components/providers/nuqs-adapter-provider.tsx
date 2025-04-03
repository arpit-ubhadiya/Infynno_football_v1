import { NuqsAdapter } from "@/lib/npm";


export default function NuqsAdapterProvider({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      {children}
    </NuqsAdapter>
  );
}