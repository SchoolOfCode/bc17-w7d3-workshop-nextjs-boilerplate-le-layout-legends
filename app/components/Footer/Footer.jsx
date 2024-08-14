
import styles from './Footer.module.css';
import ExternalLink from './ExternalLink/ExternalLink';


const Footer = () => {

const socialLinks = [
  {
    href: 'https://www.facebook.com',
    text: 'Facebook',
  },
  {
    href: 'https://www.instagram.com',
    text: 'Instagram',
  },
  {
    href: 'https://www.tiktok.com',
    text: 'TikTok',
  },
];

  return (
    <footer className={styles.footer}>
      <div className={styles.colunmsContainer}>
        <div className={styles.footerColunm}>
          <p>Find us on:</p>
          <ul className={styles.footerNav}>
            {socialLinks.map((link, index) => (
              <ExternalLink key={index} href={link.href} text={link.text} className={styles.socialLink} />
            ))}
          </ul>
        </div>

        <div className={styles.footerColunm}>
          <p>Contact us:</p>
          <address>
            <a href="mailto:info@firepalace.co.uk" className={styles.emailLink}>
              info@firepalace.co.uk
            </a>
          </address>
        </div>
      </div>
    </footer>
  );
};

export default Footer;