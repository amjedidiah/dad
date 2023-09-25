import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({
  isDarkMode,
  colors: { white, grey2, black },
  breakpoints,
}) => css`

    padding 75px 0;

    @media (min-width: ${breakpoints.lg}px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .intro {
        display: flex;
        flex-direction: column;
        justify-content:space-between;
        padding: 1.5rem 1.5rem 1.5rem 1.5rem;
        border: 1px solid ${isDarkMode ? white : black};
        width: 90%;
        @media(min)

        .intro-top {
            display: flex;
            justify-content: space-between;
            @media (min-width: ${breakpoints.mobileL}px){
                flex-direction: column;
                width: 100%;
                align-items: center;
            }
        }
        .reverse {
            flex-direction: row-reverse;
            @media (min-width: ${breakpoints.mobileL}px){
                flex-direction: column;
            }
        }

        .intro-content {
            display: flex;
            justify-content: space-between;
            width: 70%;
            height: 100%;
            font-weight: 500;
            flex-direction: column;
            flex-shrink: 0;
            @media (min-width: ${breakpoints.mobileM}px){
                width: 100%;
                height: 68rem;
                margin-bottom: 2rem;
            }

            h4  {
                font-size: 2.5rem;
                line-height: 4rem;
                color: ${isDarkMode ? white : black}
                
            }

            h6 {
                font-size: 1.25rem;
                line-height: 1.5rem;
                color: ${isDarkMode ? white : black}
            }

            p {
                font-size: 1rem;
                font-weight: 400;
                letter-spacing: 0.02rem;
                color: ${isDarkMode ? white : black} 

            }

        }

        .Learn-more {
            display: flex;
            width: 49.75rem;
            padding: 1rem 2rem;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            border-radius: 0.5rem;
        }

        .Awards {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 0rem 1.5rem;
            margin-top: 1.5rem;
            color: ${isDarkMode ? white : black};

            h5 {
                width: 30%;
            }
        }


        .about-pic {
            width: 24rem;
            height: auto;
            
        }
    }
    
    `;

export default styles;
