import React from "react";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-white md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center justify-center border-b px-4 lg:h-[60px] lg:px-6"></div>
        </div>
        <div className="flex flex-col overflow-y-scroll">
          <header className=" md:hidden flex h-14 items-center gap-4 border-b bg-muted/40 p-4 lg:h-[60px] lg:px-6"></header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-neutral-100">
            {/* <Outlet /> */}
          </main>
        </div>
      </div>
    </div>
  );
}

export { MainLayout };
