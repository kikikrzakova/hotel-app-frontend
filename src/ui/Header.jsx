import styled from "styled-components";

const StyledHeader = styled.header`
  grid-column: 1 / span 2;
  height: 150px;
  background: #5e22db;
`;
export default function Header() {
  return <StyledHeader> Header </StyledHeader>;
}
