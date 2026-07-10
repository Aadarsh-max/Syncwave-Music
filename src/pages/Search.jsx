import { useState } from "react";
import SearchBar from "../components/search/SearchBar.jsx";
import SearchResults from "../components/search/SearchResults.jsx";
import useSpotifySearch from "../hooks/useSpotifySearch.js";
import {
  HiFire,
  HiMusicNote,
  HiLightningBolt,
  HiMoon,
  HiHeart,
  HiGlobe,
} from "react-icons/hi";
import { RiAlbumFill } from "react-icons/ri";

const genres = [
  {
    label: "Pop",
    icon: HiMusicNote,
    gradient: "linear-gradient(135deg, #1DB954, #0ea5e9)",
  },
  {
    label: "Hip-Hop",
    icon: HiFire,
    gradient: "linear-gradient(135deg, #f97316, #ef4444)",
  },
  {
    label: "Electronic",
    icon: HiLightningBolt,
    gradient: "linear-gradient(135deg, #8b5cf6, #6366f1)",
  },
  {
    label: "R&B",
    icon: HiHeart,
    gradient: "linear-gradient(135deg, #ec4899, #8b5cf6)",
  },
  {
    label: "Lo-Fi",
    icon: HiMoon,
    gradient: "linear-gradient(135deg, #0ea5e9, #6366f1)",
  },
  {
    label: "World",
    icon: HiGlobe,
    gradient: "linear-gradient(135deg, #eab308, #f97316)",
  },
  {
    label: "Albums",
    icon: RiAlbumFill,
    gradient: "linear-gradient(135deg, #6366f1, #ec4899)",
  },
  {
    label: "New Releases",
    icon: HiFire,
    gradient: "linear-gradient(135deg, #1DB954, #eab308)",
  },
];

export default function Search() {
  const { results, loading, query, search, clear } = useSpotifySearch();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (q) => {
    setHasSearched(true);
    search(q);
  };
  const handleClear = () => {
    setHasSearched(false);
    clear();
  };

  return (
    <div className="p-4 md:p-6 min-h-full relative">
      <div
        className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,165,233,0.06) 0%, transparent 100%)",
        }}
      />

      <h1
        className="text-3xl md:text-4xl font-black mb-6 relative"
        style={{
          background: "linear-gradient(135deg, #fff 0%, #9ca3af 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-1px",
        }}
      >
        Search
      </h1>

      <div className="max-w-2xl mb-8">
        <SearchBar onSearch={handleSearch} onClear={handleClear} autoFocus />
      </div>

      {!hasSearched ? (
        <>
          <h2
            className="text-lg font-black mb-4 text-white"
            style={{ letterSpacing: "-0.3px" }}
          >
            Browse by genre
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {genres.map((g) => {
              const Icon = g.icon;
              return (
                <div
                  key={g.label}
                  className="relative h-24 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:scale-[1.03]"
                  style={{ background: g.gradient }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 8px 32px rgba(0,0,0,0.4)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = "none")
                  }
                >
                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <span
                      className="text-white font-black text-base"
                      style={{ letterSpacing: "-0.3px" }}
                    >
                      {g.label}
                    </span>
                    <Icon
                      size={32}
                      color="rgba(255,255,255,0.3)"
                      style={{ alignSelf: "flex-end" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <SearchResults results={results} loading={loading} query={query} />
      )}
    </div>
  );
}
