import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Smartphone, Utensils, Coffee, MapPin, Instagram, Facebook, Twitter, ArrowRight, ScanLine, Phone, Clock, X, Check } from 'lucide-react';

// --- Constants & Data ---
const NAV_LINKS = ['Home', 'Menu', 'Story', 'Visit'];

const POPULAR_DISHES = [
  {
    id: 1,
    name: "Lucknowi Lamb Chops",
    price: "₹850",
    type: "non-veg",
    desc: "Tender lamb ribs marinated in hung curd and secret Awadhi spices, clay oven grilled.",
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6f54262?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "Zafrani Paneer Tikka",
    price: "₹450",
    type: "veg",
    desc: "Cottage cheese cubes marinated in saffron and cream, char-grilled to golden perfection.",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c1740d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Pistachio Baklava",
    price: "₹350",
    type: "veg",
    desc: "Flaky phyllo pastry layered with crushed pistachios from Iran, soaked in cardamom honey syrup.",
    image: "https://images.unsplash.com/photo-1519690889869-e705e59f72e1?auto=format&fit=crop&q=80&w=800"
  }
];

const AR_ITEMS = [
  {
    id: 'ar1',
    name: 'Galouti Kebab',
    type: 'non-veg',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'ar2',
    name: 'Masala Chai',
    type: 'veg',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'ar3',
    name: 'Pani Puri Platter',
    type: 'veg',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600&auto=format&fit=crop'
  }
];


const SPICES = [
  {
    id: 's1',
    name: "Kishmish & Saffron",
    region: "Kashmir Valley",
    desc: "Hand-picked crimson threads that add the royal golden hue and aroma to our Biryanis.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
    color: "from-orange-500 to-red-600"
  },
  {
    id: 's2',
    name: "Tellicherry Pepper",
    region: "Malabar Coast",
    desc: "The 'King of Spices', sourced directly from Kerala for that bold, complex heat.",
    image: "https://images.unsplash.com/photo-1563205096-72aa8b06c273?auto=format&fit=crop&q=80&w=800",
    color: "from-gray-700 to-black"
  },
  {
    id: 's3',
    name: "Guntur Chilli",
    region: "Andhra Pradesh",
    desc: "Fiery red chillies sun-dried to perfection, defining the soul of our curries.",
    image: "https://images.unsplash.com/photo-1627258079524-78dd7cc3475c?auto=format&fit=crop&q=80&w=800",
    color: "from-red-600 to-red-900"
  },
  {
    id: 's4',
    name: "Royal Cardamom",
    region: "Sikkim",
    desc: "The aromatic pods that breathe life into our Masala Chai and signature desserts.",
    image: "https://images.unsplash.com/photo-1550392097-c81eb5c5b4e7?auto=format&fit=crop&q=80&w=800",
    color: "from-green-600 to-green-800"
  }
];

// --- Helpers ---
const VegIcon = () => (
  <div className="veg-icon border-2 border-green-600 p-0.5 w-4 h-4 flex items-center justify-center bg-white">
    <div className="veg-icon-dot w-2 h-2 bg-green-600 rounded-full"></div>
  </div>
);

const NonVegIcon = () => (
  <div className="nonveg-icon border-2 border-red-600 p-0.5 w-4 h-4 flex items-center justify-center bg-white">
    <div className="nonveg-icon-dot w-2 h-2 bg-red-600 rounded-full"></div>
  </div>
);

