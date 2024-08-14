import styles from './styles.module.css';
import Article from '../Article/Article';

const HowItWorksSection = () => {

  const articlesData = [
    {
      imageSrc: '/images/how-it-works-1.png',
      altText: 'Phone call illustration',
      title: 'Give us a call...',
      description: 'Call us and book in a "Design Consultation" on a date and time that suits you.',
    },
    {
      imageSrc: '/images/how-it-works-2.png',
      altText: 'Home visit illustration',
      title: 'We come to you...',
      description: 'We come to your home to do an assessment of the space and to your style preference.',
    },
    {
      imageSrc: '/images/how-it-works-3.png',
      altText: 'Fireplace recommendation illustration',
      title: 'We recommend...',
      description: 'We send you a bespoke set of fireplace recommendations.',
    },
  ];
  
  return (
    <section className={styles.howItWorksSection}>
      <h2 className={styles.howItWorksText}>How It Works</h2>
      <div className={styles.tiles}>
        {articlesData.map((article, index) => (
          <Article
            key={index}
            imageSrc={article.imageSrc}
            altText={article.altText}
            title={article.title}
            description={article.description}
          />
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
