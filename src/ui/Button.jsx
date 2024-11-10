import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  border-radius: 50px;
  border: 2px solid #954608;
  padding: 0.3em 0.7em;
  margin: 0.5em;
  background-color: #f5ebe2;
  transition: all 0.3s;
  color: #6d3101;
  font-weight: 600;
  letter-spacing: 0.5px;

  &:active,
  &:hover {
    background-color: #f3c49a;
  }
`;
export default function Button({ children, onClick, disabled }) {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
