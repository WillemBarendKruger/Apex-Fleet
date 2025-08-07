import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
  pageContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 48px 24px;
    background-color: #1e1e1e;
    min-height: 100vh;
    max-width: 100%;
    margin: 0 auto;
    color: #e5e7eb;
    font-family: "Segoe UI", Roboto, sans-serif;
  `,

  aiContainer: css`
    width: 100%;
    max-width: 800px;
    margin-top: 32px;
    padding: 32px;
    background-color: #2c2c2c;
    border-radius: 16px;
    border: 1px solid #84cc16;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 8px 24px rgba(132, 204, 22, 0.2);
    }
  `,

  chatCard: css`
    width: 100%;
    background-color: #2c2c2c;
    border: 1px solid #84cc16;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    color: #e5e7eb;
  `,

  promptInput: css`
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: #1f2937;
    color: #f9fafb;
    border: 1px solid #84cc16;
    border-radius: 8px;
    padding: 12px;
    font-size: 16px;
    transition: border-color 0.3s ease;

    &:focus-within {
      border-color: #a3e635;
    }
  `,

  analyzeButton: css`
    background-color: #84cc16;
    border-color: #84cc16;
    color: #1e1e1e;
    font-weight: bold;
    padding: 8px 20px;
    font-size: 16px;
    border-radius: 6px;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: #a3e635;
      border-color: #a3e635;
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  `,

  imagePreview: css`
    margin-top: 16px;
    border-radius: 10px;
    border: 1px solid #84cc16;
    max-width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  `,

  responseSection: css`
    margin-top: 32px;
    padding: 20px;
    background-color: #374151;
    border-radius: 12px;
    border-left: 5px solid #84cc16;
    color: #f3f4f6;
    font-size: 15px;
    line-height: 1.6;
    box-shadow: inset 0 0 0 1px rgba(132, 204, 22, 0.1);
  `,

  resultCard: css`
    margin-top: 24px;
    width: 100%;
    background-color: #2f2f2f;
    border: 1px solid #84cc16;
    border-radius: 10px;
    padding: 20px;
    color: #d1d5db;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  `,
});