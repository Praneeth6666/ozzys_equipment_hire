import Hero from '../components/Hero';
import Services from '../components/Services';
import Areas from '../components/Areas';
import IntentContent from '../components/IntentContent';
import About from '../components/About';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Services />
      <Areas />
      <IntentContent />
      <About />
      <Pricing />
      <FAQ />
      <Contact />
    </main>
  );
}
