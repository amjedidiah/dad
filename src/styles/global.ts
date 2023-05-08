import font from "@/utils/font.util";
import { css } from "@emotion/react";

export default css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: ${font.style.fontFamily}, sans-serif;
  }
  a {
    text-decoration: none;
    color: #724e91;
    font-weight: 700;
  }
  .huge {
    display: inline-block;
    font-size: 1.3em;
    font-weight: 700;
    color: #724e91;
    text-shadow: 0 0 1px #724e91;

    @media screen and (min-width: 600px) {
      font-size: 2em;
    }
  }
`;
