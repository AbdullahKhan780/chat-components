import Chat from "../bubble/Bubble";
import "./Header.css";

interface HeaderI {}

export const Header: React.FC<HeaderI> = ({}) => {
  return (
    <div className="chat-header-container">
      <button className="chat-header-edit">
        <i className="ph ph-arrow-left icon-size"></i>
      </button>

      <div className="chat-header-content">
        <Chat.Avatar />
        <div>
          <h5>John Doe</h5>
          <p style={{ margin: 0, fontSize: 10 }}>Online</p>
        </div>
      </div>

      <button className="chat-header-edit">
        <i className="ph ph-note-pencil icon-size"></i>
      </button>
    </div>
  );
};
