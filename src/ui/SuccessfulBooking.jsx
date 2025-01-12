import styled from 'styled-components';

const StyledContainer = styled.div`
    margin: auto auto;
    // background-color: #f5ebe2;
    padding: 20px;
    border-radius: 10px;
`

const StyledH2 = styled.h2`
    text-align: center;
    color:  #954608;
    margin: auto 10px;
`


export default function SuccessfulBooking(){
    return (
        <StyledContainer>

            <StyledH2><em>You have successfully booked rooms</em></StyledH2>
        </StyledContainer>
    )
}