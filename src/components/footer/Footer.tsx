import React from "react";
import "./Footer.css";

interface FooterI {
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    message: string,
    resetInput: () => void,
    focusInput: () => void
  ) => void;
}

export const Footer: React.FC<FooterI> = ({ onSubmit }) => {
  const FooterWrapperRef = React.useRef<HTMLFormElement>(null);
  const MessageBoxRef = React.useRef<HTMLTextAreaElement>(null);

  const [Message, setMessage] = React.useState("");

  const ResizeInputHeight = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      e.persist();
      const Styles = e.currentTarget.style;
      Styles.height = "auto";

      const InputHeight = e.currentTarget.scrollHeight - 2 + "px";
      Styles.height = InputHeight;

      if (parseInt(InputHeight) > 24 && FooterWrapperRef.current) {
        FooterWrapperRef.current.style.alignItems = "flex-end";
      } else if (FooterWrapperRef.current)
        FooterWrapperRef.current.style.alignItems = "center";

      return e;
    },
    []
  );

  return (
    <footer className="footer-wrapper">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(
            e,
            Message,
            () => setMessage(""),
            () => MessageBoxRef.current?.focus()
          );
        }}
        className="chat-footer-wrapper"
        ref={FooterWrapperRef}
      >
        <button type="button">
        <i className="ph ph-smiley-sticker icon-size"></i>
        </button>
        <button type="button">
          <i className="ph ph-paperclip icon-size"></i>
        </button>

        <div className="chat-footer-container">
          <textarea
            ref={MessageBoxRef}
            name="message"
            tabIndex={0}
            rows={1}
            placeholder="Your message"
            value={Message}
            onChange={(e) => {
              const Target = ResizeInputHeight(e);
              setMessage(Target.currentTarget.value);
            }}
            required
          ></textarea>
        </div>

        <button type="submit" className="chat-footer-send-btn">
          <i className="ph-bold ph-arrow-up"></i>
        </button>
      </form>
    </footer>
  );
};
