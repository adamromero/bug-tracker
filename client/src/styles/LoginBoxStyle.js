import styled from "styled-components";
import { gray, green } from "./utils/colors";

const LoginBoxStyle = styled.div`
   display: flex;
   align-items: center;
   height: 100vh;

   .login {
      background: ${gray[100]};
      text-align: center;
      height: 100vh;
      display: flex;
      justify-content: center;
      flex-direction: column;
      flex: 1;

      form {
         display: flex;
         flex-direction: column;
         gap: 20px;
         max-width: 300px;
         margin: auto;
         padding-bottom: 20px;
      }
   }

   .landing-panel {
      background: ${green[300]};
      color: white;
      padding: 20px;
      width: 100%;
      height: 100vh;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
   }
`;

export default LoginBoxStyle;
