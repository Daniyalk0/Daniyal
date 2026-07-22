import React from 'react'
import Hero from './components/Hero'
import SelectedWork from './components/Projects'
import AboutSection from './components/About'
import CraftSection from './components/Crafts'
import Contact from './components/Contact'
import { VintageWrapper } from './components/VintageWrapper'
import AIPage from './Ai/AiPage'

const page = () => {
  return (
    <>
    <VintageWrapper>

    <Hero/>
    <SelectedWork/>
    <AboutSection/>
    <CraftSection/>
    <Contact/>
    </VintageWrapper>
    {/* <AIPage/> */}
    </>
  )
}

export default page