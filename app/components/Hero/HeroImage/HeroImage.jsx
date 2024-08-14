
import styles from './HeroImage.module.css'
const HeroImage = () => {
    return (
        <img
        src="/images/hero-desktop.png"
        alt="Cozy living room with a fireplace"
        className={styles.heroImage}
      />
    )
}

export default HeroImage