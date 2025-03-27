import styled from "styled-components";
import { useRef } from "react";
import Button from "./Button";

const SettingsContainer = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f5ebe2;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  color: #954608;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

export default function Settings() {
  const password = useRef('');
  const newUsername = useRef('');
  const newPassword = useRef('');
  
  function changePassword(){

  }
  return (
    <SettingsContainer>
      <SectionTitle>Change password</SectionTitle>
      <Form>
        <Label htmlFor="password">New password</Label>
        <Input type="password" id="password" name="password" ref={password} required/>
        <Button onClick={changePassword}>Enter</Button>
      </Form>

      <SectionTitle>Create a new user</SectionTitle>
      <Form>
        <Label htmlFor="newUsername">Username</Label>
        <Input type="text" id="newUsername" name="newUsername" ref={newUsername} required/>
        
        <Label htmlFor="newPassword">Password</Label>
        <Input type="password" id="newPassword" name="newPassword" ref={newPassword} required/>
        <Button onClick={changePassword}>Enter</Button>
      </Form>
    </SettingsContainer>
  );
}
 