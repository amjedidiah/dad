import { useCallback } from "react";

type MailData = {
  name?: string;
  email: string;
  message: string;
};

export default function useMail() {
  const sendMail = useCallback(async (data: MailData) => {
    const response = await fetch("/api/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }, []);

  return {
    sendMail,
  };
}
