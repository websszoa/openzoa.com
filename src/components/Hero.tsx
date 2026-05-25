export default function Hero() {
  return (
    <section className="text-center py-16 px-8">
      <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
        Small details. Better interfaces.
      </h1>
      <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
        <div className="w-6 h-6 rounded-full bg-gray-300 overflow-hidden">
          <img
            src="https://unavatar.io/github/websseu"
            alt="curator"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
        <span>Curated by</span>
        <span className="font-medium text-gray-800" style={{ fontFamily: 'cursive' }}>
          openzoa
        </span>
      </div>
    </section>
  )
}
