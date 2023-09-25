import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({
  isDarkMode,
  colors: { white, grey2, black },
  breakpoints,
}) => css`
  
      padding 75px 0;
  
      @media (min-width: ${breakpoints.lg}px) {
          height: 30vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
      }
  
      .about-header {
            width: 90%;
        h1 { 
            font-size: 8rem;
            color: ${isDarkMode ? white : grey2};
            font-weight: 700;
            line-height: 7.5rem;
        }
        span {
            font-size: 5.5rem;
            line-height: 6.25rem;
            letter-spacing: 0.12rem;
            width: 95rem;
            color: ${isDarkMode ? black : white};
            padding: 0.5rem;
            text-shadow: -1px 1px 2px #000,
            1px 1px 2px #000,
            1px -1px 0 #000;
            -1px -1px 0 #000;
        }
    }
  
`;

export default styles;
