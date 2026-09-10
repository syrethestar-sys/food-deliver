import { Logo } from "@/components/Logo";

const menuLinks = [
  "Appetizers",
  "Salads",
  "Pizzas",
  "Main dishes",
  "Desserts",
  "Side dish",
  "Brunch",
  "Beverages",
  "Fish & Sea foods",
];

export function SiteFooter() {
  return (
    <footer>
      <div className="overflow-hidden bg-[#EF4444] py-3">
        <div className="flex items-center gap-10 whitespace-nowrap text-sm font-semibold tracking-wide text-white">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i}>Fresh fast delivered</span>
          ))}
        </div>
      </div>

      <div className="bg-[#18181B] px-6 py-12 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-1 items-center">
            <Logo/>
            <p className="text-lg font-bold">
              Nom<span className="text-[#EF4444]">Nom</span>
            </p>
            <p className="text-xs text-white/60">Swift delivery</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase text-white/50">
                NomNom
              </p>
              <ul className="space-y-2 text-sm text-white/80">
                <li>Home</li>
                <li>Contact us</li>
                <li>Delivery zone</li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase text-white/50">
                Menu
              </p>
              <ul className="space-y-2 text-sm text-white/80">
                {menuLinks.map((link) => (
                  <li key={link}>{link}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase text-white/50">
                Follow us
              </p>
              <div className="flex gap-3 text-white/80">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
                  <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5H16.7V4.6c-.3 0-1.3-.13-2.46-.13-2.43 0-4.1 1.49-4.1 4.22v2.35H7.3V14h2.84v8h3.36z" />
                </svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>Copyright 2024 © Nomnom LLC</p>
          <div className="flex gap-4">
            <span>Privacy policy</span>
            <span>Terms and condition</span>
            <span>Cookie policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
