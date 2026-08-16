import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import About from '../components/About';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <About />
      <ContactForm />
    </main>
  );
}
