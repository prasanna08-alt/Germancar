import { useEffect, useRef } from "react";
import Car from "./components/Car.jsx";
import Reveal from "./components/Reveal.jsx";
import Tilt from "./components/Tilt.jsx";
import Carousel from "./components/Carousel.jsx";
import { HERO_IMG, CINE_IMG } from "./data.js";

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const go = (id) => (e) => {
  e.preventDefault();
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
};
const Aurora = ({ opacity, count = 3 }) => (
  <div className="aurora" style={opacity ? { opacity } : undefined}>
    {Array.from({ length: count }, (_, k) => <i key={k} />)}
  </div>
);

export default function App() {
  const hCar = useRef(), hBg = useRef(), hTxt = useRef();
  const cine = useRef(), cCar = useRef(), b1 = useRef(), b2 = useRef();
  const c0 = useRef(), c1 = useRef(), c2 = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let cur = 0, mx = 0, my = 0, raf;
    const pm = (e) => { mouse.current = { x: e.clientX / innerWidth - 0.5, y: e.clientY / innerHeight - 0.5 }; };
    window.addEventListener("pointermove", pm);
    const caps = [c0, c1, c2];

    const tick = () => {
      // Smooth scrolling: an eased value chases the real scroll position.
      cur += (scrollY - cur) * 0.09;
      mx += (mouse.current.x - mx) * 0.06;
      my += (mouse.current.y - my) * 0.06;

      // Parallax hero: each layer moves at its own rate (scroll + mouse).
      if (hCar.current) {
        const f = clamp(cur / (innerHeight * 0.9));
        hBg.current.style.transform = `translate3d(${mx * -30}px,${cur * 0.25 + my * -20}px,0)`;
        hCar.current.style.transform = `translate3d(${mx * 40}px,${cur * 0.45}px,0) rotateY(${mx * 10}deg) scale(${1 + f * 0.5})`;
        hCar.current.style.opacity = 1 - f * 0.9;
        hTxt.current.style.transform = `translate3d(${mx * -18}px,${cur * 0.7}px,0)`;
        hTxt.current.style.opacity = 1 - f * 1.4;
      }

      // Cinematic scroll: a pinned stage driven by scroll progress.
      const el = cine.current;
      if (el) {
        const p = clamp((cur - el.offsetTop) / (el.offsetHeight - innerHeight));
        cCar.current.style.transform = `translate3d(${(0.5 - p) * -30}vw,${p * 8}vh,0) scale(${0.55 + p * 2.1}) rotate(${(p - 0.5) * -4}deg)`;
        cCar.current.style.opacity = p > 0.86 ? clamp(1 - (p - 0.86) / 0.14) : 1;
        b1.current.style.height = b2.current.style.height = 14 - Math.sin(p * Math.PI) * 8 + "vh";
        caps.forEach((c, k) => {
          const a = k / 3 + 0.02, b = (k + 1) / 3 - 0.02, mid = (a + b) / 2;
          const o = 1 - clamp(Math.abs(p - mid) / ((b - a) / 2));
          c.current.style.opacity = clamp(o * 2.2);
          c.current.style.transform = `translateY(${(p - mid) * -140}px) scale(${0.92 + o * 0.08})`;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", pm); };
  }, []);

  const features = [
    ["Chassis", "Aluminium and high-strength steel keep weight low and rigidity high."],
    ["Powertrain", "Turbo petrol, plug-in hybrid and full electric from the same platform."],
    ["Cabin", "Glass displays, real metal and seats shaped for 1,000-kilometre days."],
  ];

  return (
    <div>
      <nav>
        <b>Deutsche Autos</b>
        <div>
          <a href="#fleet" onClick={go("fleet")}>Fleet</a>
          <a href="#story" onClick={go("story")}>Story</a>
          <a href="#craft" onClick={go("craft")}>Craft</a>
          <a href="#brands" onClick={go("brands")}>Brands</a>
        </div>
      </nav>

      <header className="hero">
        <div className="layer" ref={hBg}><Aurora /><div className="layer stars" /></div>
        <div className="road" />
        <div className="car" ref={hCar}><Car id="hero" src={HERO_IMG} /></div>
        <div className="copy" ref={hTxt}>
          <h1>Built in Germany.<br />Driven everywhere.</h1>
          <p className="sub">Five marques, one standard: precision you can feel at 250 km/h.</p>
          <a className="btn main" href="#fleet" onClick={go("fleet")}>Explore the fleet</a>
        </div>
      </header>

      <section className="cine" id="story" ref={cine}>
        <div className="stick">
          <Aurora opacity={0.5} />
          <div className="bar" ref={b1} style={{ top: 0 }} />
          <div className="bar" ref={b2} style={{ bottom: 0 }} />
          <div className="car" ref={cCar}><Car id="cine" src={CINE_IMG} /></div>
          <div className="cap" ref={c0}><h2>Wind tunnel first.</h2><p>Every curve is tested for drag before it is ever drawn in metal.</p></div>
          <div className="cap" ref={c1}><h2>Closer.</h2><p>Panel gaps under a millimetre, hand-checked on the line.</p></div>
          <div className="cap" ref={c2}><h2>Then the Autobahn.</h2><p>Where the speed limit ends and the engineering shows.</p></div>
        </div>
      </section>

      <section className="pad" id="fleet">
        <Aurora opacity={0.35} count={2} />
        <Reveal className="head"><h2>The 3D fleet</h2><p>Turn the ring to compare five German icons.</p></Reveal>
        <Carousel />
      </section>

      <section className="pad" id="craft">
        <Reveal className="head"><h2>Engineered, not assembled</h2><p>Move your pointer over a card to feel the depth.</p></Reveal>
        <div className="grid3">
          {features.map(([t, d]) => (
            <Reveal key={t}>
              <Tilt><div className="glass"><h3 className="pop">{t}</h3><p className="pop">{d}</p></div></Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pad" id="brands">
        <Aurora opacity={0.4} />
        <Reveal className="head"><h2>Five marques in orbit</h2><p>Each brand keeps its own path around the same engineering core.</p></Reveal>
        <Reveal>
          <div className="orbit">
            <div className="core glass">Made in<br />Germany</div>
            <div className="path" style={{ width: "62%", height: "62%", "--t": "22s" }}>
              <span className="glass" style={{ left: "50%" }}>Porsche</span>
              <span className="glass" style={{ top: "100%", left: "50%" }}>Audi</span>
            </div>
            <div className="path" style={{ width: "98%", height: "98%", "--t": "36s", "--d": "reverse", "--r": "normal" }}>
              <span className="glass">BMW</span>
              <span className="glass" style={{ top: "85%", left: "15%" }}>Mercedes</span>
              <span className="glass" style={{ top: "85%", left: "85%" }}>VW</span>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="pad">
        <Reveal>
          <div className="glass cta">
            <h2>Book a test drive</h2>
            <p style={{ margin: "14px auto 0" }}>Leave your email and a specialist will arrange a drive at your nearest showroom.</p>
            <form onSubmit={(e) => { e.preventDefault(); e.target.reset(); alert("Thanks, we will be in touch."); }}>
              <input type="email" required placeholder="you@example.com" aria-label="Email address" />
              <button className="btn main" type="submit">Request test drive</button>
            </form>
          </div>
        </Reveal>
      </section>

      <footer>© 2026 Deutsche Autos. Car images are supplied by the project owner.</footer>
    </div>
  );
}
