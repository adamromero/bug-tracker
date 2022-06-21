import styled from "styled-components";

const TrackerListItem = styled.li`
   display: flex;
   justify-content: space-between;
   border-bottom: 1px solid black;

   a {
      display: flex;
      flex: 1;
      padding: 12px 0;
      justify-content: space-between;
      align-items: center;
   }
`;

export default TrackerListItem;
