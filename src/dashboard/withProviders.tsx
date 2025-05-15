import React from "react";
import { WixDesignSystemProvider } from "@wix/design-system";
import { WixPatternsProvider } from "@wix/patterns/provider";
import { withDashboard } from "@wix/dashboard-react";

export function withProviders<P extends {} = {}>(Component: React.FC<P>) {
  return withDashboard(function DashboardProviders(props: P) {
    return (
      <WixDesignSystemProvider>
        <WixPatternsProvider>
          <Component {...props} />
        </WixPatternsProvider>
      </WixDesignSystemProvider>
    );
  });
}
