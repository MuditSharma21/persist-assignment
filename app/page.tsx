import { FeatureSection } from "@/components/FeatureSection";
import { Footer } from "@/components/Footer/footer";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar/Navbar"
import ScrollAnimation from "@/components/ScrollAnimation/ScrollAnimation";
import { SocialSection } from "@/components/SocialSection";
import { SupportSection } from "@/components/SupportSection";


export default function Home() {
  
  return (
    <>
      <section className="flex flex-col justify-center text-white bg-gradient-to-tr from-black via-[rgb(104,52,164)] via-65% to-[rgb(31,30,30)] shadow-white min-h-screen w-full overflow-x-hidden">
        <Navbar />
        <HeroSection />
        <ScrollAnimation />
        <FeatureSection />
        <SocialSection />
        <SupportSection />
        <Footer />
    </section>
    </>
  );
}