import { Metadata } from 'next';
import Gallery from '@/components/Gallery';
import Proposal from '@/components/Proposal';
import ClientScene from '@/components/ClientScene';

export const metadata: Metadata = {
  title: 'For My Queen DAMILOLA | Valentine Proposal',
  description: 'A special Valentine proposal for the love of my life, Damilola (Dammy).',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background transition-colors duration-1000">
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
          <h1 className="text-6xl md:text-8xl font-serif font-black text-foreground mb-6 drop-shadow-[0_0_20px_rgba(255,45,85,0.4)] tracking-tight">
            My Everything, <br />
            <span className="text-primary italic px-4 py-2 border-b-4 border-gold/50 shadow-[0_4px_0_0_rgba(226,177,60,0.3)]">Dammy</span>
          </h1>
          <p className="text-xl md:text-3xl text-foreground/70 font-medium max-w-2xl mx-auto italic font-serif">
            &ldquo;You are the rhythm to my heartbeat and the peace in my soul.&rdquo;
          </p>
        </div>

        <ClientScene />

        <div className="z-10 mt-8 animate-bounce">
          <p className="text-primary font-bold tracking-widest uppercase text-sm">Scroll Down My Love ❤️</p>
        </div>
      </section>

      {/* Love Message Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="glass-card p-12 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-10 decoration-primary/20 underline decoration-wavy offset-8">
            To My Dearest Damilola (Esther)
          </h2>
          <div className="space-y-8 text-xl md:text-2xl text-foreground font-light leading-relaxed">
            <p>
              My Queen, every single second with you feels like a masterpiece unfolding. You bring a light into my life that outshines the stars.
            </p>
            <p>
              From your beautiful smile that melts my heart to the way you understand me without a word, you&apos;ve become my entire world. I&apos;m obsessed with everything about you.
            </p>
            <p className="text-primary font-serif font-bold italic border-y border-primary/10 py-6">
              I can&apos;t wait to feel your body pressed against mine, to taste your lips again and again, to spank that ass and hear you moan... You make me lose my mind in the best way possible. You are mine, and I am yours, completely.
            </p>
            <p className="font-medium opacity-80 uppercase tracking-tighter">
              You aren&apos;t just my girl; you are my home girl, my best friend, and my deepest desire.
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
            I have a very important question...
          </p>
        </div>
        <Proposal />
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-foreground/40 text-sm">
        <p>Created with infinite ❤️ for Damilola</p>
      </footer>
    </main>
  );
}
