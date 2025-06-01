import React from 'react'
import Headline from './Headline'
import KeyFeatures from './KeyFeatures'
import DemoSection from './DemoSection'
import FooterCTA from './FooterCTA'

/* 
Hero: Headline + CTA 
3 Key features 
Demo Screenshot
Final CTA 
*/
const Landing = () => {

    return (
        <section>
            <Headline />
            <KeyFeatures />
            <DemoSection />
            <FooterCTA />
        </section>

    )
}

export default Landing
