type SectionBreakProps = {
  tone?: "pink" | "cyan" | "sunset";
};

const TONES = {
  pink: "rgba(255,46,151,0.42)",
  cyan: "rgba(22,224,255,0.38)",
  sunset: "rgba(255,138,61,0.36)",
} as const;

export function SectionBreak({ tone = "pink" }: SectionBreakProps) {
  return (
    <div className="section-burn relative h-12 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, transparent, ${TONES[tone]}, transparent)`,
        }}
      />
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-paper/35 to-transparent" />
    </div>
  );
}
