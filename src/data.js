const base = import.meta.env.BASE_URL;

export const HERO_IMG = `${base}cars/hero.jpg`;
export const CINE_IMG = `${base}cars/cinematic.jpg`;

export const MODELS = [
  { n: "Mercedes-Benz S-Class", c: "#c9ced6", hp: "496 hp", s: "4.9 s", t: "250 km/h", tag: "Stuttgart · luxury", img: `${base}cars/mercedes-s-class.jpg` },
  { n: "BMW M3", c: "#3a6bff", hp: "503 hp", s: "3.5 s", t: "290 km/h", tag: "Munich · performance", img: `${base}cars/bmw-m3.jpg` },
  { n: "Audi RS 6 Avant", c: "#ff4d6d", hp: "600 hp", s: "3.6 s", t: "250 km/h", tag: "Neckarsulm · performance wagon", img: `${base}cars/audi-rs6-avant.jpg` },
  { n: "Porsche 911 Carrera", c: "#f2c230", hp: "379 hp", s: "4.2 s", t: "293 km/h", tag: "Zuffenhausen · icon", img: `${base}cars/porsche-911.jpg` },
  { n: "Volkswagen Tiguan", c: "#27e0b5", hp: "320 hp", s: "5.3 s", t: "250 km/h", tag: "Wolfsburg · family SUV", img: `${base}cars/vw-tiguan.jpg` },
];
