// Shows a real car image when `src` is given, otherwise a drawn SVG car with spinning rims.
const SOFT =
  "linear-gradient(to right,transparent,#000 14%,#000 86%,transparent),linear-gradient(to bottom,transparent,#000 20%,#000 80%,transparent)";

export default function Car({ color = "#c9ced6", accent = "#27e0b5", id = "c", src = "" }) {
  if (src) {
    return (
      <img
        src={src}
        alt="German car"
        draggable="false"
        style={{
          width: "100%", display: "block", pointerEvents: "none",
          WebkitMaskImage: SOFT, maskImage: SOFT,
          WebkitMaskComposite: "source-in", maskComposite: "intersect",
        }}
      />
    );
  }
  const wheel = (cx) => (
    <g key={cx}>
      <circle cx={cx} cy="118" r="29" fill="#0a0a0d" />
      <g className="rim">
        <circle cx={cx} cy="118" r="19" fill="#aeb4be" />
        {[0, 60, 120].map((a) => (
          <rect key={a} x={cx - 1.5} y="101" width="3" height="34" fill="#2a2d34" transform={`rotate(${a} ${cx} 118)`} />
        ))}
        <circle cx={cx} cy="118" r="5" fill={accent} />
      </g>
    </g>
  );
  const body = "M18 112q2-22 42-28l52-22q42-20 112-18 52 2 82 26l56 8q36 6 36 34v10H18z";
  return (
    <svg viewBox="0 0 420 160" role="img" aria-label="Sports saloon, side view">
      <defs>
        <linearGradient id={"g" + id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".55" />
          <stop offset=".5" stopColor={color} />
          <stop offset="1" stopColor="#000" stopOpacity=".55" />
        </linearGradient>
      </defs>
      <ellipse cx="210" cy="148" rx="190" ry="8" fill="#000" opacity=".5" />
      <path d={body} fill={color} />
      <path d={body} fill={`url(#g${id})`} />
      <path d="M122 66q36-16 86-14v26H104zM218 52q38 2 62 26h-62z" fill="#0d1a2b" opacity=".92" />
      <rect x="360" y="96" width="30" height="7" rx="3" fill={accent} />
      <rect x="30" y="98" width="16" height="6" rx="3" fill="#ff4d6d" />
      {wheel(100)}
      {wheel(322)}
    </svg>
  );
}
