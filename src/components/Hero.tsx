export default function Hero() {
  return (
    <section className="text-center py-16 px-8">
      <h1 className="max-w-2xl mx-auto text-5xl leading-[1.25] tracking-tight text-gray-900 mb-6 font-google-sans-flex">
        Discover modern ideas for designers and engineers.
      </h1>
      <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
        <div className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden">
          <img
            src="https://unavatar.io/github/websseu"
            alt="curator"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
