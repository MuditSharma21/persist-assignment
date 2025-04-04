import { Carousel } from "../Carousel/carousel"
import JobCardsSection from "../AnimatedSocial"

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
        <JobCardsSection />
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