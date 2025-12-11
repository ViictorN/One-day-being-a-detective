import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  FileSearch, 
  Fingerprint, 
  Skull, 
  Clock, 
  CheckCircle2, 
  Lock, 
  AlertTriangle,
  HelpCircle,
  Menu,
  X,
  Microscope,
  FileText,
  Users,
  Star,
  Download,
  PlayCircle
} from 'lucide-react';

import { Section, Reveal } from './components/Section';
import { CtaButton, Badge, Marquee, ScarcityTimer } from './components/UI';

// --- Constants ---
const CHECKOUT_LINK = "https://pay.kirvano.com/e6df8c45-1ec3-467a-8b7d-8647a21d04bf";

const reviews = [
  { quote: "Fiquei 2 horas analisando a toxicologia até perceber o detalhe. Brilhante.", author: "Ricardo M.", role: "Advogado Criminalista" },
  { quote: "A melhor experiência de 'True Crime' que já tive na internet. A imersão é absurda.", author: "Sofia L.", role: "Estudante de Medicina" },
  { quote: "Difícil na medida certa. Não te trata como idiota. Recomendo.", author: "André P.", role: "Investidor" }
];

const faqs = [
  { 
    q: "Preciso baixar algum arquivo pesado?", 
    a: "Não. O Caso Thorne roda 100% no seu navegador. Você recebe acesso imediato a um portal seguro contendo todas as evidências digitais, áudios e relatórios." 
  },
  { 
    q: "É muito difícil? Nunca joguei nada do tipo.", 
    a: "Sim, é desafiador. Não é um jogo de 'clicar e achar objetos'. Você precisará ler laudos toxicológicos reais (simplificados para o jogo) e cruzar depoimentos. Incluímos um sistema de dicas progressivas caso fique travado." 
  },
  { 
    q: "Posso jogar em grupo?", 
    a: "Com certeza. Muitos detetives espelham a tela na TV e resolvem o caso com amigos ou parceiros. É uma experiência cooperativa fantástica." 
  },
  {
    q: "E se eu não gostar?",
    a: "Garantia incondicional de 7 dias. Se você achar que o caso não valeu o preço de um café e um pão de queijo, devolvemos 100% do seu dinheiro."
  }
];

// --- Sub-components ---

