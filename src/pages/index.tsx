import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import About from '../components/About';
import Repertoire from '../components/Repertoire';
import OfferSection from '../components/OfferSection';
import ContactForm from '../components/Contact';
import Contact from '../components/Contact';
import Services from '@/components/Services';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <About />
      <Repertoire />
      <Services />
      <OfferSection />
      <Contact />
    </Layout>
  );
}
