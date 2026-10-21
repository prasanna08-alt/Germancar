import { useRef } from "react";

// 3D tilt that follows the pointer.
export default function Tilt({ children, className = "", max = 12 }) {
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `rotateX(${-y * max}deg) rotateY(${x * max}deg) scale(1.03)`;
  };
  const leave = () => { ref.current.style.transform = ""; };
  return (
    <div ref={ref} className={"tilt " + className} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </div>
  );
}
