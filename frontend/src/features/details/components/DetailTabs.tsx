import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Map, Puzzle, CreditCard, Globe } from "lucide-react"

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
      <div className="lg:col-span-2">
        <div className="flex overflow-x-auto no-scrollbar border border-slate-200 rounded-sm mb-12 scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[120px] md:min-w-0 py-4 text-[10px] font-bold tracking-widest transition-all shrink-0 ${
                activeTab === tab.id
                  ? "bg-white text-forest-green border-b-4 border-forest-green"
                  : "bg-slate-50 text-slate-400 border-b-4 border-transparent hover:bg-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
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
                          { id: "day-1", label: "1" },
                          { id: "day-2", label: "2" },
                          { id: "day-3", label: "3" },
                          { id: "day-4-5", label: "4 et 5" },
                          { id: "day-6-7", label: "6 et 7" },
                          { id: "day-8-9", label: "8 et 9" },
                          { id: "day-10-11", label: "10 et 11" },
                          { id: "day-12-13", label: "12 et 13" },
                          { id: "day-14", label: "14" },
                        ].map((day) => (
                          <div key={day.id} className="border-b border-slate-900/10 pb-1">
                            <span 
                              onClick={() => document.getElementById(day.id)?.scrollIntoView({ behavior: "smooth", block: "center" })}
                              className="text-[10px] font-bold text-slate-900 cursor-pointer hover:text-forest-green transition-colors uppercase tracking-widest underline decoration-slate-900 decoration-1 underline-offset-4"
                            >
                              JOUR {day.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Content */}
                    <div className="md:col-span-3 space-y-12">
                      {/* Jour 1 */}
                      <div id="day-1" className="space-y-6 scroll-mt-32">
                        <span className="text-forest-green font-bold text-lg">Jour 1</span>
                        <h4 className="text-forest-green font-bold text-lg">Antananarivo</h4>
                        <p className="text-slate-600 leading-relaxed text-sm">
                          Votre voyage commence à Antananarivo ! Accueil à l'aéroport d'Ivato et transfert à votre hôtel. 
                          Découverte de la Ville des Mille, ses palais royaux et ses marchés colorés.
                        </p>
                        <p className="text-slate-400 italic text-sm">
                          Nuit à Antananarivo. Petit déjeuner inclus.
                        </p>
                        <div className="h-px bg-slate-100 w-full pt-6" />
                      </div>

                      {/* Jour 2 */}
                      <div id="day-2" className="space-y-6 pt-6 scroll-mt-32">
                        <span className="text-forest-green font-bold text-lg">Jour 2</span>
                        <h4 className="text-forest-green font-bold text-lg">Antananarivo - Antsirabe</h4>
                        <p className="text-slate-600 leading-relaxed text-sm">
                          Route vers le Sud à travers les paysages des Hautes Terres. Arrêt à Ambatolampy pour voir la fonderie d'aluminium. 
                          Arrivée à Antsirabe, balade en pousse-pousse et visite des ateliers de pierres précieuses.
                        </p>
                        <p className="text-slate-400 italic text-sm">
                          Nuit à Antsirabe. Petit déjeuner inclus.
                        </p>
                        <div className="h-px bg-slate-100 w-full pt-6" />
                      </div>

                      {/* Jour 3 */}
                      <div id="day-3" className="space-y-6 pt-6 scroll-mt-32">
                        <span className="text-forest-green font-bold text-lg">Jour 3</span>
                        <h4 className="text-forest-green font-bold text-lg">Antsirabe - Ambositra - Ranomafana</h4>
                        <p className="text-slate-600 leading-relaxed text-sm">
                          Continuation vers Ambositra, capitale de l'artisanat malgache spécialisée dans la sculpture sur bois Zafimaniry. 
                          Puis route vers Ranomafana et sa forêt tropicale humide.
                        </p>
                        <p className="text-slate-400 italic text-sm">
                          Nuit à Ranomafana. Petit déjeuner inclus.
                        </p>
                        <div className="h-px bg-slate-100 w-full pt-6" />
                      </div>

                      {/* Jours 4 et 5 */}
                      <div id="day-4-5" className="space-y-6 pt-6 scroll-mt-32">
                        <span className="text-forest-green font-bold text-lg">Jours 4 et 5</span>
                        <h4 className="text-forest-green font-bold text-lg">Parc National de Ranomafana</h4>
                        <p className="text-slate-600 leading-relaxed text-sm">
                          Deux jours dédiés à l'exploration du parc national. Observation des lémuriens (dont l'Hapalémur doré), 
                          découverte d'une flore endémique exceptionnelle et détente dans les sources thermales du village.
                        </p>
                        <p className="text-slate-400 italic text-sm">
                          Nuits à Ranomafana. Petits déjeuners inclus.
                        </p>
                        <div className="h-px bg-slate-100 w-full pt-6" />
                      </div>

                      {/* Jours 6 et 7 */}
                      <div id="day-6-7" className="space-y-6 pt-6 scroll-mt-32">
                        <span className="text-forest-green font-bold text-lg">Jours 6 et 7</span>
                        <h4 className="text-forest-green font-bold text-lg">Ranomafana - Ambalavao - Isalo</h4>
                        <p className="text-slate-600 leading-relaxed text-sm">
                          Route vers le Sud profond. Visite de la fabrique de papier Antemoro à Ambalavao. 
                          Traversée du plateau de l'Horombe pour atteindre les massifs ruiniformes de l'Isalo.
                        </p>
                        <p className="text-slate-400 italic text-sm">
                          Nuits à l'Isalo. Petits déjeuners inclus.
                        </p>
                        <div className="h-px bg-slate-100 w-full pt-6" />
                      </div>

                      {/* Jours 8 et 9 */}
                      <div id="day-8-9" className="space-y-6 pt-6 scroll-mt-32">
                        <span className="text-forest-green font-bold text-lg">Jours 8 et 9</span>
                        <h4 className="text-forest-green font-bold text-lg">Parc National de l'Isalo</h4>
                        <p className="text-slate-600 leading-relaxed text-sm">
                          Immersion totale dans le Grand Canyon malgache. Randonnée vers la piscine naturelle, 
                          le canyon des singes et découverte des tombeaux Bara nichés dans les falaises.
                        </p>
                        <p className="text-slate-400 italic text-sm">
                          Nuits à l'Isalo. Petits déjeuners inclus.
                        </p>
                        <div className="h-px bg-slate-100 w-full pt-6" />
                      </div>

                      {/* Jours 10 et 11 */}
                      <div id="day-10-11" className="space-y-6 pt-6 scroll-mt-32">
                        <span className="text-forest-green font-bold text-lg">Jours 10 et 11</span>
                        <h4 className="text-forest-green font-bold text-lg">Isalo - Tuléar - Ifaty</h4>
                        <p className="text-slate-600 leading-relaxed text-sm">
                          Dernière étape vers le Sud. Traversée du pays Mahafaly avec ses tombeaux colorés. 
                          Arrivée à Tuléar et transfert vers le lagon d'Ifaty pour deux jours de détente balnéaire.
                        </p>
                        <p className="text-slate-400 italic text-sm">
                          Nuits à Ifaty. Petits déjeuners inclus.
                        </p>
                        <div className="h-px bg-slate-100 w-full pt-6" />
                      </div>

                      {/* Jours 12 et 13 */}
                      <div id="day-12-13" className="space-y-6 pt-6 scroll-mt-32">
                        <span className="text-forest-green font-bold text-lg">Jours 12 et 13</span>
                        <h4 className="text-forest-green font-bold text-lg">Ifaty - Tuléar - Antananarivo</h4>
                        <p className="text-slate-600 leading-relaxed text-sm">
                          Transfert à l'aéroport de Tuléar et vol intérieur vers Antananarivo. 
                          Dernières visites culturelles et shopping au marché artisanal de la Digue.
                        </p>
                        <p className="text-slate-400 italic text-sm">
                          Nuits à Antananarivo. Petits déjeuners inclus.
                        </p>
                        <div className="h-px bg-slate-100 w-full pt-6" />
                      </div>

                      {/* Jour 14 */}
                      <div id="day-14" className="space-y-6 pt-6 scroll-mt-32">
                        <span className="text-forest-green font-bold text-lg">Jour 14</span>
                        <h4 className="text-forest-green font-bold text-lg">Départ d'Ivato</h4>
                        <p className="text-slate-600 leading-relaxed text-sm">
                          Transfert à l'aéroport international pour votre vol de retour. 
                          Fin de votre immersion au cœur de l'âme malgache avec Explor'île.
                        </p>
                        <p className="text-slate-400 italic text-sm">
                          Repas libres.
                        </p>
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

      {/* Sidebar: Points Forts */}
      <div className="lg:col-span-1 pt-32">
        <div className="bg-slate-50/50 p-10 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-2xl font-serif text-forest-green text-center mb-8 italic">Les points forts</h3>
          <div className="w-full h-px bg-slate-200 mb-8 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-forest-green/20 rounded-full" />
          </div>

          <ul className="space-y-8">
            <li className="flex gap-4 items-start group">
              <div className="mt-1 w-5 h-5 rounded-full border-2 border-forest-green flex items-center justify-center shrink-0">
                <div className="w-2 h-2 rounded-full bg-forest-green opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                La découverte et la visite des sites historiques majeurs des Hautes Terres.
              </p>
            </li>
            <li className="flex gap-4 items-start group">
              <div className="mt-1 w-5 h-5 rounded-full border-2 border-forest-green flex items-center justify-center shrink-0">
                <div className="w-2 h-2 rounded-full bg-forest-green opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                Rencontres authentiques avec les artisans locaux et les agriculteurs.
              </p>
            </li>
            <li className="flex gap-4 items-start group">
              <div className="mt-1 w-5 h-5 rounded-full border-2 border-forest-green flex items-center justify-center shrink-0">
                <div className="w-2 h-2 rounded-full bg-forest-green opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                Un contenu riche alliant recherches scientifiques et récits passionnants.
              </p>
            </li>
          </ul>
        </div>

        {/* Nos Garanties Section */}
        <div className="mt-8 bg-white p-10 rounded-xl border border-slate-100 shadow-sm text-center">
          <h3 className="text-2xl font-serif text-forest-green mb-8 italic">Nos garanties</h3>
          <div className="w-full h-px bg-slate-200 mb-8 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-forest-green/20 rounded-full" />
          </div>

          <div className="grid grid-cols-2 border-t border-l border-slate-100">
            <div className="p-6 border-r border-b border-slate-100 flex flex-col items-center gap-4">
              <Map className="w-8 h-8 text-slate-700" strokeWidth={1} />
              <span className="text-[10px] font-bold text-slate-900 leading-tight uppercase tracking-widest">Expertise locale</span>
            </div>
            <div className="p-6 border-r border-b border-slate-100 flex flex-col items-center gap-4">
              <Puzzle className="w-8 h-8 text-slate-700" strokeWidth={1} />
              <span className="text-[10px] font-bold text-slate-900 leading-tight uppercase tracking-widest">Expérience sur-mesure</span>
            </div>
            <div className="p-6 border-r border-b border-slate-100 flex flex-col items-center gap-4">
              <CreditCard className="w-8 h-8 text-slate-700" strokeWidth={1} />
              <span className="text-[10px] font-bold text-slate-900 leading-tight uppercase tracking-widest">Paiement sécurisé</span>
            </div>
            <div className="p-6 border-r border-b border-slate-100 flex flex-col items-center gap-4">
              <Globe className="w-8 h-8 text-slate-700" strokeWidth={1} />
              <span className="text-[10px] font-bold text-slate-900 leading-tight uppercase tracking-widest">Engagement responsable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
