import { Interpolation, Theme, css } from "@emotion/react";

const styles: Interpolation<Theme> = ({
  isDarkMode,
  colors: { white, grey2, black },
  breakpoints,
}) => css`
  .bg-shadow
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
        height:136px;

  .nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position:sticky;
    @media (max-width: ${breakpoints.sm}px) {
      flex-direction: column
    }
    .picture-container {
      display: flex;
      gap: 5px;
      align-items: center;

      .image-container {
        border-radius: 50%;
        overflow: hidden;

      }

      .link {
        color: #808080;
        margin-top: 10px;
      }
    }
    nav {
      display: flex;
      justify-content: space-between;
      gap: 2rem;
    }

    .link {
      color: #808080;
    }
    .button-group{
        display: flex
    }
  }
`;

export default styles;
