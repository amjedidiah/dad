import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
} from "@react-email/components";

type Props = {
  message: string;
  name: string;
};

export default function EmailTemplate({ message, name }: Readonly<Props>) {
  return (
    <Html>
      <Head />
      <Preview>{name || "Someone"} has sent you a message</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Hello, Dr. Passy!</Heading>
          <blockquote
            style={text}
            dangerouslySetInnerHTML={{
              __html: message.replace(/\n/g, "<br />"),
            }}
          />
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#000000",
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: "auto",
  padding: "6rem 1.25rem 4rem",
};

const h1 = {
  color: "#ffffff",
  fontSize: "1.5rem",
  fontWeight: "600",
  lineHeight: "150%",
  margin: "0 0 1.25rem",
};

const text = {
  color: "#f5f5f5",
  fontSize: "1rem",
  lineHeight: "150%",
  margin: "0 0 2.5rem",
};
