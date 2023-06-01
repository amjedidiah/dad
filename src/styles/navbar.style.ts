import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({
  isDarkMode,
  colors: { white, grey2, black },
  breakpoints,
}) => css`
    .bg-shadow{
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
        postion:sticky;
        top:0
    }
  .nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .picture-container {
      display: flex;
      gap: 5px;
      align-items: center;

      .image-container {
        border-radius: 50%;
        overflow: hidden;

        img {
          margin-top: 3rem;
          position: relative;
          left: -2%;
        }
      }

      .link {
        color: #808080;
        margin-top: 10px;
      }
    }
    nav {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      width: 40%;
      font-size: 16px;
    }

    .link {
      color: #808080;
    }
    .button-group{
        width:20%
        display: flex
    }
  }
`;

export default styles;
