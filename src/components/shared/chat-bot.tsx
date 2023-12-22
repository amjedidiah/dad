import useChatBot from "@/hooks/use-chat-bot";

export default function ChatBot() {
  useChatBot();

  return (
    <chat-bot
      platform_id="4ab2c356-1b29-4e73-b4ce-e89486920581"
      user_id="e60a612c-d975-4ddf-a34a-84868b125f9e"
      chatbot_id="a304ee03-617d-44c2-ab72-cd1f4ae39a3e"
    >
      <a href="https://www.chatsimple.ai/?utm_source=widget&utm_medium=referral">
        [chatbot]
      </a>
    </chat-bot>
  );
}
