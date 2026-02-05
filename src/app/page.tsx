import { Metadata } from 'next';
import Gallery from '@/components/Gallery';
import Proposal from '@/components/Proposal';
import ClientScene from '@/components/ClientScene';

export const metadata: Metadata = {
  title: 'For My Princess JOY | Valentine Proposal',
  description: 'A special Valentine proposal for the love of my life, Ayomide (JOY).',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffafa]">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-20">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-primary/10 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 40 + 20}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 5 + 5}s`
              }}
            >
              ❤️
            </div>
          ))}
        </div>

        <div className="z-10 text-center px-4 w-full">
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-4 drop-shadow-md">
            Mami,
          </h1>
          <p className="text-xl md:text-2xl text-foreground font-medium max-w-2xl mx-auto opacity-80">
            You are the joy in my life and the peace in my heart.
          </p>
        </div>

        <ClientScene />

        <div className="z-10 mt-8 animate-bounce">
          <p className="text-primary font-bold">Scroll Down ❤️</p>
        </div>
      </section>

      {/* Love Message Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="glass-card p-12 rounded-[2rem] shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
            To My Dearest Ayomide
          </h2>
          <div className="space-y-6 text-lg md:text-xl text-foreground/90 leading-relaxed font-medium">
            <p>
              My Princess, every moment with you feels like a beautiful dream that I never want to wake up from. You bring a special kind of <b>JOY</b> to my world that I never knew existed.
            </p>
            <p>
              From the way you laugh at my jokes to the quiet moments we share, you've become my safest place and my favorite adventure. Your presence brings me a sense of peace that calms even my busiest days.
            </p>
            <p>
              You are more than just my girl; you are my best friend, my confidante, and the person who makes me want to be a better version of myself every single day.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery />

      {/* Proposal Section */}
      <section className="py-24">
        <div className="text-center mb-8">
          <p className="text-2xl text-primary font-bold animate-pulse">
            One last thing...
          </p>
        </div>
        <Proposal />
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-foreground/40 text-sm">
        <p>Made with ❤️ for JOY</p>
      </footer>
    </main>
  );
}
