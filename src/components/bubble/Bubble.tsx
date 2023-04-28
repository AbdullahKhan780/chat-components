import * as React from "react";
import "./Bubble.css";

const Chat: React.FC<{ children: React.ReactNode }> & {
  Bubble: typeof Bubble;
  Avatar: typeof Avatar;
} = ({ children }) => <>{children}</>;

interface BubbleI {
  sender?: boolean;
  message?: string;
  typing?: boolean;
  status?: "waiting" | "seen" | "delivered" | "failed";
  createdOn?: number;
}

const Bubble: React.FC<BubbleI> = ({
  typing = false,
  sender,
  message,
  status,
  createdOn,
}) => {
  const [Typing, setTyping] = React.useState(typing);

  const TimeStampFormater = (
    time: number,
    returnType: "time" | "date" | "mix" = "time"
  ) =>
    React.useMemo(() => {
      const DATE = new Date(time);

      const CURR_TIME = DATE.toLocaleTimeString([], {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      });

      const CURR_DATE = DATE.toLocaleDateString([], {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      return returnType === "time"
        ? `${CURR_TIME}`
        : returnType === "date"
        ? `${CURR_DATE}`
        : `${CURR_DATE} ${CURR_TIME}`;
    }, [createdOn]);

  React.useEffect(() => {
    setTyping(typing);
  }, [typing]);

  return (
    <div>
      <div className="chat-bubble-wrapper">
        <div
          className={`chat-bubble ${
            sender ? "chat-bubble-radius-inverted" : ""
          }`}
        >
          {Typing ? (
            <div className="typing">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          ) : (
            <span>{message}</span>
          )}
          {createdOn && (
            <small className="chat-bubble-timestamp">
              {TimeStampFormater(createdOn)}
            </small>
          )}
        </div>
      </div>

      {status === "failed" && (
        <button className="chat-bubble-retry">Retry</button>
      )}
    </div>
  );
};

const Avatar: React.FC = ({
  ...rest
}: Omit<React.HTMLAttributes<HTMLImageElement>, "className">) => {
  return (
    <img
      className="chat-bubble-avatar"
      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=100&q=60"
      {...rest}
    />
  );
};

Chat.Bubble = Bubble;
Chat.Avatar = Avatar;

export default Chat;
