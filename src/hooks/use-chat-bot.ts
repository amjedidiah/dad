import { useCallback, useEffect, useRef } from "react";

export default function useChatBot() {
  const chatBotRef = useRef<Element>();

  const handleButton = useCallback(() => {
    if (!chatBotRef.current?.shadowRoot) return;

    const button = chatBotRef.current.shadowRoot.querySelector(
      "button.chatsimple-widget-button-1"
    ) as HTMLElement | null;
    if (!button) return;

    button.style.right = "clamp(3.175rem, 4.76%, 4.5rem)";
    button.style.width = "3rem";
    button.style.height = "3rem";
    button.addEventListener("click", () => {
      setTimeout(() => {
        if (!chatBotRef.current?.shadowRoot) return;
        const closeButtons = chatBotRef.current.shadowRoot.querySelectorAll(
          "button.chatsimple-tw-text-white"
        );

        closeButtons.forEach((button) => {
          button.addEventListener("click", () => {
            setTimeout(handleButton, 500);
          });
        });
      }, 500);
    });
  }, []);

  useEffect(() => {
    const seeButton = () => {
      const webComponent = document.querySelector("chat-bot");
      if (!webComponent) return;

      chatBotRef.current = webComponent;

      handleButton();
    };

    setTimeout(seeButton, 5000);
  }, [handleButton]);
}
