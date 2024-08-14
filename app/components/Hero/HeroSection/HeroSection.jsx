import HeroDescription from "../HeroDescription/HeroDescription";
import HeroImage from "../HeroImage/HeroImage";
import styles from "./HeroSection.module.css";
const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <HeroImage />
      <HeroDescription />
    </section>
  );
};

export default HeroSection;
