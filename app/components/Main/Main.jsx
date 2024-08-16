import HeroSection from "../Hero/HeroSection/HeroSection"
import Separator from "../Separator/Separator";
import HowItWorksSection from "../HowItWorks/HowItWorksSection/HowItWorksSection";
import Reviews from "../Reviews/Reviews";

const Main = () => {
  return (
    <main>
      <HeroSection />
      <Separator />
			<Reviews />
			<Separator />
      <HowItWorksSection />
    </main>
  );
};

export default Main;
