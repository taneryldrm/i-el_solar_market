import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';

export default function Home() {
  const [featuredCollections, setFeaturedCollections] = useState<any[]>([]);

  useEffect(() => {
    fetchFeaturedCollections();
  }, []);

  const fetchFeaturedCollections = async () => {
    const { data } = await supabase
      .from('featured_collections')
      .select('*, categories(slug)')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (data) setFeaturedCollections(data);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf4] pb-20">
      {/* HERO SECTION */}
      <section className="relative h-[600px] md:h-[700px] flex items-center overflow-hidden">
        {/* Background with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
            src="https://images.unsplash.com/photo-1548613053-220e88863f82?q=80&w=2692&auto=format&fit=crop"
            alt="Solar Panels"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container relative z-20 mx-auto px-4 md:px-16">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-3xl text-white text-center md:text-left mx-auto md:mx-0"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center md:justify-start gap-4 mb-6">
              <span className="h-[2px] w-8 md:w-12 bg-[#f0c961]" />
              <span className="text-[#f0c961] font-bold tracking-[0.3em] text-xs md:text-sm uppercase">Enerjide Gelecek</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-8xl font-black leading-tight mb-6 md:mb-8 font-sans tracking-tight">
              Solar & Marin <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f0c961] to-[#fff]">Jel Akü Sistemleri</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-200 mb-8 md:mb-10 max-w-xl mx-auto md:mx-0 font-light leading-relaxed">
              Türkiye'nin lider enerji çözümleri. Endüstriyel aydınlatma ve güç depolama sistemlerinde kurumsal çözüm ortağınız.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col md:flex-row flex-wrap gap-4 justify-center md:justify-start">
              <Link
                to="/products"
                className="group relative px-8 py-4 bg-[#f0c961] text-black font-bold uppercase tracking-wider overflow-hidden rounded-lg shadow-[0_0_20px_rgba(240,201,97,0.4)]"
              >
                <div className="absolute inset-0 w-full h-full bg-white/30 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-2">
                  Hemen İncele
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
              </Link>
              <button onClick={() => window.open('https://wa.me/905555555555')} className="px-8 py-4 border border-white/30 text-white font-bold uppercase tracking-wider rounded-lg hover:bg-white/10 backdrop-blur-sm transition-all">
                Bize Ulaşın
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Abstract Element - Hidden on Mobile */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 z-20 hidden xl:block"
        >
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-2xl max-w-sm">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-[#f0c961] rounded-lg">
                <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Yüksek Verimlilik</h3>
                <p className="text-gray-300 text-sm mt-1">Son teknoloji solar paneller ile %25'e varan enerji tasarrufu.</p>
              </div>
            </div>
            <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "85%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-full bg-[#f0c961]"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* WHY CHOOSE US - Animated Strip */}
      <div className="bg-[#1a1a1a] py-12 md:py-16 border-b-4 border-[#f0c961]">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {[
            { title: "2 Yıl Garanti", desc: "Tüm ürünlerde birebir değişim.", icon: "🛡️" },
            { title: "Hızlı Kargo", desc: "Aynı gün kargo imkanı.", icon: "🚛" },
            { title: "Orjinal Ürün", desc: "%100 Distribütör garantili.", icon: "✨" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group flex flex-col md:flex-row items-center gap-4 md:gap-6 p-6 rounded-2xl hover:bg-white/5 transition-colors cursor-default border border-transparent hover:border-white/10"
            >
              <span className="text-4xl bg-[#f0c961] w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform shadow-lg shadow-[#f0c961]/20 text-black shrink-0">{item.icon}</span>
              <div>
                <h4 className="text-white font-black text-xl tracking-wide uppercase mb-1">{item.title}</h4>
                <p className="text-gray-400 text-sm group-hover:text-white transition-colors">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FEATURED CATEGORIES - Hover Lift Cards */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="text-[#f0c961] font-bold text-sm tracking-widest uppercase mb-3 block">Kategoriler</span>
          <h2 className="text-3xl md:text-5xl font-black text-[#1a1a1a]">Öne Çıkan Koleksiyonlar</h2>
          <div className="w-24 h-1.5 bg-[#f0c961] mx-auto mt-6 md:mt-8 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {featuredCollections.map((cat, idx) => (
            <Link to={cat.categories ? `/kategori/${cat.categories.slug}` : '/products'} key={cat.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -15, scale: 1.02 }}
                className="group relative h-[450px] rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer"
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors z-10" />
                <motion.img
                  src={cat.image_url}
                  alt={cat.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.7 }}
                />
                <div className="absolute bottom-0 left-0 w-full p-8 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <h3 className="text-3xl font-black text-white mb-2">{cat.title}</h3>
                  <span className="text-[#f0c961] font-bold text-sm uppercase tracking-wider flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    {cat.subtitle || 'Ürünleri Gör'} <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-black text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">Enerji Çözümlerinde <span className="text-[#f0c961]">Lider Marka</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg">Projeleriniz için en uygun çözümleri sunuyoruz. Kurumsal teklifler ve bayilik fırsatları için bizimle iletişime geçin.</p>
          <button onClick={() => window.open('https://wa.me/905555555555')} className="inline-flex items-center gap-3 bg-[#f0c961] text-black px-10 py-5 rounded-xl font-bold text-lg hover:bg-white transition-colors">
            HEMEN TEKLİF AL
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>
      </section>
    </div>
  );
}
