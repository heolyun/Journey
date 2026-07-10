export function ProfilePlaceholder() {
  return (
    <div
      aria-label="Profile placeholder"
      className="mx-auto grid h-28 w-28 place-items-center rounded-full border border-white/16 bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_80px_rgba(102,227,255,0.12)] md:h-32 md:w-32"
      role="img"
    >
      <div className="h-20 w-20 rounded-full border border-white/12 bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.2),rgba(255,255,255,0.04)_45%,rgba(255,255,255,0.02)_100%)] md:h-24 md:w-24" />
    </div>
  );
}
