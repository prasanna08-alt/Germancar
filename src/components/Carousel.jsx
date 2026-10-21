import { useEffect, useState } from "react";
import { MODELS } from "../data.js";
import Car from "./Car.jsx";
import Reveal from "./Reveal.jsx";

// 3D ring carousel: drag, buttons, or autoplay.
export default function Carousel() {
  const [i, setI] = useState(0);
  const [dragX, setDragX] = useState(null);
  const [R, setR] = useState(430);
  const n = MODELS.length, step = 360 / n;

  useEffect(() => {
    const f = () => setR(window.innerWidth < 640 ? 260 : 430);
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setI((v) => v + 1), 5000);
    return () => clearInterval(t);
  }, []);

  const act = ((i % n) + n) % n;
  const m = MODELS[act];

  return (
    <div>
      <div
        className="stage"
        onPointerDown={(e) => setDragX(e.clientX)}
        onPointerUp={(e) => {
          if (dragX !== null) {
            const d = e.clientX - dragX;
            if (Math.abs(d) > 40) setI((v) => v + (d < 0 ? 1 : -1));
            setDragX(null);
          }
        }}
      >
        <div className="ring" style={{ transform: `translateZ(${-R}px) rotateY(${-i * step}deg)` }}>
          {MODELS.map((c, k) => (
            <div
              key={c.n}
              className={"card glass " + (c.img ? "ph " : "") + (k === act ? "" : "off")}
              style={{ transform: `rotateY(${k * step}deg) translateZ(${R}px)` }}
            >
              {c.img ? (
                <>
                  <img src={c.img} alt={c.n} draggable="false" />
                  <div className="cap2">{c.n}</div>
                </>
              ) : (
                <>
                  <Car color={c.c} id={"k" + k} />
                  <p className="tag">{c.n}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="ctl">
        <button className="btn" onClick={() => setI(i - 1)} aria-label="Previous model">Previous</button>
        <button className="btn main" onClick={() => setI(i + 1)} aria-label="Next model">Next model</button>
      </div>
      <Reveal className="glass spec" key={act}>
        <div><b>{m.hp}</b><span>Power</span></div>
        <div><b>{m.s}</b><span>0–100 km/h</span></div>
        <div><b>{m.t}</b><span>Top speed</span></div>
      </Reveal>
      <p style={{ textAlign: "center", margin: "18px auto 0" }}>
        {m.n} – {m.tag}. Drag or tap to turn the carousel.
      </p>
    </div>
  );
}
