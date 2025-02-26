import * as React from "react";
import { AppleButton } from "@/registry/apple-button/apple-button";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Alive UI</h1>
        <p className="text-muted-foreground">
          A beautiful [shadcn/ui](https://ui.shadcn.com) based component library
          with Apple-inspired designs.
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-8">
        <div className="flex items-center justify-center">
          <AppleButton>Click me</AppleButton>
        </div>
      </main>
    </div>
  );
}
