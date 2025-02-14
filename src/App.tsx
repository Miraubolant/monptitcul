import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, Stars, MapPin, UtensilsCrossed, Sparkles, Timer, Wine, Soup, Gift, X, Rss as Kiss } from 'lucide-react';

const sweetMessages = [
  "J'aime te regarder manger",
  "Point fort trop belle",
  "Tu te fous de ma gueule ?",
  "Je t'aime infiniment ∞",
  "Sac Kelly pour les choquer",
  "Sur scène elle m'ensorcele",
  "CriCri",
  "Le regard mamama",
  "yo booba",
  "Ma princesse 👸",
  "On the beach",
  "Je prend chère 🎭"
];

const images = [
  "https://i.imgur.com/o4fydKe.jpg",
  "https://i.imgur.com/GY9O95u.jpg",
  "https://i.imgur.com/RPKfKbX.jpg",
  "https://i.imgur.com/CpED8KX.jpg",
  "https://i.imgur.com/XlJaMT2.jpg",
  "https://i.imgur.com/DYlRMpG.jpg",
  "https://i.imgur.com/6KdWdu3.jpg",
  "https://i.imgur.com/YqTy78R.jpg",
  "https://i.imgur.com/HcUsQn9.jpg",
  "https://i.imgur.com/GFUr5pm.jpg",
  "https://i.imgur.com/tTycpjA.jpg",
  "https://i.imgur.com/BDedK1m.jpg"
];

interface BouncingHeartProps {
  index: number;
}

const BouncingHeart: React.FC<BouncingHeartProps> = ({ index }) => {
  const speed = React.useMemo(() => 5 + Math.random() * 5, []);
  const size = React.useMemo(() => 20 + Math.random() * 20, []);
  const [state, setState] = useState(() => ({
    position: {
      x: Math.random() * (window.innerWidth - size),
      y: Math.random() * (window.innerHeight - size)
    },
    direction: { dx: 1, dy: 1 }
  }));

  const updatePosition = useCallback(() => {
    setState(prev => {
      const newX = prev.position.x + prev.direction.dx * speed;
      const newY = prev.position.y + prev.direction.dy * speed;

      let newDx = prev.direction.dx;
      let newDy = prev.direction.dy;

      if (newX <= 0 || newX >= window.innerWidth - size) {
        newDx = -prev.direction.dx;
      }
      if (newY <= 0 || newY >= window.innerHeight - size) {
        newDy = -prev.direction.dy;
      }

      return {
        position: {
          x: Math.max(0, Math.min(window.innerWidth - size, newX)),
          y: Math.max(0, Math.min(window.innerHeight - size, newY))
        },
        direction: {
          dx: newDx,
          dy: newDy
        }
      };
    });
  }, [speed, size]);

  useEffect(() => {
    const animationFrame = setInterval(updatePosition, 16);
    return () => clearInterval(animationFrame);
  }, [updatePosition]);

  return (
    <div
      className="bouncing-heart"
      style={{
        '--x': `${state.position.x}px`,
        '--y': `${state.position.y}px`,
        '--dx': state.direction.dx,
        '--dy': state.direction.dy,
        '--speed': speed,
      } as React.CSSProperties}
    >
      <Heart
        className="text-pink-500"
        size={size}
        style={{ opacity: 0.6 }}
        fill="currentColor"
      />
    </div>
  );
};

