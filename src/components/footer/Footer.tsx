import './Footer.css';

interface FooterI {}

export const Footer: React.FC<FooterI> = ({}) => {
  return (
    <div className="chat-footer-container">
      <textarea tabIndex={0} rows={1} placeholder="Your message"></textarea>

      <button className="chat-footer-send-btn">
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </div>
  );
};
