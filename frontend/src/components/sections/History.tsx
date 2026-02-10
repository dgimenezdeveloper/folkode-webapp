
import React from 'react';
import { Calendar, Users, Coffee, Fingerprint, Palette } from 'lucide-react';

const History: React.FC = () => {
  return (
    <section id="history" className="section relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Main Story Section */}
        <div className="grid lg:grid-cols-2 gap-20 items-center !mb-40">
          <div className="relative">
            <div className="section-title mb-8">
              <h5 className="text-gradient text-[10px] font-black !tracking-[0.5em] uppercase mb-4 text-start">Origen de Folkode</h5>
              <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9] text-center md:text-left">
                NUESTRA <br />
                <span className="text-white/20">HISTORIA</span>
              </h3>
            </div>
            <div className="space-y-8 relative z-10">
              <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed font-medium text-center md:text-left">
                Durante principios de julio de 2025, algo empezó a tomar forma. Lo que al principio eran charlas sueltas entre cursadas, mateadas improvisadas y noches de codeo en Discord se fue transformando en una idea compartida.
              </p>
              <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed text-center md:text-left">
                Éramos compañeros de la universidad con habilidades distintas—diseño, programación, comunicación—pero con una convicción común: queríamos trabajar de forma colaborativa, sin estructuras rígidas, creando soluciones para problemas reales.
              </p>
              <p className="text-xl !text-[var(--color-primary)] font-bold leading-relaxed italic border-l-4 border-[var(--color-primary)] !pl-6 !py-2 bg-[var(--color-primary)]/5 rounded-r-xl text-center md:text-left">
                El 21 de julio tuvimos nuestra primera reunión presencial.
              </p>
              <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed text-center md:text-left">
                La llamamos reunión fundacional, y fue el momento en que Folkode dejó de ser una idea flotante para convertirse en un proyecto con cuerpo y alma. Ese día definimos nuestras primeras reglas, no como imposiciones, sino como acuerdos para cuidarnos y crecer juntos.
              </p>
            </div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[var(--color-primary)]/5 rounded-full blur-[100px] -z-10" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 !gap-10 sm:gap-6">
            <div className="card h-[200px] !m-[0rem] sm:!m-[2rem] sm:!p-4 glass rounded-[3rem] border-[var(--color-border)] flex flex-col justify-center items-center text-center group hover:border-[var(--color-primary)]/30 transition-all">
              <Calendar className="!mb-2 w-10 h-10 text-[var(--color-primary)] mb-6 group-hover:scale-110 transition-transform" />
              <span className="text-white font-black text-lg mb-2">Julio 2025</span>
              <span className="text-[var(--color-text-secondary)] text-[10px] font-bold uppercase tracking-widest">Inicios</span>
            </div>
            <div className="card h-[200px] !m-[0rem] sm:!m-[2rem] !p-4 glass rounded-[3rem] border-[var(--color-border)] flex flex-col justify-center items-center text-center lg:translate-y-12 group hover:border-[var(--color-primary)]/30 transition-all">
              <Coffee className="!mb-2 w-10 h-10 text-[var(--color-primary)] mb-6 group-hover:scale-110 transition-transform" />
              <span className="text-white font-black text-lg mb-2">Mate & Code</span>
              <span className="text-[var(--color-text-secondary)] text-[10px] font-bold uppercase tracking-widest">Cultura</span>
            </div>
            <div className="card h-[200px] !m-[0rem] sm:!m-[2rem] !p-4 glass rounded-[3rem] border-[var(--color-border)] flex flex-col justify-center items-center text-center group hover:border-[var(--color-primary)]/30 transition-all">
              <Users className="!mb-2 w-10 h-10 text-[var(--color-primary)] mb-6 group-hover:scale-110 transition-transform" />
              <span className="text-white font-black text-lg mb-2">Reunión 21/07</span>
              <span className="text-[var(--color-text-secondary)] text-[10px] font-bold uppercase tracking-widest">Fundación</span>
            </div>
            <div className="card h-[200px] !m-[0rem] sm:!m-[2rem] !p-4 glass rounded-[3rem] border-[var(--color-border)] flex flex-col justify-center items-center text-center lg:translate-y-12 group hover:border-[var(--color-primary)]/30 transition-all">
              <div className="w-10 h-10 bg-[var(--color-primary)] rounded-xl flex items-center justify-center !mb-2 shadow-lg shadow-[var(--color-primary)]/20">
                <span className="!mt-3 text-black font-black text-center">F</span>
              </div>
              <span className="text-white font-black text-lg mb-2">Propósito</span>
              <span className="text-[var(--color-text-secondary)] text-[10px] font-bold uppercase tracking-widest">Colaborativo</span>
            </div>
          </div>
        </div>

        {/* Nuestro Nombre Section */}
        <div className="!mb-40 relative">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-secondary)]/10 rounded-full blur-[120px] -z-10" />
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/3 flex flex-col items-center lg:block">
              <div className="w-16 h-16 bg-[var(--color-primary)]/10 rounded-2xl flex items-center justify-center !mb-4 border border-[var(--color-primary)]/20">
                <Fingerprint className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <h5 className="text-gradient font-black !tracking-[0.5em] text-[10px] uppercase mb-4 text-start">La Identidad</h5>
              <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter !mx-0 !mb-6">NUESTRO NOMBRE</h3>
            </div>
            <div className="lg:w-2/3 space-y-8">
              <p className="text-xl !text-[var(--color-text-primary)] font-medium leading-relaxed text-center sm:!ml-[2rem] sm:text-start">
                Folkode es la síntesis de dos universos que nos definen y nos inspiran.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="card glass p-10 rounded-[2.5rem] border-[var(--color-border)]">
                  <h5 className="text-gradient font-black tracking-widest uppercase text-xs mb-4">“Fol” (Folclore)</h5>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    Evocando la riqueza cultural, la diversidad y las raíces que atraviesan nuestra identidad. Es el reflejo de las historias, saberes y tradiciones que nos conectan con nuestra tierra y con las personas.
                  </p>
                </div>
                <div className="card glass p-10 rounded-[2.5rem] border-[var(--color-border)]">
                  <h5 className="text-gradient font-black tracking-widest uppercase text-xs mb-4">“Kode” (Code)</h5>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    El lenguaje universal de la tecnología y la innovación, la herramienta con la que transformamos ideas en soluciones digitales de impacto.
                  </p>
                </div>
              </div>
              <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed border-l-4 border-[var(--color-primary)]/30 !pl-8">
                Unimos lo ancestral y lo moderno, la creatividad colectiva y el pensamiento lógico, para crear tecnología con sentido, propósito y valor humano. En Folkode, cada proyecto es un puente entre cultura y software, entre comunidad y futuro.
              </p>
            </div>
          </div>
        </div>

        {/* Nuestro Logo Section */}
        <div className="relative">
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-primary)]/5 rounded-full blur-[100px] -z-10" />
          <div className="flex flex-col lg:flex-row-reverse items-center lg:items-start">
            <div className="lg:w-1/3 flex flex-col items-center lg:items-end">
              <div className="w-16 h-16 bg-[var(--color-secondary)]/10 rounded-2xl flex items-center justify-center !mb-4 border border-[var(--color-secondary)]/20">
                <Palette className="w-8 h-8 text-[var(--moss-green)]" />
              </div>
              <h5 className="text-gradient font-black !tracking-[0.5em] text-[10px] uppercase mb-4  lg:text-end">El Símbolo</h5>
              <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter text-center !mx-0 lg:text-end">NUESTRO <br />LOGO</h3>
            </div>
            <div className="w-full lg:w-2/3 space-y-8">
              <div className="card glass !m-0 !p-8 rounded-[4rem] border-[var(--color-border)]/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                  <div className="w-32 h-32 bg-white/20 rounded-full blur-3xl" />
                </div>
                <div className="relative z-10">
                  <h5 className="text-white font-black text-2xl !mb-8 flex flex-nowrap items-center gap-4 whitespace-nowrap">
                    <span className="flex-1 !w-0 lg:w-12 !h-[2px] lg:!h-1 bg-[var(--color-primary)] shrink-0" />
                    La Cruz Pampa
                    <span className="flex-1 !w-0 !h-[2px] lg:!h-1 bg-[var(--color-primary)]" />
                  </h5>
                  <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-10">
                    Es un motivo decorativo ancestral originario de la región pampeana y patagónica de Argentina, presente en la cultura mapuche y tehuelche. Representa la conexión con la tierra y la identidad de nuestros pueblos originarios.
                  </p>
                  <div className="grid md:grid-cols-2 gap-12 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    <div>
                      <p className="mb-4"><strong className="text-white">Origen:</strong> Conocida como la “Guarda del Cacique”, símbolo de jerarquía y liderazgo. Su presencia señalaba la autoridad del líder.</p>
                      <p><strong className="text-white">Cosmovisión:</strong> Los rombos simbolizan los puntos cardinales y la unión de la comunidad a través de la simetría.</p>
                    </div>
                    <div>
                      <p className="mb-4"><strong className="text-white">Significado Hoy:</strong> Ícono nacional argentino que trasciende su origen para reflejar la diversidad y la unidad del país.</p>
                      <p><strong className="text-white">Reinterpretación:</strong> En Folkode la fusionamos con modernidad para honrar la nobleza, energía, unión y visión.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-2 mt-12 !mb-8 justify-items-center">
                <div className="flex gap-4 md:gap-6 items-start card !p-4 !mx-0 md:mx-[2rem] w-full md:w-80 !border-[var(--color-primary)]">
                  <div className="w-4 h-22 bg-[var(--color-primary)] rounded-full shrink-0" />
                  <div>
                    <h6 className="text-white font-bold !mb-2">Verde Folkode</h6>
                    <p className="text-[var(--color-text-secondary)] text-sm !m-0">Innovación, crecimiento y conexión con la naturaleza. Desarrollo sostenible y evolución constante.</p>
                  </div>
                </div>
                <div className="flex gap-4 md:gap-6 items-start card !p-4 !mx-0 md:mx-[2rem] w-full md:w-80 !border-[var(--color-secondary)]">
                  <div className="w-4 h-22 bg-[var(--color-secondary)] rounded-full shrink-0" />
                  <div>
                    <h6 className="text-white font-bold !mb-2">Azul Petrolito</h6>
                    <p className="text-[var(--color-text-secondary)] text-sm !m-0">Confianza, tecnología y visión de futuro. Los cimientos de cada proyecto que emprendemos.</p>
                  </div>
                </div>
              </div>
              <p className="text-center pt-10 text-[var(--color-text-secondary)]/60 font-black tracking-[0.3em] uppercase text-[10px]">
                Raíces culturales • Espíritu moderno • Progreso tecnológico
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
