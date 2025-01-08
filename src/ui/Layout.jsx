import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  grid-template-rows: auto;
`;
export default function Layout() {
  return (
    <StyledLayout>
      <Header />
      <Sidebar />
      <Outlet />
    </StyledLayout>
  );
}
