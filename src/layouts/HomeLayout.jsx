import React from 'react';
import Banner from '../pages/Home/Banner'; 
import Features from '../pages/Home/Features';
import About from '../pages/Home/About'; 
import FAQ from '../pages/Home/Faq';
import PricingPlans from '../pages/PricingPlans/PricingPlans';
import HowItWorks from '../pages/Home/HowItWorks';
import WhyToChoose from '../pages/Home/WhyToChoose';
import GetStarted from '../pages/Home/GettingStart';

const HomeLayout = () => {
    return (
        <div>
            <Banner />
            <About />
            <Features />
            <HowItWorks />
            <WhyToChoose /> 
            <FAQ />
            <PricingPlans />
            <GetStarted/>
        </div>
    );
};

export default HomeLayout;