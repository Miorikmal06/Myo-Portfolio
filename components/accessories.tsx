/**
 * Line-art accessories for the portrait. Each one says where it sits on the face:
 *   anchor  which face point it hangs from (see `face` in data/content.ts)
 *   scale   width as a multiple of the face width
 *   dx, dy  shift from the anchor, as a percentage of the accessory's own size
 *   tilt    resting rotation in degrees
 */
export type Accessory = {
  id: string;
  name: string;
  anchor: "eyes" | "top" | "mouth" | "neck";
  scale: number;
  dx: number;
  dy: number;
  tilt: number;
  viewBox: string;
  art: React.ReactNode;
};

export const ACCESSORIES: Accessory[] = [
  {
    id: "shades",
    name: "Sunglasses",
    anchor: "eyes",
    scale: 0.85,
    dx: -50,
    dy: -58,
    tilt: -2,
    viewBox: "0 0 100 34",
    art: (
      <>
        <path className="fill" d="M3 7h39c2 0 3 1 3 3v7c0 9-7 15-16 15h-7C13 32 5 26 4 17Z" />
        <path className="fill" d="M97 7H58c-2 0-3 1-3 3v7c0 9 7 15 16 15h7c9 0 17-6 18-15Z" />
        <path d="M45 12c3-3 7-3 10 0" />
        <path className="shine" d="M12 12l8-1M64 12l8-1" />
      </>
    ),
  },
  {
    id: "specs",
    name: "Round glasses",
    anchor: "eyes",
    scale: 0.8,
    dx: -50,
    dy: -50,
    tilt: 0,
    viewBox: "0 0 100 34",
    art: (
      <>
        <circle cx="27" cy="17" r="14" />
        <circle cx="73" cy="17" r="14" />
        <path d="M41 15q9-6 18 0M13 14H2M87 14h11" />
      </>
    ),
  },
  {
    id: "grad",
    name: "Graduation cap",
    anchor: "top",
    scale: 1.45,
    dx: -50,
    dy: -30,
    tilt: -6,
    viewBox: "0 0 100 60",
    art: (
      <>
        <path className="fill" d="M50 4 96 20 50 36 4 20Z" />
        <path d="M24 28v13c0 6 12 11 26 11s26-5 26-11V28" />
        <path d="M88 23v20" />
        <circle cx="88" cy="46" r="3" />
      </>
    ),
  },
  {
    id: "crown",
    name: "Crown",
    anchor: "top",
    scale: 1.05,
    dx: -50,
    dy: -60,
    tilt: 5,
    viewBox: "0 0 100 56",
    art: (
      <>
        <path d="M10 50 6 14l24 18L50 4l20 28 24-18-4 36Z" />
        <path d="M12 50h76" />
        <circle cx="50" cy="38" r="3" />
        <circle cx="28" cy="40" r="2" />
        <circle cx="72" cy="40" r="2" />
      </>
    ),
  },
  {
    id: "phones",
    name: "Headphones",
    anchor: "top",
    scale: 1.55,
    dx: -50,
    dy: -7,
    tilt: 0,
    viewBox: "0 0 100 86",
    art: (
      <>
        <path d="M10 60C10 24 30 6 50 6s40 18 40 54" />
        <rect className="fill" x="2" y="52" width="16" height="30" rx="7" />
        <rect className="fill" x="82" y="52" width="16" height="30" rx="7" />
      </>
    ),
  },
  {
    id: "party",
    name: "Party hat",
    anchor: "top",
    scale: 0.7,
    dx: -38,
    dy: -76,
    tilt: -14,
    viewBox: "0 0 60 80",
    art: (
      <>
        <path d="M30 10 54 74H6Z" />
        <path d="M18 42h24M12 58h36" />
        <circle cx="30" cy="7" r="5" />
      </>
    ),
  },
  {
    id: "stache",
    name: "Moustache",
    anchor: "mouth",
    scale: 0.4,
    dx: -50,
    dy: -50,
    tilt: 0,
    viewBox: "0 0 100 28",
    art: (
      <path
        className="solid"
        d="M50 11c-6-8-18-10-28-2-6 5-14 6-20 2 4 11 16 15 27 11 9-3 15-8 21-10 6 2 12 7 21 10 11 4 23 0 27-11-6 4-14 3-20-2-10-8-22-6-28 2Z"
      />
    ),
  },
  {
    id: "halo",
    name: "Halo",
    anchor: "top",
    scale: 1.0,
    dx: -50,
    dy: -117,
    tilt: -4,
    viewBox: "0 0 100 24",
    art: <ellipse cx="50" cy="12" rx="45" ry="8" className="glow" />,
  },
  {
    id: "bow",
    name: "Bow tie",
    anchor: "neck",
    scale: 0.5,
    dx: -50,
    dy: -50,
    tilt: 0,
    viewBox: "0 0 100 36",
    art: (
      <>
        <path className="fill" d="M44 18 6 4v28ZM56 18l38-14v28Z" />
        <rect className="fill" x="42" y="10" width="16" height="16" rx="3" />
      </>
    ),
  },
  {
    id: "beanie",
    name: "Beanie",
    anchor: "top",
    scale: 1.3,
    dx: -50,
    dy: -32,
    tilt: 4,
    viewBox: "0 0 100 64",
    art: (
      <>
        <path className="fill" d="M8 46C8 20 28 8 50 8s42 12 42 38Z" />
        <rect className="fill" x="4" y="44" width="92" height="16" rx="5" />
        <path d="M20 46v14M36 46v14M52 46v14M68 46v14M84 46v14" />
        <circle cx="50" cy="6" r="5" />
      </>
    ),
  },
];
