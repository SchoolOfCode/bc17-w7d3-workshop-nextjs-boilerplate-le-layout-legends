
const ExternalLink = ({ href, text, className }) => {
  return (
    <li>
      <a href={href} className={className}>
        {text}
      </a>
    </li>
  );
};

export default ExternalLink;