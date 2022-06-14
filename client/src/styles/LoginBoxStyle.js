import styled from "styled-components";

const LoginBoxStyle = styled.div`
   display: flex;
   align-items: center;
   height: 100vh;

   .login {
      max-width: 530px;
      width: 100%;
      height: 530px;
      margin: auto;
      border: 1px solid black;
      text-align: center;

      form {
         display: flex;
         flex-direction: column;
         justify-content: space-around;
         max-width: 300px;
         min-height: 150px;
         margin: auto;
      }
   }
`;

export default LoginBoxStyle;
