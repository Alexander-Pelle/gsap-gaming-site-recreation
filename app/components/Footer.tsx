import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

const socialLinks = [
    { href: "https://discord.com", icon: <FaDiscord />, label: "Discord" },
    { href: "https://twitter.com", icon: <FaTwitter />, label: "Twitter" },
    { href: "https://youtube.com", icon: <FaYoutube />, label: "YouTube" },
  ];

const Footer = () => {
  return(
    <footer className="w-screen bg-violet-300 py-12 text-white">
        <div className="container mx-auto px-10">
            
            <div className="mb-8 flex w-full items-center justify-between border-b border-white/20 pb-8">
                <div>
                    <h2 className="font-zentry text-5xl font-black uppercase italic">
                        Z<b>e</b>ntry
                    </h2>
                    <p className="mt-2 font-general text-sm opacity-70">
                        Enter the Metagame
                    </p>
                </div>
                
                
                <div className="flex gap-6">
                    {socialLinks.map((link) => (
                        <a 
                            href={link.href} 
                            key={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-black hover:text-violet-300"
                            aria-label={link.label}
                        >
                            <span className="text-xl transition-transform group-hover:scale-110">
                                {link.icon}
                            </span>
                        </a>
                    ))}
                </div>
            </div>

            
            <div className="mb-8 grid grid-cols-2 gap-8 md:grid-cols-4">
                <div>
                    <h3 className="mb-3 font-robert-medium text-sm font-bold uppercase tracking-wider">
                        Products
                    </h3>
                    <ul className="space-y-2 font-circular-web text-sm">
                        <li><a href="#radiant" className="transition-colors hover:text-yellow-300">Radiant</a></li>
                        <li><a href="#zigma" className="transition-colors hover:text-yellow-300">Zigma</a></li>
                        <li><a href="#nexus" className="transition-colors hover:text-yellow-300">Nexus</a></li>
                        <li><a href="#azul" className="transition-colors hover:text-yellow-300">Azul</a></li>
                    </ul>
                </div>
                
                <div>
                    <h3 className="mb-3 font-robert-medium text-sm font-bold uppercase tracking-wider">
                        Company
                    </h3>
                    <ul className="space-y-2 font-circular-web text-sm">
                        <li><a href="#about" className="transition-colors hover:text-yellow-300">About</a></li>
                        <li><a href="#careers" className="transition-colors hover:text-yellow-300">Careers</a></li>
                        <li><a href="#contact" className="transition-colors hover:text-yellow-300">Contact</a></li>
                    </ul>
                </div>
                
                <div>
                    <h3 className="mb-3 font-robert-medium text-sm font-bold uppercase tracking-wider">
                        Resources
                    </h3>
                    <ul className="space-y-2 font-circular-web text-sm">
                        <li><a href="#docs" className="transition-colors hover:text-yellow-300">Documentation</a></li>
                        <li><a href="#support" className="transition-colors hover:text-yellow-300">Support</a></li>
                        <li><a href="#blog" className="transition-colors hover:text-yellow-300">Blog</a></li>
                    </ul>
                </div>
                
                <div>
                    <h3 className="mb-3 font-robert-medium text-sm font-bold uppercase tracking-wider">
                        Legal
                    </h3>
                    <ul className="space-y-2 font-circular-web text-sm">
                        <li><a href="#privacy" className="transition-colors hover:text-yellow-300">Privacy Policy</a></li>
                        <li><a href="#terms" className="transition-colors hover:text-yellow-300">Terms of Service</a></li>
                        <li><a href="#cookies" className="transition-colors hover:text-yellow-300">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>

           
            <div className="flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-8 md:flex-row">
                <p className="font-general text-sm opacity-60">
                    ©Zentry 2026. All rights reserved
                </p>
                
                <p className="font-general text-xs opacity-40">
                    Crafted with passion for the Metagame
                </p>
            </div>
        </div>
  </footer>
)};

export default Footer;
