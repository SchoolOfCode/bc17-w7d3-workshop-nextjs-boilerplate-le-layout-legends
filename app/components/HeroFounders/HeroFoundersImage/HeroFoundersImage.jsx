import styles from "./HeroFoundersImage.module.css";
import Image from "next/image";

const HeroFoundersImage = () => {
    return (
        <Image
            src="/images/founder-mike-and-mandy.png"
            alt="Our founders, Mike and Mandy"
            className={styles.heroFoundersImage}
            width={400}
            height={400}
        />
    );
};

export default HeroFoundersImage;
