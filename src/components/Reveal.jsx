import { useEffect, useRef, useState } from "react";

// Fades in when entering the viewport and fades out when leaving (both directions).
export default function Reveal({ children, className = "", as: Tag = "div", ...rest }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0.18 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`rev ${on ? "in" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
