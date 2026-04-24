export default function Footer() {
  return (
      <footer className="bg-[#f3f4ee] pt-15 pb-15 md:pb-15">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-outline-variant/10 pt-12">
          <div className="space-y-6">
            <div className="text-2xl font-bold tracking-tight text-primary">
              Explorer
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Curating the world&aposs most breathtaking adventures for the modern
              traveler. Join the movement.
            </p>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors">
                public
              </span>
              <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors">
                camera_outdoor
              </span>
              <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors">
                hiking
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Discover</h4>
            <ul className="text-on-surface-variant text-sm space-y-2">
              <li className="hover:text-primary cursor-pointer transition-colors">
                Destinations
              </li>
              <li className="hover:text-primary cursor-pointer transition-colors">
                Trip Types
              </li>
              <li className="hover:text-primary cursor-pointer transition-colors">
                Host Program
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Community</h4>
            <ul className="text-on-surface-variant text-sm space-y-2">
              <li className="hover:text-primary cursor-pointer transition-colors">
                Member Stories
              </li>
              <li className="hover:text-primary cursor-pointer transition-colors">
                Safety Guidelines
              </li>
              <li className="hover:text-primary cursor-pointer transition-colors">
                Help Center
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold">Stay Inspired</h4>
            <div className="flex bg-surface px-4 py-2 rounded-xl border border-outline-variant/20">
              <input
                className="bg-transparent border-none focus:ring-0 text-sm w-full"
                placeholder="Your email"
                type="text"
              />
              <button className="text-primary font-bold text-sm">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-outline-variant/10 text-center text-xs text-outline">
          © 2024 Explorer. Built for the wild at heart.
        </div>
      </footer>
  );
}