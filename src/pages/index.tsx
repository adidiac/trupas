import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import About from '../components/About';
import Repertoire from '../components/Repertoire';
import OfferSection from '../components/OfferSection';
import ContactForm from '../components/Contact';
import Contact from '../components/Contact';
import Services from '@/components/Services';
import Showreel from '../components/Showreel';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <About />
      <Showreel />
      <Repertoire />
      <Services />
      <Testimonials />
      <FAQ />
      <Contact />
      {/* <Newsletter /> */}
      <Footer />
    </Layout>
  );
}
