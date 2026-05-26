import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Areas from './components/Areas';
import IntentContent from './components/IntentContent';
import About from './components/About';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}

export default App;
