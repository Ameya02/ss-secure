import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { CheckCircle2 } from 'lucide-react'


type PricingCardProps = {
    title: string
    monthlyPrice?: number
    customPrice?: string
    description: string
    features: string[]
    actionLabel: string
  }
  
const PricingCard = ({ title, monthlyPrice,customPrice, description, features, actionLabel}: PricingCardProps) => (
    <Card
      className={`w-72 flex flex-col justify-between py-1 `} id='pricing'>
      <div>
        <CardHeader className="pb-8 pt-4">
            <div className="flex justify-between">
              <CardTitle className="text-zinc-700 dark:text-zinc-300 text-lg">{title}</CardTitle>
              <div
                className={"px-2.5 rounded-xl h-fit text-sm py-1 bg-zinc-200"}>
                
              </div>
            </div>

          <div className="flex gap-0.5">
            <h3 className="text-3xl font-bold">{ !customPrice && monthlyPrice ? "₹" + monthlyPrice : customPrice}</h3>
            <span className="flex flex-col justify-end text-sm mb-1">{monthlyPrice ? "/month" : null}</span>
          </div>

          <CardDescription className="pt-1.5 h-12">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
        </CardContent>
      </div>
      <CardContent className="flex flex-col gap-2">
        {features.map((feature: string) => (
          <CheckItem key={feature} text={feature} />
        ))}
      </CardContent>
      
      <CardFooter className="mt-2">
        <Button className="relative inline-flex w-full items-center justify-center rounded-md bg-black text-white dark:bg-white px-6 font-medium  dark:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
          {actionLabel}
        </Button>
      </CardFooter>
    </Card>
  )

export default PricingCard;

const CheckItem = ({ text }: { text: string }) => (
    <div className="flex gap-2">
      <CheckCircle2 size={18} className="my-auto text-green-400" />
      <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">{text}</p>
    </div>
  )