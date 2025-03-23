import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { Input } from "../ui/input"

export const HeroSection = () => {
    return (
        <div className="w-full max-w-full px-4 sm:px-6 mx-auto overflow-hidden pt-28">
        <div className="py-8 md:py-12 lg:py-16">
          <div className="flex justify-center mx-auto py-3 max-w-xs sm:max-w-sm md:max-w-md rounded-full shadow-[inset_0px_0px_40px_-3px_rgba(_255,_255,_255,.5)]">
            <span className="flex items-center justify-center text-center">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-purple-200/100 opacity-75"></span>
                <span className="relative animate-pulse inline-flex rounded-full h-3 w-3 bg-blue-700"></span>
              </span>
              <span>Automate, Accelerate, Achieve</span>
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-center mt-6 md:mt-8">
            Unlock Your Dream Job
          </h1>
          <div className="text-4xl md:text-5xl lg:text-7xl font-semibold text-center p-2 pb-4">
            with Ease!
          </div>
          <div className="text-lg md:text-xl lg:text-2xl text-gray-300 mt-2 text-center px-2">
            Boost your salary by $10k-$300k with our all-in-one career accelerator.
          </div>
          <div className="w-full max-w-4xl mx-auto mt-8 md:mt-10 px-2">
            <Card className="p-4 sm:p-6 md:p-8 lg:p-10 bg-transparent text-white shadow-[inset_0px_0px_20px_-3px_rgba(_255,_255,_255,.5)]">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center">
                  Check Your Eligibility in
                </h1>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center mt-3">
                  Seconds!
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm sm:text-base md:text-lg text-gray-300 text-center">
                  Just drop your LinkedIn profile link below, and we'll guide you
                </div>
                <div className="text-sm sm:text-base md:text-lg text-gray-300 text-center">
                  through the journey.
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                <Input placeholder="Place your Linkedin URL here.." className="w-full shadow-[inset_0px_0px_20px_-3px_rgba(_255,_255,_255,.5)] border-none rounded-full p-4 sm:p-6"/>
                <Button className="w-full sm:w-auto p-4 sm:p-6 rounded-full bg-[rgb(149,126,234)] text-white hover:text-black shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)]">
                  Check Now
                </Button>
              </div>
            </Card>
            <div className="mt-16 md:mt-20">
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold text-center">
                Our Trusted Partners
              </h1>
              <div className="text-base md:text-lg text-gray-300 mt-4 text-center">
                Collaborating with top industry leaders to bring you the best 
              </div>
              <div className="text-base md:text-lg text-gray-300 text-center">
                resources and opportunities and career success.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}