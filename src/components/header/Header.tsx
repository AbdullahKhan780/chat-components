import Chat from '../bubble/Bubble';
import './Header.css';

interface HeaderI {}

export const Header: React.FC<HeaderI> = ({}) => {
  return (
    <div className="chat-header-container">
      <button className="chat-header-edit">Back</button>

      <div className="chat-header-content">
        <Chat.Avatar />
        <h5>John Doe</h5>
      </div>

      <button className="chat-header-edit">Edit</button>
    </div>
  );
};
