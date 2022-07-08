import styled from "styled-components";
import { gray } from "./utils/colors";

const LoginBoxStyle = styled.div`
   display: flex;
   align-items: center;
   height: 100vh;

   .login {
      background: ${gray[100]};
      max-width: 530px;
      width: 100%;
      height: 400px;
      margin: auto;
      text-align: center;

      form {
         display: flex;
         flex-direction: column;
         gap: 20px;
         max-width: 300px;
         margin: auto;
         padding-bottom: 20px;
      }
   }
`;

export default LoginBoxStyle;
