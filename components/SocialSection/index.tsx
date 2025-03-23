import Link from "next/link"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { WobbleCard } from "../WobbleCard/wobble-card"
import Image from "next/image"
import { Carousel } from "../Carousel/carousel"

const slideData = [
    {
      title: "Doggo",
      description: "FullStack Developer",
      src: "/videos/video1.mp4",
      isVideo: true
    },
    {
      title: "Monkey",
      description: "Backend Developer",
      src: "/videos/video2.mp4",
      isVideo: true
    },
    {
      title: "Kitty",
      description: "FullStack Developer",
      src: "/videos/video3.mp4",
      isVideo: true
    }
  ];

export const SocialSection = () => {
    return (
        <>
            <div className="w-full max-w-full px-4 sm:px-6 mx-auto py-10 md:py-14 overflow-hidden">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-center">
            Get Hired or Hire Top Talent- Fast!
          </h1>
          <div className="text-gray-300 text-sm md:text-base mt-3 text-center">
            Accelerate your career or hire top developers with ease!
          </div>
        </div>
        <div className="flex flex-col items-center gap-8 mt-12 md:mt-16">
          <div className="flex flex-col md:flex-row items-center gap-8 w-full">
            <Card className="bg-transparent w-full md:w-2/3 p-4 sm:p-6">
              <div className="mx-2 md:mx-4">
                <h2 className="text-white text-xl md:text-2xl font-semibold">
                  Land Your Dream Job!
                </h2>
                <div className="text-gray-300 text-xs md:text-sm mt-2">
                  Explore 10,000+ high-paying tech jobs and get hired faster with our Career Accelerator.
                </div>
                <Link href={'/search-for-jobs'}>
                  <Button className="rounded-xl text-white border text-xs bg-transparent mt-4 hover:text-black hover:border-black hover:border-2">
                    Explore Now
                  </Button>
                </Link>
              </div>
            </Card>
            <div className="w-full md:w-1/3 max-w-xs">
              <WobbleCard className="bg-transparent border-none w-full h-auto">
                <Image src={'/logos/amazon.png'} alt="" width={500} height={500}/>
              </WobbleCard>
            </div>
          </div>
          
          <div className="flex flex-col-reverse md:flex-row items-center gap-8 w-full">
            <div className="w-full md:w-1/3 max-w-xs">
              <WobbleCard className="bg-transparent border-none w-full h-auto">
                <Image src={'/logos/amazon.png'} alt="" width={500} height={500}/>
              </WobbleCard>
            </div>
            <Card className="bg-transparent w-full md:w-2/3 p-4 sm:p-6">
              <div className="mx-2 md:mx-4">
                <h2 className="text-white text-xl md:text-2xl font-semibold">
                  Hire Top Developers Fast!
                </h2>
                <div className="text-gray-300 text-xs md:text-sm mt-2">
                  Access job-ready tech talent and fill roles effortlessly.
                </div>
                <Link href={'/start-hiring'}>
                  <Button className="rounded-xl text-white border text-xs bg-transparent mt-4 hover:text-black hover:border-black hover:border-2">
                    Start Posting
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="w-full max-w-full px-4 sm:px-6 mx-auto py-10 md:py-14 overflow-hidden">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-center">
            Real Stories, Real Impact
          </h1>
          <div className="text-gray-400 text-xs md:text-sm font-semibold mt-3 text-center max-w-md mx-auto">
            We help you transform your career, unlock new opportunities, and achieve your full potential.
          </div>
        </div>
        <div className="mt-10 w-full overflow-hidden">
          <Carousel slides={slideData}/>
        </div>
      </div>
        </>
    )
}