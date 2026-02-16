import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { LeetCode } from '@/components/LeetCode';
import { Experience } from '@/components/Experience';
import { Contact } from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <LeetCode />
      <Experience />
      <Contact />
    </>
  );
}
