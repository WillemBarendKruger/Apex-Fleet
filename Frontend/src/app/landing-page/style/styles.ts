import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
  page: css`
    height: 100vh;
    width: 100%;
    background-image: linear-gradient(
        rgba(0, 0, 0, 0.6),
        rgba(0, 0, 0, 0.8)
      ),
      url("/landing-page.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    padding: 20px;
  `,

  logo: css`
    margin-bottom: 20px;
    img {
      max-height: 200px;
      width: auto;
    }

    @media (max-width: 768px) {
      img {
        max-height: 220px;
      }
    }

    @media (max-width: 480px) {
      img {
        max-height: 190px;
      }
    }
  `,

  sinceText: css`
    font-size: 14px;
    color: #d1d5db;
    margin-top: 5px;
  `,

  heading: css`
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 10px;

    @media (max-width: 768px) {
      font-size: 28px;
    }

    @media (max-width: 480px) {
      font-size: 24px;
    }
  `,

  subHeading: css`
    font-size: 18px;
    max-width: 500px;
    margin-bottom: 20px;
    color: #e5e7eb;

    @media (max-width: 480px) {
      font-size: 16px;
    }
  `,

  orangeButton: css`
    background-color: #84CC16 !important;
    border: none !important;
    font-weight: bold;
    width: 200px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(247, 247, 247, 1) !important;

    &:hover {
      background-color: #2C2C2C !important;
      box-shadow: 0 6px 10px #84CC16 !important;
    }
  `,

  smallText: css`
    margin: 10px 0;
    font-size: 16px;
    color: #f3f4f6;
  `,

  button: css`
    width: 200px;
    background-color: #84CC16 !important;
    box-shadow: 0 2px 8px rgba(247, 247, 247, 1) !important;
    border: none !important;
    font-weight: bold;
    margin-top: 10px;

    &:hover {
      background-color: #2C2C2C !important;
      box-shadow: 0 6px 10px #84CC16 !important;
    }
  `,
});
