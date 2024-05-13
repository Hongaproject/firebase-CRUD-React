import styled from "styled-components";

const Button = styled.span`
  margin-top: 50px;
  background-color: white;
  font-weight: 500;
  width: 100%;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 25px;
`;

function GithubBtn () {

    const onClick = () => {

    }

    return(
        <Button onClick={onClick}>
            <Logo src="/github-logo.svg"/>
            Continue With Github 
        </Button>
    );
}

export default GithubBtn;