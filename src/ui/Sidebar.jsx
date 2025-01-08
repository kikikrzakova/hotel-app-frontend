import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { IoSettings } from "react-icons/io5";
import { MdBedroomParent } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { IconContext } from "react-icons";
import { FaTableList } from "react-icons/fa6";

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #954608;
`;

const StyledNavLink = styled(NavLink)`
  box-sizing: border-box;
  font-size: 22px;
  font-weight: 500;
  color: #dcb592;
  height: 2.6em;
  padding-left: 9px;
  text-decoration: none;
  display: flex;
  width: 100%;

  align-items: center;
  &:hover,
  &.active {
    background-color: #f5ebe2;

    color: #954608;
  }
`;
export default function Sidebar() {
  return (
    <Aside>
      <IconContext.Provider
        value={{ size: "1em", style: { marginRight: "0.5em" } }}
      >
        <StyledNavLink to="/home">
          <IoHome />
          <span>Home</span>
        </StyledNavLink>
        <StyledNavLink to="/booking-form/page1">
          <FaCalendarAlt />
          <span>Reservation</span>
        </StyledNavLink>

        <StyledNavLink to="/bookings">
          <FaTableList />
          <span>Bookings</span>
        </StyledNavLink>

        <StyledNavLink to="rooms">
          <MdBedroomParent />
          <span>Rooms</span>
        </StyledNavLink>

        <StyledNavLink to="settings">
          <IoSettings />
          <span>Settings</span>
        </StyledNavLink>
      </IconContext.Provider>
    </Aside>
  );
}
