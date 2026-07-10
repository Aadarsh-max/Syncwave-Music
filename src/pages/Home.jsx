import {
  HiPlay,
  HiFire,
  HiMusicNote,
  HiLightningBolt,
  HiMoon,
  HiStar,
  HiHeart,
} from "react-icons/hi";

const playlists = [
  {
    id: 1,
    name: "Liked Songs",
    icon: HiHeart,
    gradient: "linear-gradient(135deg, #5038a0, #7c3aed, #ec4899)",
  },
  {
    id: 2,
    name: "Daily Mix 1",
    icon: HiFire,
    gradient: "linear-gradient(135deg, #1DB954, #0ea5e9)",
  },
  {
    id: 3,
    name: "Top Hits",
    icon: HiStar,
    gradient: "linear-gradient(135deg, #f97316, #ef4444, #ec4899)",
  },
  {
    id: 4,
    name: "Chill Vibes",
    icon: HiMoon,
    gradient: "linear-gradient(135deg, #0ea5e9, #6366f1)",
  },
  {
    id: 5,
    name: "Workout",
    icon: HiLightningBolt,
    gradient: "linear-gradient(135deg, #f97316, #eab308)",
  },
  {
    id: 6,
    name: "Late Night",
    icon: HiMusicNote,
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)",
  },
];

const recentColors = [
  {
    gradient: "linear-gradient(135deg, #1DB95440, #0ea5e920)",
    glow: "#1DB954",
  },
  {
    gradient: "linear-gradient(135deg, #8b5cf640, #ec489920)",
    glow: "#8b5cf6",
  },
  {
    gradient: "linear-gradient(135deg, #f9731640, #ef444420)",
    glow: "#f97316",
  },
  {
    gradient: "linear-gradient(135deg, #0ea5e940, #6366f120)",
    glow: "#0ea5e9",
  },
  {
    gradient: "linear-gradient(135deg, #eab30840, #f9731620)",
    glow: "#eab308",
  },
];

export default function Home() {
  return (
    <div className="p-4 md:p-6 min-h-full relative">
      <div
        className="absolute top-0 left-0 right-0 h-80 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(29,185,84,0.08) 0%, rgba(14,165,233,0.04) 40%, transparent 100%)",
        }}
      />
      <div
        className="absolute top-20 right-10 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <h1
        className="text-3xl md:text-4xl font-black mb-1 relative"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #e2e2e2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-1px",
        }}
      >
        Good evening
      </h1>
      <p
        className="text-sm font-medium mb-6 relative"
        style={{ color: "#4a4a5a" }}
      >
        What do you want to listen to?
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8 relative">
        {playlists.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.id}
              className="flex items-center rounded-xl overflow-hidden h-16 cursor-pointer transition-all duration-200 hover:scale-[1.02] group"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.border =
                  "1px solid rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.border =
                  "1px solid rgba(255,255,255,0.06)";
              }}
            >
              <div
                className="w-16 h-16 shrink-0 flex items-center justify-center"
                style={{ background: p.gradient }}
              >
                <Icon size={22} color="rgba(255,255,255,0.9)" />
              </div>
              <span className="text-white font-bold text-sm px-4">
                {p.name}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-lg md:text-xl font-black"
          style={{
            background: "linear-gradient(135deg, #fff, #9ca3af)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.5px",
          }}
        >
          Recently played
        </h2>
        <span
          className="text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-white transition-colors"
          style={{ color: "#4a4a5a" }}
        >
          See all
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
        {recentColors.map((t, i) => (
          <div key={i} className="flex flex-col gap-3 cursor-pointer group">
            <div
              className="w-full aspect-square rounded-2xl relative overflow-hidden transition-all duration-300 group-hover:scale-[1.03]"
              style={{
                background: t.gradient,
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = `0 8px 32px ${t.glow}30`)
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(0,0,0,0.3)" }}
              />
              <div
                className="absolute bottom-2 right-2 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                style={{
                  background: "linear-gradient(135deg, #1DB954, #0ea5e9)",
                  boxShadow: `0 4px 20px ${t.glow}80`,
                }}
              >
                <HiPlay size={16} color="#000" style={{ marginLeft: "2px" }} />
              </div>
            </div>
            <div className="flex flex-col gap-1.5 px-1">
              <div
                className="h-2.5 rounded-full"
                style={{
                  width: "80%",
                  background: "linear-gradient(90deg, #2a2a3a, #1a1a2a)",
                }}
              />
              <div
                className="h-2 rounded-full w-1/2"
                style={{ background: "#15151f" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
