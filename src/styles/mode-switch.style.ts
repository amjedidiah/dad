import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({ isDarkMode }) => css`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  position: fixed;
  right: clamp(2rem, 4.76%, 4.5rem);
  bottom: clamp(2rem, 4.76%, 4.5rem);

  button {
    display: flex;
    width: 3rem;
    height: 3rem;
    padding: 0.5rem;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    outline: none;
    border: none;
    cursor: pointer;
    background: ${isDarkMode
      ? "rgba(255, 255, 255, 0.10)"
      : "rgba(255, 255, 255, 0.50)"};
  }
`;

export default styles;