function App() {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [showGoodbye, setShowGoodbye] = useState(false);
  const { ref: footerRef, inView: footerInView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (footerInView) {
      setTimeout(() => setShowGoodbye(true), 1000);
    }
  }, [footerInView]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = 'about:blank';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true });
  const { ref: titleRef, inView: titleInView } = useInView({ triggerOnce: true });
  const { ref: photosRef, inView: photosInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: menuRef, inView: menuInView } = useInView({ triggerOnce: true });
  const { ref: photosTitleRef, inView: photosTitleInView } = useInView({ triggerOnce: true });
  const { ref: menuIntroRef, inView: menuIntroInView } = useInView({ triggerOnce: true });
  const { ref: excitedMessageRef, inView: excitedMessageInView } = useInView({ triggerOnce: true });

  const titleLetters = "Mon Ptit Cul".split('');

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-white overflow-hidden">
      {/* Bouncing Hearts */}
      {[...Array(8)].map((_, i) => (
        <BouncingHeart key={i} index={i} />
      ))}

      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{ 
              y: [null, '-100vh'],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Heart 
              className="text-pink-200" 
              size={10 + Math.random() * 20}
              style={{ opacity: 0.3 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <motion.header 
        ref={headerRef}
        initial={{ y: -100, opacity: 0 }}
        animate={headerInView ? { y: 0, opacity: 1 } : {}}
        transition={{ type: "spring", duration: 1 }}
        className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-lg"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="text-pink-500" size={32} />
              <span className="text-2xl font-bold text-pink-500 pastry-font">Saint-Valentin</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Heart className="text-pink-500 animate-pulse" />
              <span className="pastry-font text-gray-700">14 Février 2024</span>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 overflow-hidden">
        <motion.div
          ref={titleRef}
          className="text-center px-4 z-10"
        >
          <div className="mb-12 relative">
            {titleLetters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={titleInView ? {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }
                } : {}}
                className="text-8xl font-bold text-gray-800 pastry-font inline-block"
                style={{
                  marginRight: letter === ' ' ? '1rem' : '0.1rem',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-4xl font-bold text-center pastry-font text-gray-800 mb-12"
          >
            Une soirée magique nous attend...
          </motion.h2>
        </motion.div>
      </section>

      {/* Gift Section */}
      <motion.div
        ref={excitedMessageRef}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={excitedMessageInView ? {
          opacity: 1,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 20
          }
        } : {}}
        className="text-center py-20"
      >
        <div 
          className={`gift-box relative w-64 h-64 mx-auto cursor-pointer ${isGiftOpen ? 'open' : ''}`}
          onClick={() => {
            if (!isGiftOpen) {
              setIsGiftOpen(true);
              setTimeout(() => setShowTicket(true), 800);
            }
          }}
        >
          {/* Gift Lid */}
          <div className="gift-lid absolute top-0 left-0 w-full h-1/3 bg-pink-500 rounded-t-lg z-20">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Gift className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Gift Box */}
          <div className="absolute bottom-0 left-0 w-full h-2/3 bg-pink-400 rounded-b-lg">
            {/* Ribbon */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-full bg-pink-600"></div>
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-8 bg-pink-600"></div>
          </div>

          {/* Close Button */}
          {isGiftOpen && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-[-2rem] right-[-2rem] z-30 bg-pink-500 rounded-full p-2 text-white hover:bg-pink-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsGiftOpen(false);
                setShowTicket(false);
              }}
            >
              <X size={20} />
            </motion.button>
          )}
        </div>

        {/* Ticket Modal */}
        <AnimatePresence>
          {showTicket && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowTicket(false)}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="bg-white rounded-xl p-8 shadow-2xl transform-gpu"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <button
                    className="absolute top-[-1rem] right-[-1rem] bg-pink-500 rounded-full p-2 text-white hover:bg-pink-600 transition-colors"
                    onClick={() => setShowTicket(false)}
                  >
                    <X size={20} />
                  </button>
                  <div className="border-4 border-pink-500 border-dashed rounded-lg p-8 min-w-[300px]">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-pink-500 pastry-font mb-4">BON POUR</h3>
                      <p className="text-xl text-gray-700 mb-2">1 Séance de</p>
                      <p className="text-3xl font-bold text-pink-500 pastry-font">Jambes en l'Air</p>
                      <div className="mt-6 flex justify-center">
                        <Heart className="text-pink-500 w-8 h-8" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Photos Title */}
      <div className="container mx-auto px-4" ref={photosTitleRef}>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={photosTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center pastry-font text-gray-800 mb-12"
        >
          Mais d'abord voici quelques photos qui ont retenu mon attention...
        </motion.h2>
      </div>

      {/* Photos Section */}
      <section className="py-20 px-4" ref={photosRef}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={photosInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {images.map((src, index) => (
            <motion.div
              key={src}
              initial={{ 
                opacity: 0,
                y: 50,
                rotateY: -15,
                scale: 0.9
              }}
              animate={photosInView ? { 
                opacity: 1,
                y: 0,
                rotateY: 0,
                scale: 1
              } : {}}
              transition={{ 
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
              }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl transform-gpu group"
              onMouseEnter={() => setHoveredImage(index)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <img
                src={src}
                alt={`Moment ${index + 1}`}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <AnimatePresence>
                {hoveredImage === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-6"
                  >
                    <motion.p
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.8 }}
                      className="text-white text-xl font-bold pastry-font text-center"
                    >
                      {sweetMessages[index]}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Menu Introduction */}
      <div className="container mx-auto px-4 mb-20" ref={menuIntroRef}>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={menuIntroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center pastry-font text-gray-800 mb-4"
        >
          Voici le menu de ce soir pour notre dîné
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={menuIntroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-2xl text-center pastry-font text-pink-500"
        >
          Netflix and chill ( Je rigole )
        </motion.p>
      </div>

      {/* Menu Section */}
      <section className="py-32 px-4" ref={menuRef}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={menuInView ? {
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 20
            }
          } : {}}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-2xl overflow-hidden transform-gpu hover:scale-[1.02] transition-all duration-500">
            <div className="bg-gradient-to-r from-pink-400 to-red-500 p-12 text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 shimmer opacity-50"></div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
              >
                <UtensilsCrossed className="w-20 h-20 mx-auto mb-6" />
                <h2 className="text-5xl font-bold mb-6 pastry-font">Menu de ce Soir</h2>
                <div className="flex items-center justify-center gap-3 text-2xl">
                  <MapPin className="w-6 h-6" />
                  <p>113 rue Saint Honoré, 75001 Paris</p>
                </div>
              </motion.div>
            </div>
            
            <div className="p-12 space-y-16">
              {[
                {
                  title: "Entrées",
                  icon: Soup,
                  items: [
                    { name: "La Danse des Vagues", description: "Une symphonie iodée aux notes d'agrumes" },
                    { name: "Le Trésor d'Automne", description: "Une douce mélodie forestière" }
                  ]
                },
                {
                  title: "Plats",
                  icon: Wine,
                  items: [
                    { name: "Le Songe du Prince", description: "Une valse de saveurs nobles et délicates" },
                    { name: "Le Joyau des Océans", description: "Un poème marin aux accents précieux" }
                  ]
                }
              ].map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={menuInView ? {
                    opacity: 1,
                    x: 0,
                    transition: { delay: index * 0.3 }
                  } : {}}
                  className="menu-section"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <section.icon className="w-8 h-8 text-pink-500" />
                    <h3 className="text-3xl font-bold pastry-font text-pink-500">{section.title}</h3>
                  </div>
                  <div className="space-y-6">
                    {section.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        className="menu-item"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <h4 className="text-2xl font-semibold text-gray-800 mb-2">{item.name}</h4>
                        <p className="text-gray-600 text-lg">{item.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer ref={footerRef} className="bg-white/80 backdrop-blur-md py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-gray-600 flex items-center justify-center gap-2 pastry-font text-xl">
              Créé avec <Heart className="text-pink-500 animate-pulse" fill="currentColor" /> par{" "}
              <span className="gradient-text font-semibold">Victor Mirault</span>
            </p>
            <div className="mt-4 flex justify-center space-x-2">
              <Stars className="text-pink-500 animate-spin-slow" />
              <Stars className="text-pink-400 animate-spin-slow" style={{ animationDelay: '0.5s' }} />
              <Stars className="text-pink-300 animate-spin-slow" style={{ animationDelay: '1s' }} />
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Floating Kisses Animation */}
      <AnimatePresence>
        {showGoodbye && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`kiss-${i}`}
                initial={{
                  opacity: 0,
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 100
                }}
                animate={{
                  opacity: [0, 1, 0],
                  x: Math.random() * window.innerWidth,
                  y: -100,
                  scale: [0.5, 1.5, 0.5]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2
                }}
                className="fixed pointer-events-none z-50"
              >
                <Kiss className="text-pink-500 w-8 h-8" fill="currentColor" />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Goodbye Popup */}
      <AnimatePresence>
        {showGoodbye && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-white rounded-3xl p-12 shadow-2xl transform-gpu max-w-lg w-full mx-4"
            >
              <div className="text-center space-y-6">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Kiss className="w-20 h-20 text-pink-500 mx-auto" fill="currentColor" />
                </motion.div>
                <h2 className="text-4xl font-bold pastry-font text-pink-500">À ce soir mon ptit cul</h2>
                <p className="text-xl text-gray-600">Je t'aime fort fort fort ❤️</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-600 transition-colors"
                  onClick={() => setShowGoodbye(false)}
                >
                  Bisous 😘
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Self Destruct Timer */}
      <motion.div className="fixed bottom-4 right-4 bg-black/80 text-white px-6 py-3 rounded-full backdrop-blur-sm shadow-lg flex items-center gap-3 z-50">
        <Timer className="text-red-500 animate-pulse" />
        <span className="font-mono">Auto-destruction du site dans {formatTime(timeLeft)}</span>
      </motion.div>
    </div>
  );
}

export default App;