import Hero from '../components/home/Hero'
import Benefits from '../components/home/Benefits'
import ScrollScene3D from '../components/home/ScrollScene3D'
import HowItWorks from '../components/home/HowItWorks'
import Examples from '../components/home/Examples'
import Statistics from '../components/home/Statistics'
import Testimonials from '../components/home/Testimonials'
import CTASection from '../components/home/CTASection'

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <ScrollScene3D />
      <HowItWorks />
      <Examples />
      <Statistics />
      <Testimonials />
      <CTASection />
    </>
  )
}
