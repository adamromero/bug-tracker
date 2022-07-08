import styled from "styled-components";

const UserEditStyle = styled.div`
   max-width: 300px;
   width: 100%;

   label {
      display: flex;
      flex-direction: column;
   }
   .inline-label {
      flex-direction: row;
      gap: 6px;
      align-items: center;
   }
   form {
      display: flex;
      flex-direction: column;
      gap: 15px;
   }
`;

export default UserEditStyle;
