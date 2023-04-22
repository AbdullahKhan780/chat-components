import Chat from './components/bubble/Bubble';
import './App.css';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import * as React from 'react';

const CURR_USER = 'me';

const DATA = [
  {
    message: 'Hi there, How are you? Did you completed the task I requested?',
    userId: 'you',
    createdOn: 1682094367,
  },
  {
    message: 'Yes I have compeleted the tasks.',
    userId: 'me',
    createdOn: 1682094367,
    status: 'seen',
  },
  {
    message: `That's great!`,
    userId: 'you',
    createdOn: 1682094367,
  },
  {
    message: 'Yup!',
    userId: 'me',
    createdOn: 1682094367,
    status: 'failed',
  },
];

function App() {
  const [Messages, setMessages] = React.useState<
    Array<{
      message?: string;
      userId?: string;
      createdOn?: number;
      status?: 'delivered' | 'seen' | 'failed';
    }>
  >();

  const [Typing, setTyping] = React.useState(true);

  React.useEffect(() => {
    setMessages(DATA as any);
  }, []);

  return (
    <>
      <Header />
      <div className="chat-container">
        {Messages?.map((message, index) => {
          const MY_MESSAGE = message.userId === CURR_USER;

          return (
            <div
              className={`chat-row ${
                MY_MESSAGE ? 'chat-dir-rtl' : 'chat-dir-ltr'
              }`}
              key={index}
            >
              {!MY_MESSAGE && <Chat.Avatar />}
              <Chat.Bubble inverted={MY_MESSAGE} {...message} />
            </div>
          );
        })}

        {Typing && (
          <div className={`chat-row chat-dir-ltr`}>
            <Chat.Avatar />
            <Chat.Bubble typing={true} />
          </div>
        )}
      </div>

      {/* Send Message Input */}
      <div className="chat-input">
        <Footer />
      </div>
    </>
  );
}

export default App;
