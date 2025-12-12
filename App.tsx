import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Smartphone, 
  Lock, 
  CheckCircle2, 
  ShieldCheck,
  Star,
  Play,
  Menu,
  X,
  CreditCard,
  ChevronRight,
  Fingerprint,
  Siren,
  HelpCircle,
  Eye,
  Unlock,
  Users,
  Heart,
  User,
  AlertTriangle,
  BadgeCheck,
  MousePointerClick
} from 'lucide-react';

// --- VARIANTS DE ANIMAÇÃO (Framer Motion) ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// --- COMPONENTE: QUIZ DE ADMISSÃO (INTRO) ---
const IntroQuiz = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const questions = [
    {
      title: "TESTE DE PERCEPÇÃO",
      desc: "Você chega na cena do crime. O corpo está na poltrona. O que você verifica primeiro?",
      options: [
        "A temperatura do corpo (Rigor Mortis)",
        "Se há armas visíveis no local",
        "Se as janelas estão trancadas"
      ]
    },
    {
      title: "TESTE DE LÓGICA",
      desc: "O suspeito diz que estava cozinhando às 20:00. Mas houve um apagão às 19:55. O que isso indica?",
      options: [
        "Ele está mentindo sobre o horário",
        "Ele usou fogão a gás (possível verdade)",
        "Ele é o assassino com certeza"
      ]
    },
    {
      title: "TESTE DE INSTINTO",
      desc: "Você encontra um celular bloqueado com a tela quebrada no bolso da vítima. O que você faz?",
      options: [
        "Entrega para a perícia técnica",
        "Tenta desbloquear com a digital da vítima",
        "Procura o carregador para ligá-lo"
      ]
    }
  ];

  const handleAnswer = () => {
    setLoading(true);
    setTimeout(() => {
      if (step < 2) {
        setStep(step + 1);
        setLoading(false);
      } else {
        onComplete();
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-stone-950 z-50 overflow-y-auto flex items-center justify-center">
      <div className="w-full max-w-md p-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-8"
        >
          <Fingerprint className="w-16 h-16 text-red-600 mx-auto mb-4 animate-pulse" />
          <h1 className="text-2xl font-black text-white tracking-widest uppercase">Avaliação de Detetive</h1>
          <p className="text-stone-500 text-sm mt-2 font-mono">Responda para liberar o acesso ao arquivo.</p>
        </motion.div>

        <AnimatePresence mode='wait'>
          {!loading ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-stone-900 border border-stone-800 p-6 rounded-xl shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4 border-b border-stone-800 pb-2">
                <span className="text-red-500 text-xs font-bold uppercase">Questão {step + 1}/3</span>
                <span className="text-stone-600 text-xs">{questions[step].title}</span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-6 leading-relaxed">
                {questions[step].desc}
              </h3>

              <div className="space-y-3">
                {questions[step].options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02, backgroundColor: "#292524" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAnswer}
                    className="w-full text-left p-4 rounded bg-stone-800 border border-transparent hover:border-red-500 transition-colors group flex items-center justify-between"
                  >
                    <span className="text-stone-300 group-hover:text-white text-sm">{opt}</span>
                    <ChevronRight className="w-4 h-4 text-stone-600 group-hover:text-red-500" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-stone-400 font-mono text-xs uppercase animate-pulse">Analisando padrão de resposta...</p>
              <p className="text-green-500 font-bold text-sm mt-2">RESPOSTA VÁLIDA</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL (LANDING PAGE) ---
const App = () => {
  const CHECKOUT_LINK = "https://pay.kirvano.com/e6df8c45-1ec3-467a-8b7d-8647a21d04bf";
  
  const [stage, setStage] = useState('loading');
  const [timeLeft, setTimeLeft] = useState(600);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const hasAccess = localStorage.getItem('thorne_access_granted');
    if (hasAccess) {
      setStage('landing');
    } else {
      setStage('quiz');
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const completeQuiz = () => {
    localStorage.setItem('thorne_access_granted', 'true');
    setStage('landing');
  };

  const scrollToCheckout = () => {
    const element = document.getElementById('oferta-final');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (stage === 'quiz') return <IntroQuiz onComplete={completeQuiz} />;
  if (stage === 'loading') return <div className="min-h-screen bg-stone-950"></div>;

  return (
    <div className="min-h-screen bg-[#f4f4f0] text-stone-900 font-sans selection:bg-red-200 selection:text-red-900 overflow-x-hidden">
      
      {/* --- FAIXA DE URGÊNCIA --- */}
      <motion.div 
        initial={{ y: -50 }} animate={{ y: 0 }} transition={{ delay: 0.5 }}
        className="bg-red-800 text-white text-[10px] md:text-xs font-bold py-2 text-center uppercase tracking-widest sticky top-0 z-50 shadow-md flex justify-center items-center"
      >
        <Unlock className="w-3 h-3 mr-2" />
        Acesso de Detetive Liberado • Oferta expira em: {formatTime(timeLeft)}
      </motion.div>

      {/* --- HEADER --- */}
      <nav className="border-b border-stone-200 bg-[#f4f4f0]/95 backdrop-blur z-40 relative">
        <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-stone-900 text-white p-1.5 rounded font-serif font-bold text-xl leading-none">
              CT
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-tight uppercase leading-none">Caso Thorne</span>
              <span className="text-[9px] text-green-700 font-bold uppercase tracking-widest">Acesso Autorizado</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => document.getElementById('modos').scrollIntoView({behavior:'smooth'})} className="text-xs font-bold hover:text-red-700 uppercase tracking-wide text-stone-600 transition-colors">
              Como Jogar
            </button>
            <button onClick={() => document.getElementById('evidencias').scrollIntoView({behavior:'smooth'})} className="text-xs font-bold hover:text-red-700 uppercase tracking-wide text-stone-600 transition-colors">
              O Crime
            </button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToCheckout}
              className="bg-red-700 hover:bg-red-800 text-white px-5 py-2 rounded font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-900/10"
            >
              Baixar Acesso
            </motion.button>
          </div>

          <button className="md:hidden text-stone-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-stone-200 bg-[#f4f4f0] px-4 py-4 absolute w-full shadow-xl overflow-hidden z-50"
            >
              <button onClick={scrollToCheckout} className="block w-full bg-red-700 text-white text-center py-3 rounded font-bold mb-3 text-sm uppercase">
                Baixar Acesso
              </button>
              <button onClick={() => { document.getElementById('modos').scrollIntoView({behavior:'smooth'}); setMobileMenuOpen(false); }} className="block w-full py-2 font-bold text-stone-600 text-xs uppercase text-center border border-stone-300 rounded mb-2">
                Como Jogar
              </button>
              <button onClick={() => { document.getElementById('suspeitos').scrollIntoView({behavior:'smooth'}); setMobileMenuOpen(false); }} className="block w-full py-2 font-bold text-stone-600 text-xs uppercase text-center border border-stone-300 rounded">
                Ver Suspeitos
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-12 pb-16 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center relative z-10">
          
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 border border-green-600 bg-green-50 text-green-800 px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-4 rounded-full">
              <CheckCircle2 className="w-3 h-3" />
              Teste de Aptidão: Aprovado
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-black leading-[0.9] mb-4 text-stone-900 tracking-tight">
              VOCÊ TEM PERFIL <br />
              <span className="text-red-700">PARA ESTE CASO.</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-base md:text-lg font-serif text-stone-700 mb-8 border-l-4 border-stone-800 pl-4 leading-relaxed">
              Parabéns. Sua lógica no teste inicial indica que você pode resolver o assassinato de Marcus Thorne.
              <br/><br/>
              A polícia falhou. A família mente. <strong>Agora é com você.</strong> Acesse o sistema, leia os laudos e prenda o culpado.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToCheckout}
                className="bg-stone-900 hover:bg-stone-800 text-white px-6 py-4 rounded text-base font-bold flex items-center justify-center gap-3 shadow-xl group"
              >
                <Search className="w-5 h-5 text-red-500 group-hover:animate-pulse" />
                ASSUMIR A INVESTIGAÇÃO
              </motion.button>
            </motion.div>
            <motion.p variants={fadeInUp} className="mt-3 text-[10px] text-stone-500 font-mono uppercase">
              * Role para baixo para liberar seu acesso.
            </motion.p>
          </motion.div>

          {/* --- PREVIEW DO JOGO (ANIMADO) --- */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative hidden md:block"
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-stone-800 rounded-xl p-3 shadow-2xl transform rotate-2 border-b-4 border-r-4 border-black"
            >
              {/* Fake Screen */}
              <div className="bg-[#fdfbf7] rounded overflow-hidden relative h-[320px] border border-stone-600 font-mono text-xs">
                 <div className="bg-stone-200 p-2 flex justify-between items-center border-b border-stone-300">
                    <span className="font-bold text-stone-700">CASO #9902-B</span>
                    <div className="flex gap-1">
                       <div className="w-2 h-2 rounded-full bg-red-500"></div>
                       <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    </div>
                 </div>
                 <div className="p-4 space-y-3">
                    <div className="bg-white p-3 border border-stone-300 shadow-sm flex gap-3">
                       <div className="bg-stone-200 w-10 h-10 flex items-center justify-center">
                          <Lock className="w-4 h-4 text-stone-400" />
                       </div>
                       <div>
                          <div className="font-bold text-stone-800">ARQUIVO CRIPTOGRAFADO</div>
                          <div className="text-[10px] text-stone-500">Autópsia_Final.pdf</div>
                       </div>
                    </div>
                    <div className="bg-white p-3 border border-stone-300 shadow-sm flex gap-3">
                       <div className="bg-stone-200 w-10 h-10 flex items-center justify-center">
                          <Lock className="w-4 h-4 text-stone-400" />
                       </div>
                       <div>
                          <div className="font-bold text-stone-800">CHAT: AMANTE</div>
                          <div className="text-[10px] text-stone-500">Mensagens apagadas (recuperáveis)</div>
                       </div>
                    </div>
                    <motion.div 
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mt-4 p-2 bg-red-50 border border-red-200 text-red-800 text-center font-bold"
                    >
                       ACESSO BLOQUEADO
                    </motion.div>
                 </div>
              </div>
            </motion.div>
            
            <div className="absolute -bottom-5 -left-5 bg-white p-3 shadow-lg border border-stone-200 transform -rotate-3 z-10">
               <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
               </div>
               <p className="text-[10px] font-bold mt-1 text-stone-600">"Joguei com meu namorado e ficamos viciados."</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SEÇÃO: MODOS DE JOGO --- */}
      <section id="modos" className="py-16 bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-black uppercase text-stone-900 tracking-tight">Experiência Interativa para Todos</h2>
            <p className="text-stone-600 text-sm mt-2 max-w-xl mx-auto">
              O Caso Thorne não é um livro. É um sistema interativo que se adapta ao seu estilo de investigação.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { icon: <Heart className="w-6 h-6 text-red-600" />, title: "Para Casais (Date Night)", desc: "Apaguem as luzes, abram um vinho e resolvam juntos. Vejam quem tem o melhor instinto de detetive.", color: "red" },
              { icon: <Users className="w-6 h-6 text-blue-600" />, title: "Para Grupos de Amigos", desc: "Conecte na TV ou compartilhe a tela no Discord. Uma verdadeira sala de investigação policial.", color: "blue" },
              { icon: <User className="w-6 h-6 text-stone-600" />, title: "Modo Solo (Hardcore)", desc: "Mergulhe fundo. O desafio ideal para quem ama True Crime e quer testar a própria inteligência.", color: "stone" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className={`bg-[#f9f9f7] p-6 rounded-lg border border-stone-200 relative overflow-hidden group hover:border-${item.color}-400 transition-colors`}
              >
                 <div className={`w-12 h-12 bg-${item.color}-100 rounded-full flex items-center justify-center mb-4`}>
                    {item.icon}
                 </div>
                 <h3 className="font-bold text-lg mb-2 text-stone-900">{item.title}</h3>
                 <p className="text-sm text-stone-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- EVIDÊNCIAS --- */}
      <section id="evidencias" className="py-16 bg-[#f4f4f0]">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-black uppercase text-stone-900 tracking-tight">O que você vai analisar</h2>
            <div className="w-12 h-1 bg-red-600 mx-auto mt-3"></div>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
               { icon: <Smartphone className="w-8 h-8 text-blue-600 mb-3" />, t: "Celular da Vítima", d: "Acesse o WhatsApp, leia as conversas privadas e analise as notas pessoais. Encontre as contradições nos horários." },
               { icon: <FileText className="w-8 h-8 text-red-600 mb-3" />, t: "Laudos Técnicos", d: "Exames de toxicologia e balística reais. Você precisará ler e deduzir a causa da morte." },
               { icon: <Siren className="w-8 h-8 text-stone-800 mb-3" />, t: "Sistema da Polícia", d: "Interface imersiva que simula o computador da delegacia. Funciona no PC e Celular." }
            ].map((item, i) => (
               <motion.div 
                key={i} variants={scaleIn}
                className="p-6 bg-white border border-stone-200 rounded-lg shadow-sm hover:border-red-400 transition cursor-default"
               >
                  {item.icon}
                  <h3 className="font-bold text-stone-900 mb-2">{item.t}</h3>
                  <p className="text-sm text-stone-600 leading-snug">{item.d}</p>
               </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
            className="mt-8 flex items-center justify-center gap-2 text-red-800 bg-red-100 border border-red-200 p-3 rounded text-xs font-bold uppercase"
          >
             <AlertTriangle className="w-4 h-4" />
             Aviso: Contém imagens realistas de cena de crime.
          </motion.div>
        </div>
      </section>

      {/* --- SUSPEITOS (BLOQUEADOS) --- */}
      <section id="suspeitos" className="py-16 bg-white border-t border-stone-200">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8 border-b-2 border-stone-300 pb-2">
            <h2 className="text-xl font-black uppercase text-stone-800">Lista de Suspeitos</h2>
            <span className="bg-red-600 text-white px-2 py-1 text-[10px] font-bold rounded uppercase animate-pulse">
              Confidencial
            </span>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { role: "A Viúva", status: "Suspeita" },
              { role: "O Sócio", status: "Dívidas" },
              { role: "A Filha", status: "Deserdada" },
              { role: "O Médico", status: "Cúmplice?" }
            ].map((s, i) => (
              <motion.div 
                key={i} variants={fadeInUp}
                className="bg-[#f9f9f7] border-2 border-dashed border-stone-300 p-4 text-center rounded relative group hover:border-red-400 transition-colors"
              >
                <div className="w-16 h-16 bg-stone-100 mx-auto mb-3 rounded-full flex items-center justify-center border border-stone-200 group-hover:bg-red-50 transition-colors">
                  <Lock className="w-6 h-6 text-stone-400 group-hover:text-red-500 transition-colors" />
                </div>
                <h3 className="font-bold text-base text-stone-800 leading-none mb-1">BLOQUEADO</h3>
                <p className="text-xs font-mono text-stone-500 uppercase">{s.role}</p>
                
                {/* Overlay de tooltip */}
                <div className="absolute inset-0 bg-stone-900/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded">
                   <p className="text-white text-[10px] font-bold uppercase px-2">Adquira o acesso para liberar</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded text-center">
             <p className="text-stone-600 text-sm font-serif italic">
               "Todos mentem. Mas a evidência física nunca mente. Libere o acesso para ver os rostos e ler os depoimentos."
             </p>
          </div>
        </div>
      </section>

      {/* --- GARANTIA (NOVO) --- */}
      <section className="py-12 bg-stone-100 border-t border-stone-200">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="max-w-2xl mx-auto px-4 text-center"
        >
           <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
             <BadgeCheck className="w-8 h-8 text-white" />
           </div>
           <h3 className="text-xl font-black text-stone-900 uppercase">Garantia Blindada de 7 Dias</h3>
           <p className="text-stone-600 text-sm mt-3 leading-relaxed">
             Assuma o caso e investigue. Se você achar que o mistério é muito fácil ou muito difícil, ou se simplesmente não gostar da interface, nós devolvemos 100% do seu dinheiro. Sem perguntas. O risco é todo nosso.
           </p>
        </motion.div>
      </section>

      {/* --- OFERTA FINAL (SCROLL DESTINATION) --- */}
      <section id="oferta-final" className="py-20 bg-stone-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-stone-900 to-stone-900"></div>

        <div className="max-w-3xl mx-auto px-4 relative z-20">
          <motion.div 
            initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}
            className="bg-white text-stone-900 rounded-xl shadow-2xl overflow-hidden border-4 border-stone-800"
          >
            
            {/* Header da Oferta */}
            <div className="bg-red-700 p-4 text-center text-white">
               <h2 className="text-2xl font-black uppercase tracking-tight">Investigação Liberada</h2>
               <p className="text-xs font-mono opacity-90">Licença de uso único • Acesso Imediato</p>
            </div>

            <div className="p-8 md:p-12 flex flex-col items-center">
               
               <div className="flex flex-col md:flex-row items-center gap-8 mb-8 w-full justify-center">
                  <div className="text-center md:text-left">
                     <p className="text-stone-500 text-sm line-through decoration-red-500 decoration-2 font-bold">De R$ 69,90</p>
                     <motion.div 
                        animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
                        className="text-5xl font-black text-stone-900 tracking-tighter"
                     >
                        R$ 33,49
                     </motion.div>
                     <p className="text-[10px] text-green-600 font-bold uppercase mt-1 flex items-center justify-center md:justify-start">
                        <ShieldCheck className="w-3 h-3 mr-1" /> Pagamento Seguro
                     </p>
                  </div>

                  <div className="h-12 w-px bg-stone-200 hidden md:block"></div>

                  <ul className="text-sm font-bold text-stone-700 space-y-2">
                     <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-600 mr-2"/> Jogo Completo (Browser)</li>
                     <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-600 mr-2"/> Acesso Vitalício</li>
                     <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-600 mr-2"/> Sem Mensalidades</li>
                  </ul>
               </div>

               <motion.a 
                 href={CHECKOUT_LINK} 
                 target="_blank" rel="noopener noreferrer"
                 whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(22, 163, 74, 0.4)" }}
                 whileTap={{ scale: 0.98 }}
                 className="w-full max-w-md bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-lg text-xl font-bold shadow-xl shadow-green-600/30 transition-all flex items-center justify-center gap-2"
               >
                 <Unlock className="w-5 h-5" />
                 DESBLOQUEAR TUDO AGORA
               </motion.a>

               <div className="mt-6 flex flex-col items-center opacity-60">
                  <div className="flex gap-3 mb-2">
                     <CreditCard className="w-6 h-6 text-stone-400" />
                     <span className="font-mono text-xs pt-1">PIX • CARTÃO • BOLETO</span>
                  </div>
                  <p className="text-[10px] text-stone-400 text-center">
                     Garantia de 7 dias ou seu dinheiro de volta.<br/>
                     Seu acesso chega no e-mail logo após o pagamento.
                  </p>
               </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-stone-950 py-8 text-center border-t border-stone-800">
         <p className="text-stone-600 text-xs font-mono mb-2">
            CASO THORNE © 2024. Todos os direitos reservados.
         </p>
         <div className="flex justify-center gap-4 text-[10px] text-stone-700 font-bold uppercase">
            <a href="#" className="hover:text-white">Termos</a>
            <a href="#" className="hover:text-white">Privacidade</a>
            <a href="#" className="hover:text-white">Contato</a>
         </div>
      </footer>

    </div>
  );
};

export default App;