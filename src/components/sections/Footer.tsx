import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="relative w-full bg-secondary border-t border-[#1a1a1a]">

            {/* Main footer content */}
            <div className="grid px-16 py-16 gap-12"
                style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}
            >

                {/* Column 1 — Artist name + bio */}
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <h3 className="font-cinzel text-cream text-2xl font-semibold">
                            Abhinav Dhiman
                        </h3>
                        <p className="font-manrope text-accent text-xs tracking-[0.2em] uppercase">
                            Live Singer & Performer
                        </p>
                    </div>
                    <p className="font-cormorant text-muted text-base leading-relaxed max-w-xs">
                        Creating unforgettable moments through soulful live performances across India.
                    </p>
                    {/* Social icons */}
                    <div className="flex gap-4 mt-2">
                        <a
                            href="https://instagram.com/abhinavdhimanmusic"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted hover:text-accent transition-colors duration-300"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                            </svg>
                        </a>
                        <a
                            href="https://youtube.com/@abhinavdhimanmusic"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted hover:text-accent transition-colors duration-300"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
                            </svg>
                        </a>
                        <a
                            href="mailto:abhinavdhiman567@gmail.com"
                            className="text-muted hover:text-accent transition-colors duration-300"
                        >
                            <Mail size={18} strokeWidth={1.5} />
                        </a>
                    </div>
                </div>

                {/* Column 2 — Quick Links */}
                <div className="flex flex-col gap-5">
                    <h4 className="font-manrope text-cream text-xs tracking-[0.25em] uppercase">
                        Quick Links
                    </h4>
                    <div className="flex flex-col gap-3">
                        {[
                            { label: 'Home', to: '/' },
                            { label: 'About', to: '/about' },
                            { label: 'Gallery', to: '/gallery' },
                            { label: 'Performances', to: '/performances' },
                            { label: 'Booking', to: '/booking' },
                            { label: 'Contact', to: '/contact' },
                        ].map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="font-manrope text-muted text-sm hover:text-cream transition-colors duration-300"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Column 3 — Services */}
                <div className="flex flex-col gap-5">
                    <h4 className="font-manrope text-cream text-xs tracking-[0.25em] uppercase">
                        Services
                    </h4>
                    <div className="flex flex-col gap-3">
                        {[
                            'Resorts',
                            'Hotels',
                            'Cafes',
                            'Corporate Events',
                            'Weddings',
                            'Private Events',
                        ].map((service) => (
                            <span
                                key={service}
                                className="font-manrope text-muted text-sm"
                            >
                                {service}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Column 4 — Contact */}
                <div className="flex flex-col gap-5">
                    <h4 className="font-manrope text-cream text-xs tracking-[0.25em] uppercase">
                        Contact
                    </h4>
                    <div className="flex flex-col gap-4">
                        <a
                            href="mailto:abhinavdhiman567@gmail.com"
                            className="flex items-center gap-3 text-muted hover:text-cream transition-colors duration-300 group"
                        >
                            <Mail size={15} strokeWidth={1.5} className="text-accent flex-shrink-0" />
                            <span className="font-manrope text-sm">abhinavdhiman567@gmail.com</span>
                        </a>
                        <div className="flex items-center gap-3 text-muted">
                            <Phone size={15} strokeWidth={1.5} className="text-accent flex-shrink-0" />
                            <span className="font-manrope text-sm">Available on request</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom bar */}
            <div className="border-t border-[#1a1a1a] px-16 py-5 flex items-center justify-between">
                <p className="font-manrope text-muted text-xs">
                    © {new Date().getFullYear()} Abhinav Dhiman. All rights reserved.
                </p>
                <p className="font-manrope text-muted text-xs">
                    Live Singer & Performer · Rishikesh, Uttarakhand
                </p>
            </div>

        </footer>
    )
}

export default Footer
