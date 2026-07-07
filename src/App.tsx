import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Clock, MapPin, Sparkles, ArrowRight, Send } from 'lucide-react';
import ChatWidget from './components/ChatWidget';
import DestinationQuiz from './components/DestinationQuiz';

const destinations = [
  {
    id: 1,
    title: 'Paris 1889',
    subtitle: "L'Exposition Universelle",
    description: "Vivez l'age d'or de la Belle Epoque. Assistez a l'inauguration de la Tour Eiffel, flanez sur les Champs-Elysees et decouvrez l'effervescence artistique de Montmartre.",
    media: 'https://i.imgur.com/x150AOk.mp4',
    mediaType: 'video' as const,
    year: '1889',
    location: 'France',
  },
  {
    id: 2,
    title: 'Cretace',
    subtitle: "-65 Millions d'annees",
    description: "Explorez un monde ou regnent les dinosaurs. Traversez des forets prehistoriques luxuriantes et observez les majestueux Triceratops et Tyrannosaurus dans leur habitat naturel.",
    media: 'https://i.imgur.com/mzmywFv.mp4',
    mediaType: 'video' as const,
    year: '-65M',
    location: 'Pangea',
  },
  {
    id: 3,
    title: 'Florence 1504',
    subtitle: 'La Renaissance Italienne',
    description: "Plongez au coeur de la Renaissance florentine. Rencontrez Leonardo de Vinci dans son atelier et assistez a l'installation du David de Michel-Ange devant le Palazzo Vecchio.",
    media: 'https://i.imgur.com/YgaAXPy.mp4',
    mediaType: 'video' as const,
    year: '1504',
    location: 'Italie',
  },
];

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Accueil', href: '#hero' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-obsidian-950/95 backdrop-blur-md border-b border-gold-400/10 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
              <Clock className="w-6 h-6 text-gold-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg sm:text-xl font-bold tracking-wide text-white group-hover:text-gold-400 transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                TimeTravel
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.2em] text-gold-400 font-medium uppercase">
                Agency
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-sm font-medium text-gray-300 hover:text-gold-400 transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a href="#destinations" className="btn-primary text-sm">
              Reserver
            </a>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-gold-400 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-obsidian-950/98 backdrop-blur-lg border-t border-gold-400/10">
          <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-gold-400 transition-colors duration-300 py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#destinations"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-primary justify-center mt-2"
            >
              Reserver
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero({ onOpenQuiz }: { onOpenQuiz: () => void }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Layer 1: Base gradient */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Layer 2: Radial gradients for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-bordeaux-500/15 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gold-400/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-obsidian-800/50 via-transparent to-transparent" />

      {/* Layer 3: Animated floating orbs with stronger blur */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold-400/8 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-bordeaux-500/8 rounded-full blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-obsidian-700/30 rounded-full blur-[120px]" />

      {/* Layer 4: Atmospheric blur overlay for depth */}
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      {/* Layer 5: Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNkNGFmMzciIGZpbGwtb3BhY2l0eT0iLjAyIi8+PC9nPjwvc3ZnPg==')] opacity-20" />

      {/* Content container with subtle glass effect */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24">
        <div className="animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/15 border border-gold-400/30 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="text-sm font-semibold text-gold-400 tracking-wide">
              Voyages temporels de luxe depuis 2157
            </span>
          </div>
        </div>

        <h1 className="animate-fade-in" style={{ animationDelay: '0.4s', opacity: 0 }}>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-tight">
            <span className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">Explorez les </span>
            <span className="text-gradient-gold italic drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">couloirs du temps</span>
          </span>
        </h1>

        <p
          className="mt-6 sm:mt-8 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fade-in"
          style={{ animationDelay: '0.6s', opacity: 0 }}
        >
          Embarquez pour un voyage extraordinaire a travers les epoques. De la Renaissance a la prehistoire,
          vivez les moments les plus iconiques de l'histoire humaine.
        </p>

        <div
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fade-in"
          style={{ animationDelay: '0.8s', opacity: 0 }}
        >
          <a href="#destinations" className="btn-primary text-base group">
            Decouvrir les destinations
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a href="#contact" className="btn-secondary text-base">
            Nous contacter
          </a>
        </div>

        <div
          className="mt-6 flex items-center justify-center animate-fade-in"
          style={{ animationDelay: '0.9s', opacity: 0 }}
        >
          <button
            onClick={onOpenQuiz}
            className="inline-flex items-center gap-2 text-sm font-medium text-gold-400 hover:text-gold-300 underline underline-offset-4 decoration-gold-400/40 transition-colors duration-300"
          >
            <Sparkles className="w-4 h-4" />
            Trouvez votre destination ideale
          </button>
        </div>

        <div
          className="mt-16 sm:mt-20 flex flex-wrap items-center justify-center gap-8 sm:gap-16 text-center animate-fade-in"
          style={{ animationDelay: '1s', opacity: 0 }}
        >
          <div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-gold-400 drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">150+</div>
            <div className="text-sm text-gray-400 mt-1 font-medium">Destinations</div>
          </div>
          <div className="w-px h-10 bg-gold-400/20 hidden sm:block" />
          <div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-gold-400 drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">12K+</div>
            <div className="text-sm text-gray-400 mt-1 font-medium">Voyageurs satisfaits</div>
          </div>
          <div className="w-px h-10 bg-gold-400/20 hidden sm:block" />
          <div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-gold-400 drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">99.9%</div>
            <div className="text-sm text-gray-400 mt-1 font-medium">Taux de reussite</div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian-950 to-transparent" />
    </section>
  );
}

function DestinationCard({ destination }: { destination: typeof destinations[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      id={`destination-${destination.id}`}
      className={`card-luxury group cursor-pointer transition-all duration-500 ease-out ${
        isHovered ? 'scale-[1.03]' : 'scale-100'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {destination.mediaType === 'video' ? (
          <video
            src={destination.media}
            autoPlay
            loop
            muted
            playsInline
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
        ) : (
          <img
            src={destination.media}
            alt={destination.title}
            loading="lazy"
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
        )}
        <div className={`absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/50 to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-90' : 'opacity-100'
        }`} />

        <div className={`absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-obsidian-950/80 backdrop-blur-sm border border-gold-400/20 transition-all duration-300 ${
          isHovered ? 'scale-105 border-gold-400/40' : 'scale-100'
        }`}>
          <Clock className="w-3.5 h-3.5 text-gold-400" />
          <span className="text-xs font-medium text-gold-400">{destination.year}</span>
        </div>

        <div className={`absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-obsidian-950/80 backdrop-blur-sm border border-gold-400/20 transition-all duration-300 ${
          isHovered ? 'scale-105 border-bordeaux-400/40' : 'scale-100'
        }`}>
          <MapPin className="w-3.5 h-3.5 text-bordeaux-400" />
          <span className="text-xs font-medium text-gray-300">{destination.location}</span>
        </div>
      </div>

      <div className="relative p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="font-display text-xl font-bold text-white group-hover:text-gold-400 transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              {destination.title}
            </h3>
            <p className="text-sm text-gold-400 font-medium italic">{destination.subtitle}</p>
          </div>
        </div>

        <p className="text-sm text-gray-300 leading-relaxed mb-5">{destination.description}</p>

        <button className={`inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
          isHovered ? 'text-gold-300' : 'text-gold-400'
        } group/btn`}>
          <span>En savoir plus</span>
          <ArrowRight className={`w-4 h-4 transition-all duration-300 ${
            isHovered ? 'translate-x-1' : 'translate-x-0'
          }`} />
        </button>
      </div>
    </motion.div>
  );
}

function Destinations() {
  return (
    <section id="destinations" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-obsidian-950">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/15 border border-gold-400/30 mb-6">
            <MapPin className="w-4 h-4 text-gold-400" />
            <span className="text-sm font-semibold text-gold-400 tracking-wide">Destinations exclusives</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">Nos destinations </span>
            <span className="text-gradient-gold italic drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">temporelles</span>
          </h2>

          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Chaque voyage est une experience unique, cree sur mesure pour vous transporter
            a travers les epoques les plus fascinantes de l'humanite.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#contact" className="btn-secondary">
            Voir toutes les destinations
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="relative bg-obsidian-900 border-t border-gold-400/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full opacity-30" />
                <Clock className="w-6 h-6 text-gold-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  TimeTravel
                </span>
                <span className="text-xs tracking-[0.2em] text-gold-400 font-medium uppercase">
                  Agency
                </span>
              </div>
            </div>
            <p className="text-gray-300 max-w-md leading-relaxed">
              Pionniers des voyages temporels depuis 2157. Nous transformons vos reveaux d'exploration
              historique en realites inoubliables.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Send className="w-4 h-4 text-gold-400" />
                <span>contact@timetravel-agency.fiction</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold text-white mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">Navigation</h4>
            <ul className="space-y-3">
              {['Accueil', 'Destinations', 'Galerie', 'A propos'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-300 hover:text-gold-400 transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold text-white mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">Legal</h4>
            <ul className="space-y-3">
              {['Conditions generales', 'Politique de confidentialite', 'Mentions legales', 'CGV'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-gray-300 hover:text-gold-400 transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gold-400/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              &copy; 2157 TimeTravel Agency. Tous droits reserves.
            </p>
            <p className="text-xs text-gray-600 italic">
              *Les voyages temporels sont une fiction. Cette page est une demonstration.
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

function App() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <div className="min-h-screen bg-obsidian-950">
      <Header />
      <main>
        <Hero onOpenQuiz={() => setIsQuizOpen(true)} />
        <Destinations />
      </main>
      <Footer />
      <ChatWidget />
      <DestinationQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
}

export default App;
