export type Postcard = {
  src: string;
  name: string;
  tagline: string;
  glow: string;
  tilt: number;
};

export const POSTCARDS: Postcard[] = [
  {
    src: "/art/postcards/vice-city.jpg",
    name: "Vice City",
    tagline: "Neon never sleeps. Neither do the sharks.",
    glow: "#FF2E97",
    tilt: -3,
  },
  {
    src: "/art/postcards/leonida-keys.jpg",
    name: "Leonida Keys",
    tagline: "Sun, sand, and absolutely no questions asked.",
    glow: "#16E0FF",
    tilt: 2.5,
  },
  {
    src: "/art/postcards/port-gellhorn.jpg",
    name: "Port Gellhorn",
    tagline: "Where the docks are busy and the alibis are cheap.",
    glow: "#FF8A3D",
    tilt: -2,
  },
  {
    src: "/art/postcards/mount-kalaga.jpg",
    name: "Mount Kalaga",
    tagline: "Go off the grid. Stay off the record.",
    glow: "#7B3FE4",
    tilt: 3,
  },
  {
    src: "/art/postcards/grassrivers.jpg",
    name: "Grassrivers",
    tagline: "Airboats, gators, and trouble in the wetlands.",
    glow: "#16E0FF",
    tilt: -2.5,
  },
  {
    src: "/art/postcards/ambrosia.jpg",
    name: "Ambrosia",
    tagline: "Small town. Big secrets. Bigger mistakes.",
    glow: "#FF2E97",
    tilt: 2,
  },
];

/**
 * Cloudinary motion clips. Built from public IDs so transformations
 * (f_auto = best codec, q_auto = adaptive quality, w_* = downscale) keep the
 * 4K source masters from being shipped to the browser at full weight.
 */
const CLOUD = "dknzybvga";
export function cldVideo(publicId: string, width = 720): string {
  return `https://res.cloudinary.com/${CLOUD}/video/upload/f_auto,q_auto,w_${width}/${publicId}.mp4`;
}

export type CastMember = {
  src: string;
  name: string;
  role: string;
  blurb: string;
  accent: string;
  /** One or two Cloudinary clips. Two = cross-fade (the couple). */
  videos: string[];
};

export type Scene = {
  src: string;
  place: string;
  title: string;
  caption: string;
  tone: string;
};

export const SCENES: Scene[] = [
  {
    src: "/art/scenes/vice-city.jpg",
    place: "Vice City",
    title: "High-rise heat",
    caption: "Clean glass, bad ideas, and a skyline built for getting away with it.",
    tone: "#16E0FF",
  },
  {
    src: "/art/scenes/leonida-keys.jpg",
    place: "Leonida Keys",
    title: "Roadside weird",
    caption: "Tourists, iguanas, and a slow day waiting to become a headline.",
    tone: "#FF8A3D",
  },
  {
    src: "/art/scenes/grassrivers.jpg",
    place: "Grassrivers",
    title: "Wetlands chase",
    caption: "Airboats, patrol lights, and nowhere dry enough to hide.",
    tone: "#7B3FE4",
  },
  {
    src: "/art/scenes/mount-kalaga.jpg",
    place: "Mount Kalaga",
    title: "Backroad state lines",
    caption: "Long roads, red clay, and radio silence out past the guardrails.",
    tone: "#FF2E97",
  },
  {
    src: "/art/scenes/port-gellhorn.jpg",
    place: "Port Gellhorn",
    title: "Night shift",
    caption: "Neon puddles, engine noise, and business done after closing.",
    tone: "#16E0FF",
  },
];

export const CAST: CastMember[] = [
  {
    src: "/art/cast/jason-lucia.jpg",
    name: "Jason & Lucia",
    role: "The Couple",
    blurb: "A modern-day Bonnie and Clyde with everything to lose and a state full of reasons to run.",
    accent: "#FF2E97",
    videos: [
      cldVideo("Jason_Duval_Video_Clip_yiffa2", 1280),
      cldVideo("Lucia_Caminos_Video_Clip_gubblc", 1280),
    ],
  },
  {
    src: "/art/cast/boobie-ike.jpg",
    name: "Boobie Ike",
    role: "The Mogul",
    blurb: "Built an empire from the ground up. He pours the champagne; somebody else pays the tab.",
    accent: "#FF8A3D",
    videos: [cldVideo("Boobie_Ike_Video_Clip_xv4rux")],
  },
  {
    src: "/art/cast/raul-bautista.jpg",
    name: "Raul Bautista",
    role: "The Operator",
    blurb: "Always on schedule, always on the move. The kind of professional you only meet once.",
    accent: "#16E0FF",
    videos: [cldVideo("Raul_Bautista_Video_Clip_kr0cpr")],
  },
  {
    src: "/art/cast/real-dimez.jpg",
    name: "Real Dimez",
    role: "The Duo",
    blurb: "Going viral one clip at a time - and turning clout into cold, hard cash.",
    accent: "#7B3FE4",
    videos: [cldVideo("Real_Dimez_Video_Clip_fybnym")],
  },
  {
    src: "/art/cast/drequan-priest.jpg",
    name: "DreQuan Priest",
    role: "The Hustler",
    blurb: "Knows every corner, every connect, every angle. Knowledge is the only currency that matters.",
    accent: "#16E0FF",
    videos: [cldVideo("DreQuan_Priest_Video_Clip_ezsvur")],
  },
  {
    src: "/art/cast/cal-hampton.jpg",
    name: "Cal Hampton",
    role: "The Insider",
    blurb: "Lives behind a wall of screens. If it's online, he's already seen it.",
    accent: "#FF2E97",
    videos: [cldVideo("Cal_Hampton_Video_Clip_sg0woz")],
  },
  {
    src: "/art/cast/brian-heder.jpg",
    name: "Brian Heder",
    role: "The Fixer",
    blurb: "Out on the water where the law gets blurry. He keeps the boats - and the deals - afloat.",
    accent: "#FF8A3D",
    videos: [cldVideo("Brian_Heder_Video_Clip_tzemxp")],
  },
];
