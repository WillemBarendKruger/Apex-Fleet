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
      max-height: 150px;
      width: auto;
    }

    @media (max-width: 768px) {
      img {
        max-height: 120px;
      }
    }

    @media (max-width: 480px) {
      img {
        max-height: 90px;
      }
    }
  `,

  sinceText: css`
    font-size: 14px;
    color: #d1d5db;
    margin-top: 5px;
    margin-bottom: 20px;
  `,

  heading: css`
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 15px;

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
    margin-bottom: 30px;
    color: #e5e7eb;

    @media (max-width: 480px) {
      font-size: 16px;
    }
  `,

  orangeButton: css`
    background-color: #ff6500 !important;
    border: none !important;
    font-weight: bold;
    width: 200px;
    margin-bottom: 20px;

    &:hover {
      background-color: #e55c00 !important;
    }
  `,

  smallText: css`
    margin: 10px 0;
    font-size: 16px;
    color: #f3f4f6;
  `,

  button: css`
    width: 200px;
    background-color: #ff6500 !important;
    border: none !important;
    font-weight: bold;
    margin-top: 10px;

    &:hover {
      background-color: #e55c00 !important;
    }
  `,
});
