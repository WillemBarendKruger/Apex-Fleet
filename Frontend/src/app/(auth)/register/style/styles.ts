import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
  split: css`
    height: 100%;
    width: 50%;
    position: fixed;
    z-index: 1;
    top: 0;
    overflow-x: hidden;
    padding-top: 20px;
  `,
  left: css`
    left: 0;
    background-color: #0b192c;
  `,
  right: css`
    right: 0;
    background-color: #0b192c;
  `,
  splitLeft: css`
    height: 100%;
    width: 50%;
    position: fixed;
    z-index: 1;
    top: 0;
    overflow-x: hidden;
    padding-top: 20px;
    left: 0;
    background-color: transparent;
    @media (max-width: 768px) {
      display: none;
    }
  `,
  splitRight: css`
  height: 100%;
  width: 50%;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  overflow-x: hidden;
  padding-top: 20px;
  background-color: #7AB2D3;

  clip-path: polygon(35% 0%, 100% 0%, 100% 100%, 0% 100%);
  
  @media (max-width: 768px) {
    width: 100%;
    right: 0;
    left: 0;
    clip-path: none;
  }
`,
  Right: css`
  height: 100%; 
  width: 35%; 
  position: fixed; 
  z-index: 1; 
  top: 0; overflow-x: 
  hidden; padding-top: 2
  0px; right: 0; 
  background-color: red; 
  background-color: transparent;
  
  @media (max-width: 768px) {
    width: 100%;
    right: 0;
    left: 0;
    clip-path: none;
  }`,
  centered: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  `,
  subHeading: css`
    color: #ff6500;
  `,
  page: css`
    height: 100%;
    width: 100%;
    align-content: center;
  `,
  form: css`
    align-items: center;
    justify-items: center;
    justify-content: center;
  `,
  formContent: css`
    align-items: center;
    justify-items: center;
    justify-content: center;
  `,
  heading: css`
    justify-content: center;
    align-items: center;
    font-size: 30px;
    padding: 1rem;
    color: white;

    @media (max-width: 768px) {
      font-size: 24px;
    }

    @media (max-width: 480px) {
      font-size: 20px;
    }
  `,
  input: css`
    width: 300px;
    border-color: #ff6500;
    background: #0B192C;
    &:hover {
      background-color: #0B192C !important;
    }
      &:active {
      background-color: #0B192C !important;
    }
      &:focus {
      background-color: #0B192C !important;
    }

    @media (max-width: 480px) {
      width: 300px;
    }

    @media (max-width: 360px) {
      width: 250px;
    }
  `,
  loginButton: css`
    min-width: 300px;
    font-weight: bold;
    @media (max-width: 360px) {
      min-width: 250px;
    }
  `,
  registerBtn: css`
    min-width: 300px;
    font-weight: bold;
    @media (max-width: 360px) {
      min-width: 250px;
    }
  `,
  flex: css`
    justify: space-between;
    align: center;
  `,
  link: css`
    color: #0b192c;
  `,
  mobileLogo: css`
    display: none;
    text-align: center;
    background-color: transparent;

    @media (max-width: 768px) {
      display: block;
      margin-bottom: -50px;
    }
  `,
  logoImage: css`
    max-height: 400px;
    width: auto;

    @media (max-width: 480px) {
      max-height: 320px;
    }

    @media (max-width: 360px) {
      max-height: 100px;
    }
  `,

  logoText: css`
    color: #ff6500;
    font-size: 24px;
    font-weight: bold;
    margin: 0;

    @media (max-width: 480px) {
      font-size: 20px;
    }
  `,
});
