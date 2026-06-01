import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Map, Puzzle, CreditCard, Globe, Instagram, Linkedin, Mail } from "lucide-react"

const TABS = [
  { id: "itineraire", label: "ITINÉRAIRE" },
  { id: "details", label: "EN DÉTAIL" },
  { id: "hebergement", label: "HÉBERGEMENT" },
  { id: "budget", label: "BUDGET" },
  { id: "conseils", label: "NOS CONSEILS" },
]

export function DetailTabs() {
  const [activeTab, setActiveTab] = useState("itineraire")

  return (
    <div className="flex gap-6 lg:gap-10 mt-12 items-start relative">
      {/* Left Social Floating Column */}
      <div className="hidden md:flex flex-col gap-4 sticky top-28 shrink-0 z-10">
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shadow-lg hover:scale-110 hover:rotate-6 transition-all duration-300 border border-white/10"
          title="Instagram"
        >
          <Instagram className="w-5 h-5" />
        </a>
        <a 
          href="https://tiktok.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:scale-110 hover:-rotate-6 transition-all duration-300 border border-white/10 relative overflow-hidden"
          title="TikTok"
        >
          <span className="font-extrabold text-sm tracking-tighter">🎵</span>
        </a>
        <a 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full bg-[#0A66C2] text-white flex items-center justify-center shadow-lg hover:scale-110 hover:rotate-6 transition-all duration-300 border border-white/10"
          title="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a 
          href="mailto:contact@explorile.mg" 
          className="w-11 h-11 rounded-full bg-[#D93025] text-white flex items-center justify-center shadow-lg hover:scale-110 hover:-rotate-6 transition-all duration-300 border border-white/10"
          title="Email"
        >
          <Mail className="w-5 h-5" />
        </a>
      </div>

      {/* Main Grid Content */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2">
        <div className="flex overflow-x-auto no-scrollbar gap-3 md:gap-4 mb-12 pb-3 scrollbar-hide">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 min-w-[140px] md:min-w-0 py-4 px-6 text-xs font-black tracking-widest transition-all duration-300 rounded-2xl shrink-0 uppercase shadow-sm border border-transparent ${
                  isActive
                    ? "bg-[#0F1C0F] text-white shadow-md shadow-slate-950/15 scale-[1.02] border-[#0F1C0F]/10"
                    : "bg-[#F1F5F9] text-slate-600 hover:bg-[#E2E8F0] hover:text-slate-900"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTabOutline"
                    className="absolute inset-0 rounded-2xl ring-2 ring-[#0F1C0F]/10"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "itineraire" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                   <h3 className="text-2xl font-serif text-forest-green mb-6 italic">Madagascar, entre terres sacrées et nature sauvage...</h3>
                   
                   <div className="space-y-6 text-slate-600 leading-relaxed">
                     <p>
                       L'authenticité malgache est au cœur de ce voyage. Les paysages époustouflants des Hautes Terres, 
                       avec leurs rizières en terrasses et leurs collines rouges, vous transportent immédiatement dans un autre monde ! 
                       Pour cet autotour à Madagascar, nous avons privilégié les rencontres humaines et la découverte du patrimoine immatériel.
                     </p>
                     <p>
                       Nombre de villages d'artisans et de sites sacrés jalonnent votre route. À vous les grands espaces de l'Ankaratra ! 
                       Comme vous vous en doutez, la palette de couleurs de l'île Rouge est tout simplement incroyable : du jaune ocre 
                       au rouge intense de la latérite, la nature revêt ici une dimension spirituelle. Vivre ces quelques jours est 
                       une toute autre expérience. Avis aux amoureux de nature et de culture ! 
                     </p>
                     <p>
                       En plus de découvrir la biodiversité unique de l'île, vous découvrirez au cours de votre autotour des villes chargées d'histoire, 
                       des parcs nationaux et des sites classés parmi les plus incontournables de la région centrale.
                     </p>
                   </div>

                   <div className="pt-6 space-y-4">
                     <p className="font-bold text-slate-900">
                       Région traversée au cours de ce voyage à Madagascar : <span className="text-forest-green underline decoration-2 underline-offset-4">Les Hautes Terres & Le Vakinankaratra</span>
                     </p>
                     <p className="text-sm italic text-slate-500">
                       N.B. : Ce voyage à Madagascar est un voyage individuel et sur mesure à personnaliser avec nos conseillers spécialistes de la destination.
                     </p>
                   </div>

                   <div className="pt-12">
                     <h3 className="text-2xl font-serif text-forest-green mb-8 italic">L'itinéraire</h3>
                     <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-slate-50 h-[450px]">
                       <iframe 
                         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15093.57864344583!2d47.5255866!3d-18.8791902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f07df74c0e668b%3A0x64f89d31d4d039f!2sAntananarivo%2C%20Madagascar!5e0!3m2!1sfr!2s!4v1714902000000!5m2!1sfr!2s" 
                         width="100%" 
                         height="100%" 
                         style={{ border: 0 }} 
                         allowFullScreen={true} 
                         loading="lazy" 
                         referrerPolicy="no-referrer-when-downgrade"
                         title="Carte de Madagascar"
                       />
                     </div>
                   </div>
                 </div>
              )}

              {activeTab === "details" && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <h3 className="text-xl font-bold text-forest-green mb-10 pb-4 border-b border-slate-100">
                    Votre voyage à Madagascar en détail :
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Left Navigation (Sticky) */}
                    <div className="md:col-span-1">
                      <div className="sticky top-24 space-y-4">
                        {[
                          { id: "day-1", label: "JOUR 1" },
                          { id: "day-2", label: "JOUR 2" },
                          { id: "day-3-5", label: "JOURS 3 à 5" },
                          { id: "day-6-9", label: "JOURS 6 à 9" },
                          { id: "day-10-13", label: "JOURS 10 à 13" },
                          { id: "day-14", label: "JOUR 14" },
                        ].map((day) => (
                          <div key={day.id} className="border-b border-slate-900/10 pb-1">
                            <span 
                              onClick={() => document.getElementById(day.id)?.scrollIntoView({ behavior: "smooth", block: "center" })}
                              className="text-[10px] font-black text-slate-900 cursor-pointer hover:text-forest-green transition-colors uppercase tracking-widest underline decoration-slate-900 decoration-1 underline-offset-4"
                            >
                              {day.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Content: Visual Timeline */}
                    <div className="md:col-span-3 relative pl-6 border-l-2 border-slate-200 space-y-16">
                      
                      {/* Timeline Dot 1 - Tana */}
                      <div id="day-1" className="relative scroll-mt-32 space-y-4">
                        <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#0F1C0F] border-4 border-white shadow-md"></span>
                        
                        {/* Header Transport Row */}
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-[#FFF1F2] border border-red-100 rounded-xl p-3 sm:px-4 text-xs font-bold gap-2">
                          <span className="text-slate-800 flex items-center gap-1.5">
                            ✈️ Ivato Airport ➔ Antananarivo
                          </span>
                          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                            <span className="text-slate-500">(5 avis) 💬</span>
                            <button className="bg-[#D93025] hover:bg-[#C22018] text-white px-3 py-1.5 rounded-lg transition-colors text-[10px] uppercase font-black tracking-wider">
                              Détails transfert
                            </button>
                          </div>
                        </div>

                        {/* Card Content Row */}
                        <div className="flex flex-col md:flex-row gap-6 mt-4 items-start">
                          <img 
                            src="/images/destination2.jpg" 
                            alt="Antananarivo" 
                            className="w-full md:w-60 rounded-2xl aspect-[4/3] object-cover shadow-sm shrink-0 border border-slate-100"
                          />
                          <div className="flex-grow space-y-4">
                            <h4 className="text-forest-green font-extrabold text-lg flex items-center gap-1.5">
                              Antananarivo <span className="text-xs text-slate-400 font-semibold">• Accueil & Transfert</span>
                            </h4>
                            <p className="text-slate-600 leading-relaxed text-sm">
                              Votre voyage commence à Antananarivo ! Accueil à l'aéroport d'Ivato et transfert privé à votre hôtel. 
                              Découverte libre de la « Ville des Mille », bâtie en amphithéâtre, avec ses marchés colorés et ses ruelles chargées d'histoire.
                            </p>
                            <div className="text-xs text-slate-800">
                              <p className="font-bold mb-2">À voir et à faire à Antananarivo :</p>
                              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                                <li>Balade sur la Haute Ville et vue panoramique depuis le Rova.</li>
                                <li>Dégustation de plats locaux malgaches au marché.</li>
                              </ul>
                            </div>
                            <div className="flex justify-end pt-2">
                              <button className="bg-[#0B2527] hover:bg-[#0B2527]/90 text-white rounded-full font-bold px-4 py-2 text-[10px] uppercase tracking-wider flex items-center gap-1">
                                Que faire à Antananarivo ?
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Timeline Dot 2 - Antsirabe */}
                      <div id="day-2" className="relative scroll-mt-32 space-y-4">
                        <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#0F1C0F] border-4 border-white shadow-md"></span>
                        
                        {/* Header Transport Row */}
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-[#F8FAFC] border border-slate-100 rounded-xl p-3 sm:px-4 text-xs font-bold gap-2">
                          <span className="text-slate-800 flex items-center gap-1.5">
                            🚗 RN7 : Antananarivo ➔ Antsirabe - ~3h30
                          </span>
                          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                            <span className="text-slate-500">(12 avis) 💬</span>
                            <button className="bg-[#D93025] hover:bg-[#C22018] text-white px-3 py-1.5 rounded-lg transition-colors text-[10px] uppercase font-black tracking-wider">
                              Voir les prix
                            </button>
                          </div>
                        </div>

                        {/* Card Content Row */}
                        <div className="flex flex-col md:flex-row gap-6 mt-4 items-start">
                          <img 
                            src="/images/destination3.jpg" 
                            alt="Antsirabe" 
                            className="w-full md:w-60 rounded-2xl aspect-[4/3] object-cover shadow-sm shrink-0 border border-slate-100"
                          />
                          <div className="flex-grow space-y-4">
                            <h4 className="text-forest-green font-extrabold text-lg flex items-center gap-1.5">
                              Antsirabe <span className="text-xs text-slate-400 font-semibold">• La Ville Thermale</span>
                            </h4>
                            <p className="text-slate-600 leading-relaxed text-sm">
                              Descente vers le Sud à travers les magnifiques paysages des Hautes Terres. Halte culturelle à Ambatolampy. 
                              Arrivée à Antsirabe, balade animée en pousse-pousse traditionnel et visite des célèbres ateliers d'artisans.
                            </p>
                            <div className="text-xs text-slate-800">
                              <p className="font-bold mb-2">À voir et à faire à Antsirabe :</p>
                              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                                <li>Visite des ateliers de cornes de zébu et de miniatures.</li>
                                <li>Excursion spectaculaire vers le lac de cratère Tritriva.</li>
                              </ul>
                            </div>
                            <div className="flex justify-end pt-2">
                              <button className="bg-[#0B2527] hover:bg-[#0B2527]/90 text-white rounded-full font-bold px-4 py-2 text-[10px] uppercase tracking-wider flex items-center gap-1">
                                Que faire à Antsirabe ?
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Timeline Dot 3 - Ranomafana */}
                      <div id="day-3-5" className="relative scroll-mt-32 space-y-4">
                        <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#0F1C0F] border-4 border-white shadow-md"></span>
                        
                        {/* Header Transport Row */}
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-[#F8FAFC] border border-slate-100 rounded-xl p-3 sm:px-4 text-xs font-bold gap-2">
                          <span className="text-slate-800 flex items-center gap-1.5">
                            🚗 Antsirabe ➔ Ambositra ➔ Ranomafana - ~5h00
                          </span>
                          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                            <span className="text-slate-500">(8 avis) 💬</span>
                            <button className="bg-[#D93025] hover:bg-[#C22018] text-white px-3 py-1.5 rounded-lg transition-colors text-[10px] uppercase font-black tracking-wider">
                              Voir les prix
                            </button>
                          </div>
                        </div>

                        {/* Info Alert Tip */}
                        <div className="flex gap-3 bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs text-slate-600 items-start">
                          <span className="text-forest-green font-extrabold shrink-0 text-base leading-none">ⓘ</span>
                          <p>Ambatolampy est célèbre pour sa fonderie d'aluminium artisanale. N'hésitez pas à vous y arrêter pour admirer la fabrication de marmites traditionnelles !</p>
                        </div>

                        {/* Card Content Row */}
                        <div className="flex flex-col md:flex-row gap-6 mt-4 items-start">
                          <img 
                            src="/images/destination4.jpg" 
                            alt="Ranomafana" 
                            className="w-full md:w-60 rounded-2xl aspect-[4/3] object-cover shadow-sm shrink-0 border border-slate-100"
                          />
                          <div className="flex-grow space-y-4">
                            <h4 className="text-forest-green font-extrabold text-lg flex items-center gap-1.5">
                              Ranomafana <span className="text-xs text-slate-400 font-semibold">• Forêt Tropicale Humide</span>
                            </h4>
                            <p className="text-slate-600 leading-relaxed text-sm">
                              Halte à Ambositra pour découvrir la marqueterie traditionnelle Zafimaniry. Continuation vers Ranomafana. 
                              Explorez cette forêt tropicale à la recherche des fameux lémuriens dorés et détendez-vous dans ses sources thermales.
                            </p>
                            <div className="text-xs text-slate-800">
                              <p className="font-bold mb-2">À voir et à faire à Ranomafana :</p>
                              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                                <li>Randonnée guidée à la recherche des lémuriens endémiques.</li>
                                <li>Détente dans les piscines thermales chaudes du village.</li>
                              </ul>
                            </div>
                            <div className="flex justify-end pt-2">
                              <button className="bg-[#0B2527] hover:bg-[#0B2527]/90 text-white rounded-full font-bold px-4 py-2 text-[10px] uppercase tracking-wider flex items-center gap-1">
                                Que faire à Ranomafana ?
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Timeline Dot 4 - Isalo */}
                      <div id="day-6-9" className="relative scroll-mt-32 space-y-4">
                        <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#0F1C0F] border-4 border-white shadow-md"></span>
                        
                        {/* Header Transport Row */}
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-[#F8FAFC] border border-slate-100 rounded-xl p-3 sm:px-4 text-xs font-bold gap-2">
                          <span className="text-slate-800 flex items-center gap-1.5">
                            🚗 Ranomafana ➔ Ambalavao ➔ Isalo - ~6h30
                          </span>
                          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                            <span className="text-slate-500">(15 avis) 💬</span>
                            <button className="bg-[#D93025] hover:bg-[#C22018] text-white px-3 py-1.5 rounded-lg transition-colors text-[10px] uppercase font-black tracking-wider">
                              Voir les prix
                            </button>
                          </div>
                        </div>

                        {/* Card Content Row */}
                        <div className="flex flex-col md:flex-row gap-6 mt-4 items-start">
                          <img 
                            src="/images/destination2.jpg" 
                            alt="Isalo" 
                            className="w-full md:w-60 rounded-2xl aspect-[4/3] object-cover shadow-sm shrink-0 border border-slate-100"
                          />
                          <div className="flex-grow space-y-4">
                            <h4 className="text-forest-green font-extrabold text-lg flex items-center gap-1.5">
                              Parc National de l'Isalo <span className="text-xs text-slate-400 font-semibold">• Le Grand Canyon</span>
                            </h4>
                            <p className="text-slate-600 leading-relaxed text-sm">
                              Traversée d'Ambalavao avec sa fabrique de papier Antemoro et la réserve de lémuriens d'Anja. 
                              Route vers le plateau géologique ruiniforme de l'Isalo, ses canyons profonds et ses piscines naturelles splendides.
                            </p>
                            <div className="text-xs text-slate-800">
                              <p className="font-bold mb-2">À voir et à faire dans l'Isalo :</p>
                              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                                <li>Randonnée dans le Canyon des Singes et baignade en piscine naturelle.</li>
                                <li>Coucher de soleil féérique à travers la célèbre Fenêtre de l'Isalo.</li>
                              </ul>
                            </div>
                            <div className="flex justify-end pt-2">
                              <button className="bg-[#0B2527] hover:bg-[#0B2527]/90 text-white rounded-full font-bold px-4 py-2 text-[10px] uppercase tracking-wider flex items-center gap-1">
                                Que faire à l'Isalo ?
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Timeline Dot 5 - Ifaty */}
                      <div id="day-10-13" className="relative scroll-mt-32 space-y-4">
                        <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#0F1C0F] border-4 border-white shadow-md"></span>
                        
                        {/* Header Transport Row */}
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-[#F8FAFC] border border-slate-100 rounded-xl p-3 sm:px-4 text-xs font-bold gap-2">
                          <span className="text-slate-800 flex items-center gap-1.5">
                            🚗 Piste : Isalo ➔ Tuléar ➔ Ifaty - ~4h30
                          </span>
                          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                            <span className="text-slate-500">(10 avis) 💬</span>
                            <button className="bg-[#D93025] hover:bg-[#C22018] text-white px-3 py-1.5 rounded-lg transition-colors text-[10px] uppercase font-black tracking-wider">
                              Voir les prix
                            </button>
                          </div>
                        </div>

                        {/* Card Content Row */}
                        <div className="flex flex-col md:flex-row gap-6 mt-4 items-start">
                          <img 
                            src="/images/destination3.jpg" 
                            alt="Ifaty" 
                            className="w-full md:w-60 rounded-2xl aspect-[4/3] object-cover shadow-sm shrink-0 border border-slate-100"
                          />
                          <div className="flex-grow space-y-4">
                            <h4 className="text-forest-green font-extrabold text-lg flex items-center gap-1.5">
                              Ifaty <span className="text-xs text-slate-400 font-semibold">• Séjour Balnéaire</span>
                            </h4>
                            <p className="text-slate-600 leading-relaxed text-sm">
                              Descente côtière vers Tuléar, capitale du grand Sud. Transfert vers le charmant lagon d'Ifaty. 
                              Séjour libre dédié à la détente en bord de mer, à la plongée ou à la découverte de la faune marine.
                            </p>
                            <div className="text-xs text-slate-800">
                              <p className="font-bold mb-2">À voir et à faire à Ifaty :</p>
                              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                                <li>Sortie en pirogue à balancier traditionnelle Vezo.</li>
                                <li>Visite guidée de la réserve de Baobabs sacrés de Reniala.</li>
                              </ul>
                            </div>
                            <div className="flex justify-end pt-2">
                              <button className="bg-[#0B2527] hover:bg-[#0B2527]/90 text-white rounded-full font-bold px-4 py-2 text-[10px] uppercase tracking-wider flex items-center gap-1">
                                Que faire à Ifaty ?
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Timeline Dot 6 - Retour */}
                      <div id="day-14" className="relative scroll-mt-32 space-y-4">
                        <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#0F1C0F] border-4 border-white shadow-md"></span>
                        
                        {/* Header Transport Row */}
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-[#F8FAFC] border border-slate-100 rounded-xl p-3 sm:px-4 text-xs font-bold gap-2">
                          <span className="text-slate-800 flex items-center gap-1.5">
                            ✈️ Vol Intérieur : Tuléar ➔ Antananarivo ➔ Départ
                          </span>
                          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                            <span className="text-slate-500">(0 avis) 💬</span>
                            <button className="bg-[#D93025] hover:bg-[#C22018] text-white px-3 py-1.5 rounded-lg transition-colors text-[10px] uppercase font-black tracking-wider">
                              Infos vol
                            </button>
                          </div>
                        </div>

                        {/* Card Content Row */}
                        <div className="flex flex-col md:flex-row gap-6 mt-4 items-start">
                          <img 
                            src="/images/destination4.jpg" 
                            alt="Retour Ivato" 
                            className="w-full md:w-60 rounded-2xl aspect-[4/3] object-cover shadow-sm shrink-0 border border-slate-100"
                          />
                          <div className="flex-grow space-y-4">
                            <h4 className="text-forest-green font-extrabold text-lg flex items-center gap-1.5">
                              Antananarivo / Ivato <span className="text-xs text-slate-400 font-semibold">• Fin de l'immersion</span>
                            </h4>
                            <p className="text-slate-600 leading-relaxed text-sm">
                              Vol de retour sur Antananarivo et transfert pour votre vol international. 
                              Fin de cette magnifique immersion à Madagascar pleine d'aventures avec Explor'île.
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {activeTab === "hebergement" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-3xl">
                  <h3 className="text-2xl font-serif text-forest-green mb-6 italic">Vos hébergements pour votre voyage à Madagascar</h3>
                  
                  <p className="text-slate-600 leading-relaxed text-sm">
                    La liste des hébergements proposés pour ce voyage comprend uniquement des hébergements testés, 
                    re-testés et approuvés par notre équipe locale selon des critères de qualité optimale. 
                    Elle reste cependant totalement personnalisable selon vos envies, vos critères de confort, 
                    votre budget et selon la disponibilité des hébergements au moment de votre réservation. 
                    N'hésitez pas à en faire part à votre conseiller(e) local(e).
                  </p>

                  <div className="space-y-10 pt-4">
                    {/* Catégorie Économique */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-slate-900 text-sm">Catégorie économique :</h4>
                      <div className="space-y-2 text-sm text-slate-600">
                        <p>Antananarivo : Hotel de France (BB)</p>
                        <p>Antsirabe : Chambre d'hôte Couleur Café</p>
                        <p>Ranomafana : Hotel Centrest (BB)</p>
                        <p>Ambalavao : Hotel Aux Bougainvillées (BB)</p>
                        <p>Isalo : Isalo Ranch (BB)</p>
                        <p>Ifaty : Chez Cecile (BB)</p>
                      </div>
                    </div>

                    {/* Catégorie Confort */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-slate-900 text-sm">Catégorie confort :</h4>
                      <div className="space-y-2 text-sm text-slate-600">
                        <p>Antananarivo : Hotel Louvre & Spa (BB)</p>
                        <p>Antsirabe : Plumeria Hotel (BB)</p>
                        <p>Ranomafana : Thermal Hotel (BB)</p>
                        <p>Isalo : Isalo Rock Lodge (BB)</p>
                        <p>Tuléar : Moringa Hotel (BB)</p>
                        <p>Ifaty : Le Nautilus (BB)</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "budget" && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-serif text-forest-green italic">
                      Votre autotour à Madagascar à partir de 250 000 Ar par personne
                    </h3>
                    <div className="space-y-2 text-slate-600 text-sm leading-relaxed">
                      <p>À partir de 250 000 Ariary par personne avec hébergements en catégorie standard</p>
                      <p>Ce tarif est établi sur la base de 2 participants. Le prix indiqué est par personne.</p>
                      <p>
                        Le tarif définitif peut varier en fonction du nombre de personnes, des dates de voyage, 
                        des prestations sélectionnées, des disponibilités et de la catégorie du véhicule.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Inclus */}
                    <div className="space-y-6">
                      <h4 className="font-bold text-slate-900">Inclus dans ce circuit</h4>
                      <ul className="space-y-4">
                        {[
                          "13 nuits en chambre double standard dans les hébergements mentionnés",
                          "Les petits-déjeuners mentionnés (BB)",
                          "La location d'un véhicule 4x4 avec chauffeur-guide francophone",
                          "Une assistance 7j/7",
                          "Les taxes d'hébergement malgaches",
                          "Les frais de dossier et d'organisation local"
                        ].map((item, i) => (
                          <li key={i} className="flex gap-3 text-sm text-slate-600">
                            <span className="text-forest-green font-bold">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Non Inclus */}
                    <div className="space-y-6">
                      <h4 className="font-bold text-slate-900">Non inclus dans ce circuit</h4>
                      <ul className="space-y-4">
                        {[
                          "Les vols internationaux et domestiques",
                          "Les repas non mentionnés",
                          "L'essence pour le véhicule, les frais de parking et péages",
                          "Les droits d'entrée et les guides locaux dans les parcs nationaux",
                          "Les pourboires, boissons et d'épenses personnelles",
                          "L'assurance de voyage optionnelle"
                        ].map((item, i) => (
                          <li key={i} className="flex gap-3 text-sm text-slate-600">
                            <span className="text-red-500 font-bold">✕</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-slate-100">
                    <h4 className="text-xl font-serif text-forest-green mb-6 italic">Réservez vos vols avec notre partenaire</h4>
                    <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                      <p>
                        Notre statut d'agence de voyage locale ne nous permet malheureusement pas de réserver les 
                        vols internationaux à destination de Madagascar pour nos voyageurs.
                      </p>
                      <p>
                        Cependant, grâce à nos partenariats locaux, nous vous offrons la possibilité de réserver 
                        vos billets d'avion en quelques clics via nos moteurs de recherche partenaires.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "conseils" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-3xl">
                  <h3 className="text-2xl font-serif text-forest-green mb-6 italic">Nos conseils d'amis pour ce voyage à Madagascar</h3>
                  
                  <div className="space-y-6 text-slate-600 leading-relaxed text-sm">
                    <p>
                      – Au jour 2 de votre voyage à Madagascar, pourquoi ne pas faire une halte à Ambatolampy 
                      pour découvrir la fonderie d'aluminium artisanale ? C'est une occasion unique de voir 
                      le savoir-faire local en action.
                    </p>
                    <p>
                      – Survoler les paysages du Sud en avion : une activité extraordinaire que vous pouvez 
                      vous offrir au cours de votre voyage... difficile de faire mieux pour admirer les 
                      contrastes de l'île Rouge !
                    </p>
                    <p>
                      – Vous aimez les épices ? Ne manquez pas de visiter une plantation de vanille ou de poivre ! 
                      En plus de découvrir les secrets de culture, prenez le temps de déguster un plat 
                      typiquement malgache parfumé aux saveurs locales.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Global Quote Button for all tabs */}
          <div className="mt-16 flex justify-center pb-12">
            <button className="bg-[#0F1C0F] text-white font-bold py-5 px-12 rounded-xl hover:bg-black transition-all uppercase tracking-widest text-xs shadow-xl">
              Demander un devis
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar: Promo Images & Info Cards */}
      <div className="lg:col-span-1 space-y-8 pt-0 lg:pt-16">
        
        {/* Promotional Card 1: Destination Highlight */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] group cursor-pointer border border-slate-100">
          <img 
            src="/images/destination2.jpg" 
            alt="Madagascar" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 flex flex-col justify-end p-6">
            <h4 className="text-white font-extrabold text-2xl tracking-wide">Madagascar</h4>
            <p className="text-white/80 text-xs mt-1.5 font-medium leading-relaxed">
              ➔ En savoir plus sur cette destination unique
            </p>
          </div>
        </div>

        {/* Promotional Card 2: Activities Promotion */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] group cursor-pointer border border-slate-100">
          <img 
            src="/images/destination3.jpg" 
            alt="Activités" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2527]/90 via-slate-900/35 to-black/10 flex flex-col justify-between p-6">
            <div className="self-end bg-[#F59E0B] text-white text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase">
              Promo Activités
            </div>
            <div>
              <h4 className="text-yellow-400 font-black text-lg tracking-wide uppercase leading-tight">Tes activités</h4>
              <p className="text-white font-extrabold text-sm uppercase mt-0.5">Sur place au meilleur prix</p>
              
              <div className="mt-4 bg-[#D93025] text-white hover:bg-[#C22018] text-[10px] font-black tracking-widest px-5 py-2.5 rounded-xl uppercase inline-block transition-colors shadow-lg shadow-red-950/20">
                Je découvre !
              </div>
            </div>
          </div>
        </div>

        {/* Promotional Card 3: Route Promotion */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] group cursor-pointer border border-slate-100">
          <img 
            src="/images/destination4.jpg" 
            alt="L'Île Rouge en circuit" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-black/10 flex flex-col justify-end p-6">
            <h4 className="text-white font-black text-lg tracking-wide uppercase leading-tight">L'Italie / Madagascar</h4>
            <p className="text-white/80 text-xs font-semibold mt-1">En circuit au meilleur prix</p>
            
            <div className="mt-4 bg-[#0F1C0F] text-white border border-emerald-500/20 text-[10px] font-black tracking-widest px-5 py-2.5 rounded-xl uppercase inline-block transition-colors shadow-lg shadow-black/30">
              C'est par ici ➔
            </div>
          </div>
        </div>

        {/* Points Forts Card */}
        <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-xl font-serif text-forest-green text-center mb-6 italic font-bold">Les points forts</h3>
          <div className="w-full h-px bg-slate-200 mb-6 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1 bg-forest-green/20 rounded-full" />
          </div>

          <ul className="space-y-6">
            <li className="flex gap-3 items-start group">
              <div className="mt-1 w-4 h-4 rounded-full border-2 border-forest-green flex items-center justify-center shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-forest-green opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                La découverte et la visite des sites historiques majeurs des Hautes Terres.
              </p>
            </li>
            <li className="flex gap-3 items-start group">
              <div className="mt-1 w-4 h-4 rounded-full border-2 border-forest-green flex items-center justify-center shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-forest-green opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                Rencontres authentiques avec les artisans locaux et les agriculteurs.
              </p>
            </li>
            <li className="flex gap-3 items-start group">
              <div className="mt-1 w-4 h-4 rounded-full border-2 border-forest-green flex items-center justify-center shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-forest-green opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                Un contenu riche alliant recherches scientifiques et récits passionnants.
              </p>
            </li>
          </ul>
        </div>

        {/* Nos Garanties Card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
          <h3 className="text-xl font-serif text-forest-green mb-6 italic font-bold">Nos garanties</h3>
          <div className="w-full h-px bg-slate-200 mb-6 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1 bg-forest-green/20 rounded-full" />
          </div>

          <div className="grid grid-cols-2 border-t border-l border-slate-100">
            <div className="p-4 border-r border-b border-slate-100 flex flex-col items-center gap-3">
              <Map className="w-6 h-6 text-slate-700" strokeWidth={1} />
              <span className="text-[9px] font-bold text-slate-900 leading-tight uppercase tracking-widest">Expertise locale</span>
            </div>
            <div className="p-4 border-r border-b border-slate-100 flex flex-col items-center gap-3">
              <Puzzle className="w-6 h-6 text-slate-700" strokeWidth={1} />
              <span className="text-[9px] font-bold text-slate-900 leading-tight uppercase tracking-widest">Expérience sur-mesure</span>
            </div>
            <div className="p-4 border-r border-b border-slate-100 flex flex-col items-center gap-3">
              <CreditCard className="w-6 h-6 text-slate-700" strokeWidth={1} />
              <span className="text-[9px] font-bold text-slate-900 leading-tight uppercase tracking-widest">Paiement sécurisé</span>
            </div>
            <div className="p-4 border-r border-b border-slate-100 flex flex-col items-center gap-3">
              <Globe className="w-6 h-6 text-slate-700" strokeWidth={1} />
              <span className="text-[9px] font-bold text-slate-900 leading-tight uppercase tracking-widest">Engagement responsable</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  )
}
