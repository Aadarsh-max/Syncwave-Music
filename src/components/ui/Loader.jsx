export default function Loader({ size = 32, color = '#1DB954' }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="rounded-full border-2 border-transparent animate-spin"
        style={{
          width: size,
          height: size,
          borderTopColor: color,
          borderRightColor: `${color}40`,
          filter: `drop-shadow(0 0 6px ${color}80)`,
        }}
      />
    </div>
  )
}