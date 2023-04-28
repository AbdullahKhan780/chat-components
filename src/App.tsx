import Chat from "./components/bubble/Bubble";
import "./App.css";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import * as React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const DATE = new Date();

const CURR_USER = "me";

const DATA = [
  {
    message: "Hi there, How are you? Did you completed the task I requested?",
    userId: "you",
    createdOn: 1682094367,
  },
  {
    message: "Yes I have compeleted the tasks.",
    userId: "me",
    createdOn: 1682094367,
    status: "delivered",
  },
  {
    message: `That's great!`,
    userId: "you",
    createdOn: 1682094367,
  },
  {
    message: "Yup!",
    userId: "me",
    createdOn: 1682094367,
    status: "seen",
  },
];

function App() {
  const [Messages, setMessages] = React.useState<
    Array<{
      message?: string;
      userId?: string;
      createdOn?: number;
      status?: "delivered" | "seen" | "failed" | "waiting";
    }>
  >();

  const [Typing, setTyping] = React.useState(true);

  const ChatContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMessages(DATA as any);
  }, []);

  return (
    <>
      <div className="main">
        <div className="wrapper">
          <Header />
          <main className="chat-container" ref={ChatContainerRef}>
            <div style={{ flex: "1 1 0%", overflow: "hidden" }}>
              <ScrollToBottom
                mode="bottom"
                className="main-scrollar"
                scrollViewClassName="scrollview"
                followButtonClassName="followBtn"
              >
                <div style={{ height: 10 }}></div>
                {Messages?.map((message, index) => {
                  const MY_MESSAGE = message.userId === CURR_USER;

                  return (
                    <div
                      className={`chat-row ${
                        MY_MESSAGE ? "chat-dir-rtl" : "chat-dir-ltr"
                      }`}
                      key={index}
                    >
                      {!MY_MESSAGE && <Chat.Avatar />}
                      <Chat.Bubble sender={MY_MESSAGE} {...message} />

                      {MY_MESSAGE &&
                        (message.status === "delivered" ? (
                          <i className="ph-bold ph-check-circle"></i>
                        ) : message.status === "seen" ? (
                          <i className="ph-fill ph-check-circle"></i>
                        ) : message.status === "failed" ? (
                          <i className="ph-bold ph-warning-circle"></i>
                        ) : (
                          <i className="ph-bold ph-clock"></i>
                        ))}
                    </div>
                  );
                })}

                {Typing && (
                  <div className={`chat-row chat-dir-ltr`}>
                    <Chat.Avatar />
                    <Chat.Bubble typing={true} />
                  </div>
                )}

                <div style={{ height: 10 }}></div>
              </ScrollToBottom>
            </div>

            <Footer
              onSubmit={(_, message, reset, focus) => {
                setTyping(false);
                setMessages((prev) => [
                  ...prev!,
                  {
                    message: message,
                    createdOn: Math.floor(DATE.getTime() / 1000),
                    userId: "me",
                    status: "delivered",
                  },
                ]);

                reset();
                focus();
              }}
            />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
