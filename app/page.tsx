import { RegistrationGate } from '@/components/registration-form'

const posterImage = '/images/foro-gastronomico.webp'

export default function Page() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="animate-fade-in border-b border-ink/10 bg-cream/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-8 lg:px-12">
          <div className="font-display text-lg font-bold leading-none tracking-tight text-ink sm:text-xl">Global<br />Gateway</div>
          <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/55 sm:gap-6 sm:text-xs">
            <span className="hidden sm:inline">Unión Europea</span>
            <span className="font-display text-base normal-case tracking-normal text-wine sm:text-lg">Horizont 3000</span>
            <span>Fundesram</span>
          </div>
        </div>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-73px)]  gap-10 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:gap-0 lg:px-0 lg:py-0">
        <div className="animate-slide-up relative flex min-h-[360px] flex-col justify-end overflow-hidden lg:min-h-full">
          <div className="image-panel absolute inset-0 overflow-hidden bg-ink">
            <img src={posterImage} alt="Afiche del Foro Experiencia Gastronómica del Perú" className="h-full w-full object-cover object-center transition duration-1000 ease-out hover:scale-[1.025]" />
            <div className="image-wash pointer-events-none absolute inset-0" />
          </div>
          <div className="relative z-10 m-6 border-l-2 border-cream pl-4 text-xs uppercase tracking-[0.22em] text-cream drop-shadow-sm sm:m-8 lg:m-12">26 agosto 2026<br /><span className="text-cream/75">Santa Ana · El Salvador</span></div>
        </div>

        <div className="animate-slide-up-delayed flex flex-col justify-center gap-7 px-0 sm:px-4 lg:px-16 lg:py-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-wine"><span className="h-px w-9 bg-wine" /> Foro gastronómico</div>
            <h1 className="max-w-xl font-display text-5xl leading-[0.98] text-ink sm:text-6xl lg:text-[4.4rem]">Experiencia <em className="text-wine">Gastronómica</em> del Perú</h1>
            <p className="max-w-lg text-[15px] leading-7 text-ink/65">Regístrate para ser parte de un encuentro que celebra la tradición, el territorio, la innovación y la proyección de nuestra gastronomía.</p>
          </div>

          <div className="border-t border-ink/15 pt-6">
            <div className="mb-5 flex flex-col gap-1"><h2 className="font-display text-2xl text-ink">Reserva tu lugar</h2><p className="text-sm text-ink/55">Completa tus datos para confirmar tu asistencia.</p></div>
            <RegistrationGate />
          </div>
        </div>
      </section>

      <footer className="border-t border-ink/10 bg-cream">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-center border-b border-ink/10 pb-5">
            <img src="/images/logos-superiores.png" alt="Global Gateway, Unión Europea, Horizont 3000 y Fundesram" className="h-auto max-h-20 w-full max-w-3xl object-contain" />
          </div>
          <div className="flex items-center justify-center">
            <img src="/images/logos-aliados.png" alt="Logos de las organizaciones aliadas y patrocinadoras del foro" className="h-auto max-h-16 w-full max-w-5xl object-contain" />
          </div>
          <p className="pt-1 text-center text-xs tracking-wide text-ink/55">Sabores que cuentan historias · Destinos que crean futuro</p>
        </div>
      </footer>
    </main>
  )
}
