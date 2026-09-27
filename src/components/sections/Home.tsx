'use client';

import React from 'react';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import Reviews from './Reviews';
import Contact from './Contact';

const Home = () => {
  return (
    <div className="overflow-x-clip">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Reviews />
      <Contact />
    </div>
  );
};

export default Home;
