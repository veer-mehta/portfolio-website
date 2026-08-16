import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Skills />
      <About />
      <ContactForm />
    </main>
  );
}
