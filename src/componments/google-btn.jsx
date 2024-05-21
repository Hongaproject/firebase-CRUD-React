import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
  margin-top: 10px;
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

function GoogleBtn () {

    const navigator = useNavigate();
    const onClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider); // 버튼 클릭시 팝업이 열리면서 로그인여부를 물어본다.
            navigator("/");
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <Button onClick={onClick}>
            <Logo src="/google-logo.svg"/>
            Continue With GooGle 
        </Button>
    );
}

export default GoogleBtn;

