import HeroFoundersDescription from "../HeroFoundersDescription/HeroFoundersDescription";
import HeroFoundersImage from "../HeroFoundersImage/HeroFoundersImage";
import styles from "./HeroFoundersSection.module.css";

const HeroFoundersSection = () => {
    return (
        <section className={styles.heroFoundersSection}>
            <HeroFoundersDescription />
            <HeroFoundersImage />
        </section>
    );
};

export default HeroFoundersSection;
