export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full max-w-3xl mx-auto p-3 sm:p-4 md:p-5 flex flex-col gap-4 sm:gap-5">
      {children}
    </main>
  );
}
