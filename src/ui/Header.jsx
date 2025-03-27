import styled from "styled-components";
import { useContext } from "react";
import { AuthenticationContext } from "../App";

const StyledHeader = styled.header`
  grid-column: 1 / span 2;
  height: 200px;
  background-image: url("https://res.cloudinary.com/dvbjogim7/image/upload/v1734973901/610487c7-e880-41c1-9a26-c6305554718c_fr8ui6.png");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 1rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
`;

const Logo = styled.h1`
  color: #f5ebe2;
  font-size: 4rem;
  font-weight: 700;
  font-family: "Playfair Display", serif;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  z-index: 2;
  position: relative;
  text-align: center;
  margin: 0;
`;

const SignOutLink = styled.button`
  background-color: transparent;
  color: #f5ebe2;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  font-family: "Lato", sans-serif;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border: 2px solid #f5ebe2;
  border-radius: 4px;
  z-index: 2;
  position: absolute;
  top: 1rem;
  right: 2rem;

  &:hover {
    background-color: #f5ebe2;
    color: #954608;
    cursor: pointer;
  }
`;

export default function Header() {
  const setIsAuthenticated = useContext(AuthenticationContext);

  return (
    <StyledHeader>
      <Logo>Luxe Hotel</Logo>
      <SignOutLink type="click" onClick={()=>{
        setIsAuthenticated(false);
      }}>Sign Out</SignOutLink>
    </StyledHeader>
  );
}
