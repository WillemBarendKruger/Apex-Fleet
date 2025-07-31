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
    background-color: #111;
  `,
  right: css`
    right: 0;
    background-color: #111;
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

  /* Create angled edge using clip-path */
  clip-path: polygon(35% 0%, 100% 0%, 100% 100%, 0% 100%);
  
  @media (max-width: 768px) {
    width: 100%;
    right: 0;
    left: 0;
    clip-path: none; /* Remove angle on mobile for simplicity */
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
    clip-path: none; /* Remove angle on mobile for simplicity */
  }`,
  centered: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
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
  heading: css`
    align-items: center;
    text-align: center;
    font-size: 35px;
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
    width: 300px !important;
    border-color: #080808ff;
    background: #0B192C;
    &:hover {
      background-color: #0b192c !important;
    }
    &:active {
      background-color: #0b192c !important;
    }
    &:focus {
      background-color: #0B192C !important;
    }

    @media (max-width: 480px) {
      width: 300px;
    }

    @media (max-width: 360px) {
      width: 200px;
    }
  `,
  select: css`
    width: 300px;
    border-color: grey;
    background: #0b192c;
    &:hover {
      background-color: #0b192c !important;
    }
    &:active {
      background-color: #0b192c !important;
    }
    &:focus {
      background-color: #0b192c !important;
    }

    @media (max-width: 480px) {
      width: 300px;
    }

    @media (max-width: 360px) {
      width: 200px;
    }
  `,
  flex: css`
    justify: space-between;
    align: center;
  `,
  loginBtn: css`
  width: 300px ;
    align-items: center;
    justify-items: center;
    justify-content: center;
    background-color: #0b192c !important;
  `,
  registerBtn: css`
  background-color: #E55C00 !important;
  &:hover {
      background-color: #ff6500 !important;
    }
  `
});