const DossierVisual = () => (
    <motion.div 
        className="relative w-72 h-96 md:w-96 md:h-[500px] bg-[#d3b683] rounded-sm shadow-2xl transform rotate-3 border-l-4 border-[#bca070]"
        initial={{ y: 20, rotate: 3 }}
        animate={{ y: 0, rotate: 6 }}
        transition={{ repeat: Infinity, repeatType: 'reverse', duration: 4, ease: "easeInOut" }}
    >
        {/* Paper Texture Effect */}
        <div className="absolute inset-0 bg-noise opacity-30"></div>
        
        {/* Dossier Tab */}
        <div className="absolute -top-6 left-0 w-1/3 h-8 bg-[#d3b683] rounded-t-sm border-l-4 border-[#bca070]"></div>
        
        {/* Label */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white px-6 py-4 shadow-sm transform -rotate-2 w-3/4 text-center">
            <div className="border-2 border-noir-900 p-2">
                <div className="font-mono font-bold text-2xl text-noir-900 tracking-tighter">CONFIDENTIAL</div>
                <div className="font-serif text-sm text-noir-900 uppercase mt-1">Case #8291-B</div>
            </div>
            <div className="absolute -right-4 -bottom-4 bg-blood-600 text-white font-bold px-2 py-1 rotate-12 text-xs shadow-md">
                CLASSIFIED
            </div>
        </div>

        {/* Polaroid */}
        <div className="absolute bottom-20 right-8 w-32 h-40 bg-white p-2 shadow-lg transform rotate-6">
            <div className="w-full h-24 bg-noir-800 grayscale overflow-hidden">
                <img src="https://picsum.photos/id/65/200/200" className="opacity-80 object-cover w-full h-full" alt="Victim" />
            </div>
            <div className="mt-2 font-handwriting text-noir-900 text-xs text-center font-mono">Vítima: A. Thorne</div>
        </div>

        {/* Coffee Stain */}
        <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full border-4 border-[#8B4513] opacity-20 blur-[1px]"></div>
    </motion.div>
);

interface BentoCardProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const BentoCard: React.FC<BentoCardProps> = ({ title, icon: Icon, children, className = "", delay = 0 }) => (
    <Reveal delay={delay} width="100%">
        <div className={`bg-noir-900 border border-white/10 hover:border-blood-600/30 transition-colors duration-500 p-6 h-full flex flex-col relative overflow-hidden group ${className}`}>
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon size={48} />
            </div>
            <h3 className="font-serif text-xl text-white mb-2 relative z-10 flex items-center gap-2">
                <Icon size={18} className="text-blood-500" /> {title}
            </h3>
            <div className="relative z-10 text-neutral-400 font-mono text-sm leading-relaxed">
                {children}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-transparent to-transparent opacity-50"></div>
        </div>
    </Reveal>
);

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-noir-950 text-neutral-300 font-sans selection:bg-blood-600 selection:text-white pb-24">
      <div className="grain-overlay" />

      {/* --- NAV --- */}
      <nav className="fixed top-0 w-full z-40 border-b border-white/5 bg-noir-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-serif font-bold text-xl tracking-widest text-white">
            CASO <span className="text-blood-600">THORNE</span>
          </div>
          <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest text-neutral-400">
            <a href="#investigation" className="hover:text-white transition-colors">O Caso</a>
            <a href="#evidence" className="hover:text-white transition-colors">Evidências</a>
            <a href="#reviews" className="hover:text-white transition-colors">Depoimentos</a>
          </div>
          <div className="flex items-center gap-4">
             <a href={CHECKOUT_LINK} className="hidden md:block text-xs font-mono text-blood-500 border border-blood-600/30 px-3 py-1 hover:bg-blood-600/10 transition-colors">
                ÁREA DO DETETIVE
             </a>
             <button className="md:hidden text-white" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                {showMobileMenu ? <X /> : <Menu />}
             </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {showMobileMenu && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-noir-900 pt-20 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 font-serif text-2xl">
              <a href="#investigation" onClick={() => setShowMobileMenu(false)}>O Caso</a>
              <a href="#evidence" onClick={() => setShowMobileMenu(false)}>Evidências</a>
              <a href="#offer" onClick={() => setShowMobileMenu(false)} className="text-blood-600">Assumir Caso</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO --- */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2573&auto=format&fit=crop&grayscale')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
             <div className="absolute inset-0 bg-gradient-to-r from-noir-950 via-noir-950/90 to-transparent"></div>
             <div className="absolute inset-0 bg-gradient-to-b from-noir-950 via-transparent to-noir-950"></div>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-start text-left">
                <Reveal>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-blood-600 animate-pulse"></span>
                        <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-neutral-300">Nova Evidência Liberada</span>
                    </div>
                </Reveal>
                
                <Reveal delay={0.1}>
                    <h1 className="font-sans font-black text-5xl md:text-7xl lg:text-8xl text-white leading-[0.9] tracking-tighter mb-6">
                        <span className="relative inline-block">
                            SUICÍDIO?
                            <span className="absolute left-0 top-1/2 w-full h-2 md:h-4 bg-blood-600 -rotate-3 -translate-y-1/2 opacity-80"></span>
                        </span>
                        <br/>
                        <span className="text-neutral-500">HOMICÍDIO.</span>
                    </h1>
                </Reveal>

                <Reveal delay={0.2}>
                    <p className="font-mono text-neutral-400 text-sm md:text-lg max-w-lg mb-8 border-l-2 border-blood-600 pl-6">
                        "O relatório da polícia diz overdose acidental. <br/>
                        A análise química diz assassinato." <br/>
                        <strong className="text-white mt-2 block">Você consegue ver o erro que 90% dos detetives deixaram passar?</strong>
                    </p>
                </Reveal>

                <Reveal delay={0.3}>
                    <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
                        <CtaButton text="ASSUMIR O CASO - R$ 27" href={CHECKOUT_LINK} pulse={true} className="w-full sm:w-auto text-lg" />
                        <span className="text-xs font-mono text-neutral-500 flex items-center gap-1">
                            <Lock size={12} /> Acesso Imediato
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-3">
                            {[1,2,3,4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border border-noir-900 bg-neutral-800 overflow-hidden">
                                    <img src={`https://picsum.photos/seed/${i+100}/100/100`} alt="User" />
                                </div>
                            ))}
                        </div>
                        <div className="text-xs font-mono text-neutral-400">
                            <strong className="text-white">1.258+</strong> detetives investigando agora.
                        </div>
                    </div>
                </Reveal>
            </div>

            <div className="hidden lg:flex justify-center relative">
                <DossierVisual />
            </div>
        </div>
      </section>

      {/* --- MARQUEE --- */}
      <Marquee items={["Toxicologia Forense", "Interrogatórios Reais", "Análise de DNA", "Cena do Crime 3D", "Dossiê Completo", "Sem Instalação"]} />

      {/* --- BENTO GRID FEATURES --- */}
      <Section id="investigation">
        <div className="text-center mb-16">
            <Badge type="warning">NÍVEL DE DIFICULDADE: EXPERT</Badge>
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-4">Isso não é um jogo. <br/> <span className="text-blood-600">É uma Simulação.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 h-auto md:h-[600px]">
            {/* Main Feature - Large */}
            <div className="md:col-span-2 md:row-span-2 bg-noir-900 border border-white/10 relative group overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2680&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:scale-105 transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full z-10">
                    <Microscope className="text-blood-500 mb-4" size={32} />
                    <h3 className="font-serif text-3xl text-white mb-2">Toxicologia Real</h3>
                    <p className="font-mono text-neutral-400 text-sm max-w-md">
                        Analise níveis de Digoxina, Potássio e Creatinina. Você terá acesso aos laudos originais do laboratório. Não há setas brilhantes indicando onde clicar. Você precisa interpretar os dados químicos.
                    </p>
                </div>
            </div>

            {/* Feature 2 */}
            <BentoCard title="Áudio Binaural" icon={PlayCircle} delay={0.1}>
                Ouça interrogatórios policiais e ligações de emergência (911). Detecte mentiras através de hesitações na voz e inconsistências nos relatos.
            </BentoCard>

            {/* Feature 3 */}
            <BentoCard title="Dossiê Digital" icon={FileSearch} delay={0.2}>
                Acesse o banco de dados da polícia de qualquer dispositivo. Celular, Tablet ou PC. Sem downloads, sem loading.
            </BentoCard>
        </div>
      </Section>

      {/* --- OFFER STACK (CONVERSION CORE) --- */}
      <Section id="offer" className="py-20">
        <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-b from-noir-900 to-black border border-white/10 rounded-sm overflow-hidden relative shadow-2xl">
                {/* Background FX */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blood-600/20 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="grid md:grid-cols-12 gap-0">
                    {/* Left: The Stack */}
                    <div className="md:col-span-7 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10">
                        <div className="flex items-center gap-2 mb-6">
                            <Badge type="info">ACESSO TOTAL</Badge>
                            <span className="text-xs text-neutral-500 font-mono">ENTREGA AUTOMÁTICA VIA EMAIL</span>
                        </div>
                        <h2 className="font-serif text-3xl text-white mb-8">O Que Está Incluso:</h2>
                        
                        <ul className="space-y-4 font-mono text-sm text-neutral-300">
                            {[
                                { name: "Jogo Caso Thorne (Acesso Vitalício)", price: "R$ 67,00" },
                                { name: "28 Documentos e Evidências", price: "R$ 29,00" },
                                { name: "Áudios e Interrogatórios Reais", price: "R$ 19,00" },
                                { name: "Acesso ao Grupo de Detetives", price: "Inestimável" },
                            ].map((item, i) => (
                                <li key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="text-blood-500 shrink-0" size={16} />
                                        <span>{item.name}</span>
                                    </div>
                                    <span className="text-neutral-500 line-through text-xs">{item.price}</span>
                                </li>
                            ))}
                            <li className="flex justify-between items-center pt-2 text-evidence-400">
                                <div className="flex items-center gap-3">
                                    <Star className="shrink-0 fill-current" size={16} />
                                    <span>BÔNUS: Guia de Medicina Legal (PDF)</span>
                                </div>
                                <span className="text-xs font-bold">GRÁTIS</span>
                            </li>
                        </ul>
                        
                        <div className="mt-8 flex justify-between items-center text-sm font-mono text-neutral-500">
                            <span>Valor Total Real:</span>
                            <span className="line-through">R$ 115,00+</span>
                        </div>
                    </div>

                    {/* Right: The Offer */}
                    <div className="md:col-span-5 p-8 md:p-12 flex flex-col justify-center items-center text-center bg-white/[0.02]">
                        <ScarcityTimer />
                        
                        <div className="my-8">
                            <div className="text-sm font-mono text-neutral-400 mb-2 uppercase tracking-widest">Preço Promocional</div>
                            <div className="text-6xl font-serif font-bold text-white tracking-tighter">
                                <span className="text-2xl align-top text-neutral-500 mr-1">R$</span>
                                27
                            </div>
                            <div className="text-xs text-green-500 mt-2 font-mono">PAGAMENTO ÚNICO • SEM MENSALIDADE</div>
                        </div>

                        <CtaButton text="COMPRAR AGORA" href={CHECKOUT_LINK} className="w-full mb-4" pulse={true} />
                        
                        <div className="flex flex-col gap-2 text-[10px] text-neutral-500 font-mono">
                            <span className="flex items-center justify-center gap-1"><Lock size={10} /> Compra 100% Segura e Criptografada</span>
                            <span className="flex items-center justify-center gap-1"><CheckCircle2 size={10} /> Garantia de 7 Dias</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </Section>

      {/* --- REVIEWS --- */}
      <Section className="py-12 border-t border-white/5">
        <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
                <div key={i} className="bg-noir-900 p-6 border border-white/5 relative">
                    <div className="flex gap-1 mb-4 text-blood-600">
                        {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                    </div>
                    <p className="font-serif text-neutral-300 italic mb-4">"{review.quote}"</p>
                    <div className="font-mono text-xs text-neutral-500">
                        <strong className="text-white block">{review.author}</strong>
                        {review.role}
                    </div>
                </div>
            ))}
        </div>
      </Section>

      {/* --- FAQ --- */}
      <Section className="max-w-3xl mx-auto py-12">
        <h2 className="font-serif text-2xl text-center text-white mb-8">Dúvidas Frequentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-white/10 bg-noir-800/30">
              <button
                className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span className="font-serif text-base text-neutral-200">{faq.q}</span>
                <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="text-blood-500 text-xl font-bold">+</div>
                </motion.div>
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 font-mono text-xs md:text-sm text-neutral-400 leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/10 py-12 bg-noir-950 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
            <div className="font-serif font-bold text-2xl tracking-widest text-white mb-8 opacity-50">
                CASO <span className="text-blood-600">THORNE</span>
            </div>
            <div className="text-neutral-600 font-mono text-[10px] space-y-2">
                <p>&copy; {new Date().getFullYear()} Caso Thorne Investigations. Todos os direitos reservados.</p>
                <div className="flex gap-4 justify-center">
                    <a href="#" className="hover:text-white transition-colors">Termos</a>
                    <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                    <a href="#" className="hover:text-white transition-colors">Contato</a>
                </div>
                <p className="pt-4 opacity-30">Este site não possui afiliação com o Facebook ou Google.</p>
            </div>
        </div>
      </footer>

      {/* --- STICKY CTA --- */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 w-full bg-noir-900 border-t border-blood-600/30 p-4 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]"
          >
            <div className="max-w-5xl mx-auto flex items-center justify-between px-2 md:px-4">
              <div className="hidden md:flex flex-col">
                <div className="font-serif text-white font-bold text-lg">Dossiê Thorne</div>
                <div className="text-[10px] font-mono text-blood-500 uppercase tracking-widest">Oferta Limitada</div>
              </div>
              <div className="flex items-center gap-4 flex-1 md:flex-none justify-between md:justify-end w-full">
                <div className="md:hidden text-white font-serif font-bold">R$ 27,00</div>
                <div className="flex items-center gap-6">
                    <span className="hidden md:block font-mono text-xl text-white font-bold">R$ 27,00</span>
                    <a 
                      href={CHECKOUT_LINK}
                      className="bg-blood-600 text-white px-6 py-3 font-serif font-bold hover:bg-blood-500 transition-all uppercase tracking-widest text-xs md:text-sm shadow-lg hover:shadow-blood-600/50"
                    >
                      Comprar Agora
                    </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;