export function KojiLogo({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center bg-gradient-to-br from-green-400 to-green-500 rounded-2xl ${className}`}>
      <div className="w-1/2 h-1/2 bg-black rounded-sm" />
    </div>
  );
}