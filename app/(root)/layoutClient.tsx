"use client";

import { ProgressProvider } from "@bprogress/next/app";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <ProgressProvider
          height="4px"
          color="#0f172b"
          options={{ showSpinner: false }}
          shallowRouting
        >
          {children}
        </ProgressProvider>
      </div>
    </div>
  );
}
