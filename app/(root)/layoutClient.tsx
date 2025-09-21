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
          height="8px"
          color="#192440"
          options={{ showSpinner: false }}
          shallowRouting
        >
          {children}
        </ProgressProvider>
      </div>
    </div>
  );
}
