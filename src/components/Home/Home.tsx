'use client';

import { ThemeProvider } from 'next-themes';
import React from 'react'
import Hero from './Hero/Hero';
import About from './About/About';
import Skills from './Skills/Skill'
import Projects from './Project/Projects';
import Experience from './Experience/Experience';
import ClientRiview from './ClientRiview/ClientRiview';
import Contact from './contact/Contact';
import Footer from './Footer/Footer';


const Home = () => {

  return (
    <div className="overflow-hidden">
      <Hero/>
      <About/>
      <Skills/>
      <Projects/>
      <Experience/>
      <ClientRiview/>
      <Contact/>
     
        
    </div>
  )
}

export default Home;