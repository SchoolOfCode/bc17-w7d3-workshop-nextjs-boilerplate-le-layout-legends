import styles from './Article.module.css';
import Image from 'next/image'


const Article = ({ imageSrc, altText, title, description }) => {
  return (
    <article className={styles.tile}>
      <Image src={imageSrc} alt={altText} width={250} height={200} className={styles.tileImage} />
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
};

export default Article;
