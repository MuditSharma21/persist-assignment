import Link from "next/link"
import { Card } from "../ui/card"
import { Button } from "../ui/button"

export const FeatureSection = () => {
    return (
        <>
            <div className="w-full max-w-full px-4 sm:px-6 mx-auto py-8 md:py-12 overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8">
          <Card className="w-full md:w-1/2 p-6 sm:p-8 bg-transparent text-white shadow-[inset_0px_0px_20px_-3px_rgba(_255,_255,_255,.5)]">
            Image
          </Card>
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl md:text-3xl font-semibold text-center md:text-left mt-6 md:mt-8">
              Hundreds apply for the same
            </h1>
            <div className="text-2xl md:text-3xl font-semibold text-center md:text-left p-2 pb-4">
              job - so what sets you apart?
            </div>
            <p className="text-xs md:text-sm text-gray-300 font-semibold">
              Truth is, everyone's grinding LeetCode, attending bootcamps, and following the same playbook. But landing the job isn't just about coding skills-it's about knowing how to get hired.
            </p>
            <p className="text-xs md:text-sm mt-2 text-gray-300 font-semibold">
              That's why you see less-skilled candidates securing top roles while others struggle. The real advantage? Mastering the jon hunt, not just the code.
            </p>
            <Link href={'/'}>
              <Button className="p-4 text-xs mt-6 rounded-full bg-[rgb(149,126,234)] text-white hover:text-black shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)]">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full max-w-full px-4 sm:px-6 mx-auto py-8 md:py-12 overflow-hidden">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-semibold">
          We Do Everything For You!
        </h1>
        <div className="text-sm md:text-base text-gray-300 mt-2 text-center">
          Looking for your next big career move? Relax - we'll handle it all! 
        </div>
      </div>
      <div className="w-full max-w-full px-4 sm:px-6 mx-auto py-6 md:py-8 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-4 sm:p-6 bg-transparent shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)] hover:bg-purple-950 transition duration-600 ease-in-out">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-white">Craft a Standout Resume</h2>
              <p className="text-xs md:text-sm text-gray-300 mt-2">Stand out with a professionally designes, tailor-made resume.</p>
            </div>
          </Card>
          <Card className="p-4 sm:p-6 bg-transparent shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)] hover:bg-purple-950 transition duration-600 ease-in-out">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-white">LinkedIn Profile Enhancement</h2>
              <p className="text-xs md:text-sm text-gray-300 mt-2">Optimize your LinkedIn to attract top recruiters.</p>
            </div>
          </Card>
          <Card className="p-4 sm:p-6 bg-transparent shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)] hover:bg-purple-950 transition duration-600 ease-in-out">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-white">Automated Job Applications</h2>
              <p className="text-xs md:text-sm text-gray-300 mt-2">Let automation work for you, apply to jobs without lifting a finger</p>
            </div>
          </Card>
          <Card className="p-4 sm:p-6 bg-transparent shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)] hover:bg-purple-950 transition duration-600 ease-in-out">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-white">Personalised Career Advice</h2>
              <p className="text-xs md:text-sm text-gray-300 mt-2">Receive guidance tailored to your goals, plus interview prep and insider tips.</p>
            </div>
          </Card>
          <Card className="col-span-1 md:col-span-2 p-4 sm:p-6 md:p-8 bg-purple-950 shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)]">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-white">Take the Stress Out of Job Hunting</h2>
              <p className="text-sm md:text-base text-gray-300 mt-2">Join our accelerator program and focus on your future while we handle the hard work.</p>
              <Link href={'/'}><Button className="bg-white text-black rounded-full mt-4 text-xs hover:bg-black hover:text-white">Get Started Now</Button></Link>
            </div>
          </Card>
        </div>
      </div>
        </>
    )
}