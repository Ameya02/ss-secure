import React from 'react'
import PricingCard from './price-card';

const PricePlan = () => {
    const plans = [
        {
          title: "Basic",
          price: 0,
          customPrice: "Free",
          description: "Basic Features you need to get started",
          features: ["Static Analysis of your links", "Static Analysis of your file", ],
          actionLabel: "Get Started",
        },
        {
            title: "Pro",
            monthlyPrice: 999,
            description: "Pro Features to take your business to the next level",
            features: ["Free Plan Included", "Dynamic Analysis of your links", "Dynamic Analysis of your links"],
            actionLabel: "Pro Plan",
          },
       
        {
          title: "Enterprise",
          customPrice: "Custom",
          description: "Custom Features for your business",
          features: ["Pro Plan Included", "API Access for your business"],
          actionLabel: "Contact Sales",
        },
      ]
  return (
    <div className='container py-12 lg:py-20'>
            <div className="text-center">
    <h2 className="text-3xl font-bold">Pricing Plans</h2>
    <p className="text-xl pt-1">Choose the plan that&apos;s right for you</p>
    <br />
  </div>
  <div className=" mx-auto max-w-6xl px-[10rem] lg:px-8 grid grid-cols-1 gap-4 lg:grid-cols-3 ">
  <PricingCard {...plans[0]} />
  <PricingCard {...plans[1]} />    
  <PricingCard {...plans[2]} />    
    </div>
    </div>
  )
}

export default PricePlan;