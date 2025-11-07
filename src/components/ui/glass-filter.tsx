export function GlassFilterDefs() {
  return (
    <svg aria-hidden="true" focusable="false" style={{ position: "absolute", width: 0, height: 0 }}>
      <filter id="glass-distortion">
        <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="77" id="glass-distortion-displacement" />
      </filter>
    </svg>
  );
}

