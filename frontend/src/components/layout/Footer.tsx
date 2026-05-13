import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterProps {
  hideQuestionSection?: boolean;
}

export function Footer({ hideQuestionSection = false }: FooterProps) {
  return (
    <footer className="w-full">
      {/* Green "Did we answer?" Section */}
      {!hideQuestionSection && (
        <div className="bg-forest-green py-12 md:py-16 px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-8 max-w-2xl mx-auto">
            Avons-nous répondu à toutes vos questions ?
          </h2>
          <Button
            variant="secondary"
            className="bg-white text-forest-green hover:bg-white/90 rounded-full px-8 py-6 text-base md:text-lg font-bold transition-all shadow-xl shadow-black/10"
          >
            J'ai une autre question
          </Button>
        </div>
      )}

      {/* Main Footer */}
      <div className="bg-[#1A1A20] text-white pt-16 md:pt-24 pb-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto mb-16 md:mb-24">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 md:gap-12">
            
            {/* Brand Column - Centered on mobile, left on desktop */}
            <div className="col-span-2 lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left mb-8 lg:mb-0">
              <div className="mb-6">
                <img
                  src="/images/logo.png"
                  alt="Explor’île Logo"
                  className="w-[120px] md:w-[130px] h-auto object-contain rounded-sm"
                />
              </div>
              <div className="space-y-3 text-slate-400 text-sm leading-relaxed">
                <p className="font-medium">
                  Antananarivo, Madagascar
                  <br />
                  Patrimoine & Aventure
                </p>
                <p className="text-forest-green font-bold">contact@explorile.mg</p>
              </div>
            </div>

            {/* Traveling Column */}
            <div className="flex flex-col items-start lg:items-start">
              <h3 className="font-black text-xs uppercase tracking-widest text-slate-500 mb-6">Voyages</h3>
              <ul className="space-y-3 text-slate-400 text-sm font-medium">
                <li className="hover:text-forest-green cursor-pointer transition-colors">Destinations</li>
                <li className="hover:text-forest-green cursor-pointer transition-colors">Circuits</li>
                <li className="hover:text-forest-green cursor-pointer transition-colors">Escapades</li>
                <li className="hover:text-forest-green cursor-pointer transition-colors">Événements</li>
                <li className="hover:text-forest-green cursor-pointer transition-colors">Journal</li>
              </ul>
            </div>

            {/* Interest Column */}
            <div className="flex flex-col items-start lg:items-start">
              <h3 className="font-black text-xs uppercase tracking-widest text-slate-500 mb-6">Intérêts</h3>
              <ul className="space-y-3 text-slate-400 text-sm font-medium">
                <li className="hover:text-forest-green cursor-pointer transition-colors">Aventure</li>
                <li className="hover:text-forest-green cursor-pointer transition-colors">Art & Culture</li>
                <li className="hover:text-forest-green cursor-pointer transition-colors">Plages & Îles</li>
                <li className="hover:text-forest-green cursor-pointer transition-colors">Gastronomie</li>
                <li className="hover:text-forest-green cursor-pointer transition-colors">Nature</li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="flex flex-col items-start lg:items-start">
              <h3 className="font-black text-xs uppercase tracking-widest text-slate-500 mb-6">Entreprise</h3>
              <ul className="space-y-3 text-slate-400 text-sm font-medium">
                <li className="hover:text-forest-green cursor-pointer transition-colors">À propos</li>
                <li className="hover:text-forest-green cursor-pointer transition-colors">Équipe</li>
                <li className="hover:text-forest-green cursor-pointer transition-colors">Carrières</li>
                <li className="hover:text-forest-green cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>

            {/* Social Column */}
            <div className="flex flex-col items-start lg:items-start col-span-2 lg:col-span-1 md:col-span-3 lg:block">
              <h3 className="font-black text-xs uppercase tracking-widest text-slate-500 mb-6">Social</h3>
              <div className="flex lg:flex-col flex-wrap gap-6 lg:gap-4 text-slate-400 text-sm font-medium">
                <div className="flex items-center gap-3 hover:text-forest-green cursor-pointer transition-colors">
                  <Facebook className="w-4 h-4" /> <span className="hidden lg:inline">Facebook</span>
                </div>
                <div className="flex items-center gap-3 hover:text-forest-green cursor-pointer transition-colors">
                  <Instagram className="w-4 h-4" /> <span className="hidden lg:inline">Instagram</span>
                </div>
                <div className="flex items-center gap-3 hover:text-forest-green cursor-pointer transition-colors">
                  <Twitter className="w-4 h-4" /> <span className="hidden lg:inline">Twitter</span>
                </div>
                <div className="flex items-center gap-3 hover:text-forest-green cursor-pointer transition-colors">
                  <Linkedin className="w-4 h-4" /> <span className="hidden lg:inline">LinkedIn</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Refined to single line */}
        <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 pb-4 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <p>Copyright © 2026 Explor’île. Tous droits réservés.</p>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-pointer transition-colors">Cookies</span>
              <span className="hover:text-white cursor-pointer transition-colors">Confidentialité</span>
              <span className="hover:text-white cursor-pointer transition-colors">Mentions</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
