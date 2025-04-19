export default function Footer() {
    return (
        <footer className="w-full bg-[var(--foreground)] text-[var(--background)] py-10 px-6 mt-12">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
                {/* Brand */}
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-extrabold uppercase">Mira Shop</h2>
                    <p className="text-sm">Curated finds, fun vibes, fabulously you.</p>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-1">
                    <span className="font-semibold">Explore</span>
                    <a href="/market" className="hover:underline text-sm">Market</a>
                    <a href="/about" className="hover:underline text-sm">About Us</a>
                    <a href="/contact" className="hover:underline text-sm">Contact</a>
                </div>
            </div>

            <div className="text-center text-xs mt-8 opacity-70">
                &copy; {new Date().getFullYear()} Mira Shop — All rights reserved.
            </div>
        </footer>
    );
}