// --- Modals ---
// ... (Modals code remains same as previous step, keeping for completeness if needed but focused on replacing images)
const Modal = ({ isOpen, onClose, title, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-cream rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative"
          onClick={e => e.stopPropagation()}
        >
          <div className="bg-primary/5 border-b border-primary/10 p-6 flex justify-between items-center">
            <h3 className="text-2xl font-serif text-primary">{title}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-primary transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const BookingForm = ({ onClose }) => {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setTimeout(onClose, 2000);
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
          <Check size={32} />
        </div>
        <h4 className="text-xl font-serif text-primary mb-2">Table Reserved!</h4>
        <p className="text-gray-600 text-sm">We've sent a confirmation to your phone.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Date & Time</label>
        <input type="datetime-local" required className="w-full bg-white border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-secondary transition-colors" />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Guests</label>
        <select className="w-full bg-white border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-secondary transition-colors">
          {[2, 3, 4, 5, 6, 8, 10].map(num => <option key={num} value={num}>{num} People</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Name</label>
        <input type="text" placeholder="Your Name" required className="w-full bg-white border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-secondary transition-colors" />
      </div>
      <button type="submit" disabled={status === 'submitting'} className="w-full bg-primary text-cream py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-secondary hover:text-primary transition-colors mt-2 flex items-center justify-center gap-2">
        {status === 'submitting' ? 'Confirming...' : 'Confirm Reservation'}
      </button>
    </form>
  );
};

const OrderForm = ({ dishName, onClose }) => {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setTimeout(onClose, 2000);
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
          <Check size={32} />
        </div>
        <h4 className="text-xl font-serif text-primary mb-2">Order Placed!</h4>
        <p className="text-gray-600 text-sm">Your {dishName ? dishName : 'food'} is being prepared.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {dishName && (
        <div className="bg-secondary/10 p-3 rounded-lg border border-secondary/20 mb-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-secondary font-serif font-bold text-lg">1</div>
          <div className="font-serif text-primary">{dishName}</div>
        </div>
      )}
      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Delivery Address</label>
        <textarea rows="2" placeholder="Enter full address" required className="w-full bg-white border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-secondary transition-colors"></textarea>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Phone Number</label>
        <input type="tel" placeholder="+91 98765 43210" required className="w-full bg-white border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-secondary transition-colors" />
      </div>
      <button type="submit" disabled={status === 'submitting'} className="w-full bg-secondary text-primary py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-primary hover:text-white transition-colors mt-2">
        {status === 'submitting' ? 'Processing...' : 'Place Order (Cash on Delivery)'}
      </button>
    </form>
  );
}

// --- Components ---

const Navbar = ({ onBookClick }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 h-20 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${scrolled ? 'bg-primary shadow-xl py-2' : 'bg-gradient-to-b from-black/60 to-transparent py-4'}`}
    >
      <div className="flex items-center gap-3 cursor-pointer">
        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-primary">
          <ChefHat className="w-6 h-6" />
        </div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-cream tracking-wider drop-shadow-md">NUR <span className="text-secondary text-lg font-sans font-light tracking-widest block -mt-1">CAFE</span></h1>
      </div>

      <div className="hidden md:flex gap-8 bg-black/20 backdrop-blur-sm px-8 py-2 rounded-full border border-white/10">
        {NAV_LINKS.map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} className="text-cream hover:text-secondary font-sans text-sm font-bold tracking-widest uppercase transition-colors">
            {link}
          </a>
        ))}
      </div>

      <button onClick={onBookClick} className="bg-secondary text-primary font-bold px-6 py-3 rounded-full hover:bg-white transition-all transform hover:scale-105 shadow-lg border border-yellow-600 uppercase text-xs tracking-widest flex items-center gap-2">
        <Phone size={14} /> Book Table
      </button>
    </motion.nav>
  );
};

const Hero = ({ onBookClick, onOrderClick }) => (
  <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
    {/* Background Image with Overlay */}
    <div className="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1920&auto=format&fit=crop"
        alt="Indian Fine Dining"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-90"></div>
    </div>

    {/* Content */}
    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="border-t border-b border-secondary/50 py-10 px-6 backdrop-blur-sm bg-black/10"
      >
        <span className="text-secondary uppercase tracking-[0.4em] text-xs md:text-sm font-bold block mb-4">The Royal Taste of India</span>
        <h1 className="text-6xl md:text-8xl font-serif text-cream mb-6 leading-tight">
          Flavors of <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Heritage</span>
        </h1>
        <p className="text-gray-200 text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto leading-relaxed">
          Where culinary art meets traditional Indian hospitality. Experience the warmth of our vibrant spices in a modern setting.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <motion.a
            href="#menu"
            whileHover={{ scale: 1.05 }}
            className="bg-secondary text-primary px-10 py-4 uppercase tracking-widest text-sm font-bold rounded-sm shadow-[0_0_20px_rgba(212,175,55,0.4)] inline-block"
          >
            View Menu
          </motion.a>
          <motion.button
            onClick={() => onOrderClick(null)}
            whileHover={{ scale: 1.05 }}
            className="border border-cream text-cream px-10 py-4 uppercase tracking-widest text-sm font-bold rounded-sm hover:bg-cream hover:text-primary transition-colors"
          >
            Order Online
          </motion.button>
        </div>
      </motion.div>
    </div>

    {/* Scroll Indicator */}
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
    >
      <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-secondary to-transparent mx-auto"></div>
      <span className="text-[10px] uppercase tracking-widest mt-2 block">Scroll</span>
    </motion.div>
  </section>
);

const About = () => (
  <section id="story" className="py-24 bg-cream relative pattern-bg">
    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
      <div className="relative">
        <div className="absolute -top-4 -left-4 w-full h-full border-2 border-secondary rounded-lg"></div>
        <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800&auto=format&fit=crop" alt="Restaurant Interior" className="relative rounded-lg shadow-2xl sepia-[.2]" />
        <div className="absolute -bottom-10 -right-10 bg-white p-6 shadow-xl rounded-lg max-w-xs border-l-4 border-secondary hidden md:block">
          <p className="font-serif italic text-xl text-primary">"Food is the music of the body, and music is the food of the soul."</p>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-[1px] w-12 bg-secondary"></div>
          <span className="text-secondary uppercase tracking-widest text-sm font-bold">Our Philosophy</span>
        </div>
        <h2 className="text-4xl md:text-5xl text-primary font-serif mb-6">Atithi Devo Bhava</h2>
        <p className="text-lg text-charcoal/80 leading-relaxed font-light mb-6">
          "The Guest is God." This ancient Indian mantra guides every plate we serve. Nur Cafe blends the rustic charm of street food with the elegance of royal kitchens.
        </p>
        <p className="text-lg text-charcoal/80 leading-relaxed font-light mb-8">
          From the saffron fields of Kashmir to the spice markets of Kerala, our menu is a love letter to the subcontinent's diverse palate.
        </p>
        <a href="#menu" className="text-primary font-bold border-b-2 border-secondary pb-1 hover:text-secondary transition-colors inline-flex items-center gap-2">Read Our Full Story <ArrowRight size={16} /></a>
      </div>
    </div>
  </section>
);

const ARSection = () => {
  const [activeItem, setActiveItem] = useState(AR_ITEMS[0]);

  return (
    <section className="py-24 bg-primary text-cream relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">

        {/* Left: Content */}
        <div>
          <div className="inline-block px-3 py-1 bg-secondary/20 text-secondary rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-secondary/30">
            Augmented Reality Menu
          </div>
          <h2 className="text-4xl md:text-6xl mb-6 font-serif">See It Before <br /> You Eat It.</h2>
          <p className="text-gray-300 mb-10 font-light w-full max-w-md text-lg">
            Unsure about a dish? Point your phone to visualize our signature kebabs and curries in lifelike 3D right on your table.
          </p>

          <div className="space-y-4">
            {AR_ITEMS.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => setActiveItem(item)}
                className={`group p-4 border-l-4 cursor-pointer transition-all duration-300 flex items-center justify-between ${activeItem.id === item.id ? 'border-secondary bg-white/5' : 'border-white/10 hover:bg-white/5 hover:border-white/30'}`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    {item.type === 'veg' ? <VegIcon /> : <NonVegIcon />}
                    <h3 className="text-xl font-serif group-hover:text-secondary transition-colors">{item.name}</h3>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider pl-6">Hover to preview</p>
                </div>
                <ArrowRight className={`text-secondary transform transition-transform ${activeItem.id === item.id ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Phone Simulation */}
        <div className="relative flex justify-center perspective-[2000px]">
          {/* Phone Frame */}
          <motion.div
            initial={{ rotateY: -10, rotateX: 5 }}
            animate={{ rotateY: 0, rotateX: 0 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="relative w-[320px] h-[640px] bg-black rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden z-10 ring-1 ring-gray-700"
          >
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-2xl z-20"></div>

            {/* Screen Content */}
            <div className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center relative">
              {/* Background 'Camera' Feed simulation */}
              <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=600&auto=format&fit=crop')] bg-cover filter blur-sm"></div>

              {/* 3D Item Animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -50 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-30 w-56 h-56"
                >
                  <img src={activeItem.image} alt="AR" className="w-full h-full object-contain drop-shadow-2xl rounded-full" />
                </motion.div>
              </AnimatePresence>

              {/* Scanning Overlay */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute top-1/4 left-10 right-10 h-64 border-2 border-white/30 rounded-lg">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-secondary"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-secondary"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-secondary"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-secondary"></div>

                  {/* Scan Line */}
                  <motion.div
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-[2px] bg-secondary/80 shadow-[0_0_10px_#d4af37]"
                  />
                </div>
              </div>

              {/* AR HUD */}
              <div className="absolute bottom-8 left-4 right-4 p-4 bg-white/90 backdrop-blur-md rounded-xl shadow-lg z-30">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-primary text-lg font-bold font-serif">{activeItem.name}</h4>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] uppercase bg-primary text-white px-2 py-0.5 rounded">3D Preview</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Decorative Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/10 blur-[100px] -z-10 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};



const SpiceArchive = () => (
  <section className="py-24 bg-charcoal text-cream relative overflow-hidden">
    {/* Decorative BG */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="text-center mb-16">
        <span className="text-secondary uppercase tracking-[0.2em] font-bold text-xs mb-2 block">The Source</span>
        <h3 className="text-4xl md:text-5xl font-serif mb-6 text-white">Our Spice Archive</h3>
        <p className="text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
          We don't just cook; we curate. Every grain has a journey, travelling from the misty hills and sun-drenched coasts of India to your plate.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {SPICES.map((spice, index) => (
          <motion.div
            key={spice.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group relative h-[400px] rounded-xl overflow-hidden cursor-pointer"
          >
            {/* Image */}
            <img
              src={spice.image}
              alt={spice.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            />

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${spice.color} opacity-60 group-hover:opacity-80 transition-opacity duration-300 mix-blend-multiply`}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-secondary text-xs font-bold uppercase tracking-widest mb-1 block opacity-0 group-hover:opacity-100 transition-opacity delay-100">{spice.region}</span>
              <h4 className="text-2xl font-serif text-white mb-2">{spice.name}</h4>
              <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                  {spice.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const PopularDishes = ({ onOrderClick }) => (
  <section id="menu" className="py-24 bg-cream px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-secondary uppercase tracking-[0.2em] font-bold text-xs mb-2 block">Our Masterpieces</span>
        <h3 className="text-primary text-5xl font-serif mb-6">Popular Dishes</h3>
        <div className="flex justify-center items-center gap-4">
          <div className="h-[1px] w-20 bg-primary/20"></div>
          <Utensils className="text-secondary w-6 h-6" />
          <div className="h-[1px] w-20 bg-primary/20"></div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {POPULAR_DISHES.map((dish) => (
          <motion.div
            key={dish.id}
            whileHover={{ y: -10 }}
            className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            <div className="h-64 overflow-hidden relative">
              <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-0 right-0 bg-secondary text-primary font-bold px-4 py-2 rounded-bl-xl shadow-lg z-10">
                {dish.price}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>

            <div className="p-8 relative">
              <div className="absolute -top-6 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100 group-hover:bg-secondary group-hover:text-white transition-colors">
                {/* Usually for wishlist or simple deco */}
                <ChefHat size={20} />
              </div>

              <div className="flex items-center gap-2 mb-2">
                {dish.type === 'veg' ? <VegIcon /> : <NonVegIcon />}
                <span className="text-xs text-gray-400 uppercase tracking-wider">{dish.type === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}</span>
              </div>

              <h4 className="text-2xl text-primary mb-3 font-serif group-hover:text-secondary transition-colors">{dish.name}</h4>
              <p className="text-charcoal/60 mb-6 text-sm leading-relaxed">{dish.desc}</p>

              <button onClick={() => onOrderClick(dish.name)} className="w-full py-3 border border-primary/20 rounded text-primary uppercase text-xs font-bold tracking-widest hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                Order Now <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-16">
        <button className="bg-primary text-cream px-10 py-4 rounded-full uppercase tracking-widest text-sm font-bold hover:bg-secondary hover:text-primary transition-colors cursor-pointer shadow-xl">
          View Full Digital Menu (PDF)
        </button>
      </div>
    </div>
  </section>
);

const VisitSection = () => (
  <section id="visit" className="py-24 bg-white relative">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
      {/* Map / Image */}
      <div className="h-[400px] bg-gray-200 rounded-xl overflow-hidden shadow-xl border border-gray-100 relative group">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000"
          alt="Location"
          className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-6 py-3 rounded-lg shadow-lg">
          <p className="text-primary font-bold flex items-center gap-2 cursor-pointer hover:text-secondary transition-colors"><MapPin size={16} className="text-secondary" /> Open in Maps</p>
        </div>
      </div>

      {/* Info */}
      <div>
        <span className="text-secondary uppercase tracking-[0.2em] font-bold text-xs mb-2 block">Find Us</span>
        <h3 className="text-primary text-5xl font-serif mb-8">Come & Dine With Us</h3>

        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center text-primary flex-shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <h4 className="text-xl font-serif text-primary mb-2">Location</h4>
              <p className="text-gray-600 leading-relaxed">
                123 Culinary Ave, Food District<br />
                FD 4001, New Delhi
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center text-primary flex-shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <h4 className="text-xl font-serif text-primary mb-2">Opening Hours</h4>
              <div className="space-y-1 text-gray-600">
                <p className="flex justify-between w-48"><span>Mon - Fri:</span> <span>10 AM - 11 PM</span></p>
                <p className="flex justify-between w-48"><span>Sat - Sun:</span> <span>9 AM - 12 AM</span></p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center text-primary flex-shrink-0">
              <Phone size={24} />
            </div>
            <div>
              <h4 className="text-xl font-serif text-primary mb-2">Contact</h4>
              <p className="text-gray-600 mb-1">+91 98765 43210</p>
              <p className="text-gray-600">hello@nurcafe.in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const MOODS = [
  { icon: "✨", label: "Celebratory", color: "bg-yellow-100 text-yellow-800", recommendation: { name: "Royal Kebab Platter", desc: "A feast fit for a king. Assorted kebabs to share and celebrate.", price: "₹1200" } },
  { icon: "🌧️", label: "Comfort", color: "bg-blue-100 text-blue-800", recommendation: { name: "Dal Makhani & Naan", desc: "Slow-cooked black lentils with butter garlic naan. A warm hug on a plate.", price: "₹450" } },
  { icon: "🔥", label: "Spicy", color: "bg-red-100 text-red-800", recommendation: { name: "Laal Maas", desc: "Fiery Rajasthani lamb curry cooked with Mathania chillies.", price: "₹650" } },
  { icon: "🌿", label: "Light", color: "bg-green-100 text-green-800", recommendation: { name: "Quinoa Chaat", desc: "A modern, healthy twist on street food. Refreshing and guilt-free.", price: "₹350" } },
];

const MoodMenu = ({ onOrderClick }) => {
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <section className="py-20 bg-cream border-t border-primary/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="text-secondary uppercase tracking-[0.2em] font-bold text-xs mb-3 block">Personalized Dining</span>
        <h3 className="text-3xl md:text-4xl font-serif text-primary mb-8">How are you feeling today?</h3>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {MOODS.map((mood) => (
            <motion.button
              key={mood.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(mood)}
              className={`px-6 py-3 rounded-full border-2 ${selectedMood?.label === mood.label ? 'border-primary bg-primary text-white' : 'border-dashed border-primary/30 text-primary hover:border-primary'} transition-all duration-300 flex items-center gap-2 font-bold text-sm uppercase tracking-wide`}
            >
              <span>{mood.icon}</span> {mood.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedMood && (
            <motion.div
              key={selectedMood.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-secondary/20 max-w-lg mx-auto relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary"></div>

              <h4 className="text-gray-400 text-xs uppercase tracking-widest mb-2">We Recommend</h4>
              <h2 className="text-3xl font-serif text-primary mb-3">{selectedMood.recommendation.name}</h2>
              <p className="text-gray-600 mb-6 italic">"{selectedMood.recommendation.desc}"</p>

              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                <span className="text-2xl font-bold text-secondary">{selectedMood.recommendation.price}</span>
                <button onClick={() => onOrderClick(selectedMood.recommendation.name)} className="bg-primary text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-secondary hover:text-primary transition-colors">
                  Order This
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-primary text-cream py-16 border-t border-secondary/20 relative">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 text-center md:text-left">
      <div className="md:col-span-1">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-primary">
            <ChefHat className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-serif font-bold tracking-wide">Nur Cafe</h2>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          A symphony of flavors, where tradition serves innovation. <br /> Since 2024.
        </p>
        <div className="flex justify-center md:justify-start gap-4">
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors cursor-pointer"><Instagram size={16} /></div>
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors cursor-pointer"><Facebook size={16} /></div>
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors cursor-pointer"><Twitter size={16} /></div>
        </div>
      </div>

      {/* ... Rest of Footer remains same ... */}
      <div>
        <h4 className="text-secondary font-bold uppercase tracking-widest mb-6">Explore</h4>
        <ul className="space-y-3 text-gray-400 text-sm">
          <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Our Menu</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Private Dining</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-secondary font-bold uppercase tracking-widest mb-6">Contact</h4>
        <div className="space-y-4 text-gray-400 text-sm">
          <p className="flex items-start justify-center md:justify-start gap-3">
            <MapPin size={16} className="mt-1 flex-shrink-0 text-secondary" />
            <span>123 Culinary Ave, <br />Food District, FD 4001</span>
          </p>
          <p className="flex items-center justify-center md:justify-start gap-3">
            <Phone size={16} className="flex-shrink-0 text-secondary" /> +91 98765 43210
          </p>
          <p className="flex items-center justify-center md:justify-start gap-3">
            <ScanLine size={16} className="flex-shrink-0 text-secondary" /> hello@nurcafe.in
          </p>
        </div>
      </div>

      <div>
        <h4 className="text-secondary font-bold uppercase tracking-widest mb-6">Opening Hours</h4>
        <div className="space-y-3 text-gray-400 text-sm">
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span>Mon - Fri</span>
            <span className="text-white">10 AM - 11 PM</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span>Sat - Sun</span>
            <span className="text-white">9 AM - 12 AM</span>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
      <p>© 2026 Nur Cafe. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-white">Privacy Policy</a>
        <a href="#" className="hover:text-white">Terms of Service</a>
      </div>
    </div>
  </footer>
);

// Main App Component remains same (just wiring everything together)
function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  const handleOrderClick = (dishName) => {
    setSelectedDish(dishName || 'Custom Order');
    setOrderOpen(true);
  };

  return (
    <div className="min-h-screen bg-cream selection:bg-secondary selection:text-primary">
      <Navbar onBookClick={() => setBookingOpen(true)} />
      <Hero onBookClick={() => setBookingOpen(true)} onOrderClick={() => handleOrderClick(null)} />
      <About />
      <SpiceArchive />
      <MoodMenu onOrderClick={handleOrderClick} />
      <ARSection />
      <PopularDishes onOrderClick={handleOrderClick} />
      <VisitSection />
      <Footer />

      {/* WhatsApp Fixed Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] p-4 rounded-full shadow-2xl cursor-pointer text-white flex items-center justify-center"
      >
        <Phone size={24} fill="white" />
      </motion.div>

      {/* Modals */}
      <Modal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} title="Book a Table">
        <BookingForm onClose={() => setBookingOpen(false)} />
      </Modal>

      <Modal isOpen={orderOpen} onClose={() => setOrderOpen(false)} title="Order Online">
        <OrderForm dishName={selectedDish} onClose={() => setOrderOpen(false)} />
      </Modal>
    </div>
  );
}

export default App;
