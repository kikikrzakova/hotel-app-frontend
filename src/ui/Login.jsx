import styled from 'styled-components';
import Button from './Button';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center vertically */
  height: 100vh; /* Full viewport height */
  background-color: #f5ebe2;
  color: #954608;
`;

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const StyledHeader = styled.h1`
  font-family: sans;
  font-size: 2.5em;
  letter-spacing: 0.4em
`

const StyledLabel = styled.label`
  letter-spacing: 2px;
  font-size: 18px;
  margin-right: 10px;
`

const StyledInput = styled.input`
  font-size: 16px;
  padding: 1px 10px;
  border-radius: 50px;
  border: 2px solid #954608;
  color: #954608;
  outline: none;
`
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledP = styled.p`
  color: red;
  font-size: 15px;
  margin: 10px;
  font-weight: 500;
  letter-spacing: 1px;
`

export default function Login({setIsAuthenticated}) {
  const username = useRef('');
  const password = useRef('');
  const [error, setError] = useState();
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    try {
      if (!username.current.value || !password.current.value){
        setError('Please fill in all fields');
        
      } else {

        const response = await fetch('http://localhost:3000/users', {
          //we're using POST because we're sending data to the server
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username.current.value,
            password: password.current.value
          })
        })
        
        const data = await response.json();
        if (data.status !== 'success') {
          setError(data.message);
        } else {
          setIsAuthenticated(true); 
          navigate('/');

        }
      }
    } catch (error){
      setError(error.message);
    }

  }

  return (
    <StyledContainer>
      <StyledHeader>LOGIN</StyledHeader>
      <StyledForm onSubmit={handleSubmit}>
        <StyledFormRow>
          <StyledLabel htmlFor="username" name="username" >Username</StyledLabel>
          <StyledInput type="text" id="username" ref={username} autoFocus/>
        </StyledFormRow>
        <StyledFormRow>
          <StyledLabel htmlFor="password" name="password">Password</StyledLabel>
          <StyledInput type="password" id="password" ref={password} />
        </StyledFormRow>
        {error && <StyledP>{error}</StyledP>}
        <Button type="submit">Enter</Button>
      </StyledForm>
    </StyledContainer>
  );
}

Login.propTypes = {
  setIsAuthenticated: PropTypes.func
}