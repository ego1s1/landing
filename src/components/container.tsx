export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full max-w-3xl mx-auto p-5 flex flex-col gap-5 relative rounded-2xl overflow-hidden">
      <div className="glass-filter" />
      <div className="glass-overlay" />
      <div className="glass-distortion-overlay" />
      <div className="relative z-10">
        {children}
      </div>
    </main>
  );
}
