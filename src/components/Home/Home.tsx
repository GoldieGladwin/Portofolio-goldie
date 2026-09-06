'use client';

import { ThemeProvider } from 'next-themes';
import React, { useEffect } from 'react'
import Hero from './Hero/Hero';
import About from './About/About';
import Skills from './Skills/Skill'
import Projects from './Project/Projects';
import Experience from './Experience/Experience';
import ClientRiview from './ClientRiview/ClientRiview';
import Contact from './contact/Contact';
import Footer from './Footer/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles


const Home = () => {

  useEffect(()=>  {
    const initAOS = async()=>{
      await import('aos');
      AOS.init({
        duration:1000,
        easing:"ease",
        once:true,
        anchorPlacement:"top-bottom"

      })
    }
    initAOS();
  })
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