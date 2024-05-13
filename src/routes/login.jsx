import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
    justify-content: center;
`;

const Title = styled.h1`
    font-size: 42px;    
`;

const Form = styled.form`
    margin-top: 50px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

const Input = styled.input`
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    width: 100%;
    font-size: 16px;

    &[type="submit"] {
    cursor: pointer;
        &:hover {
        opacity: 0.8;
        }
    }
`;

const Error = styled.span`
    font-weight: 600;
    color: tomato;
`;

function Login() {
    
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const navigator = useNavigate();

    const onChange = (e) => { // 이렇게 하면 input이 변경 되었을 때 어떤 input이 변경되었는지 찾을 수 있다.
        const {target: {name, value}} = e;
        if(name === "email") {
            setEmail(value)
        }else if(name === "password") {
            setPassword(value)
        }
    }

    const onSubmit = async(e) => { 
        e.preventDefault();
        setErr(""); // 에러메세지가 뜬 상태로 클릭하면 초기화 되서 다시 렌더링 되게 해줌. 
        if(isLoading || email === "" || password === "") return; // 이름, 이메일, 비밀번호가 비어있는지 확인하는 용도
        try{
            setLoading(true);
            navigator("/");
        } catch(e){
            if(e instanceof FirebaseError){
                setErr(e.message);
            }
        } finally{
            setLoading(false);
        }
    }

    return(
        <Wrapper>
            <Title>Login 🙌</Title>
            <Form onSubmit={onSubmit}>
                <Input name="email" value={email} onChange={onChange} placeholder="Email" type="email" required />
                <Input name="password" value={password} onChange={onChange} placeholder="Password 6자리 이상" type="password" required />
                <Input type="submit" value={isLoading ? "Loding..." : "Login"} />
            </Form>
            {err !== "" ? <Error>{err}</Error> : null}
        </Wrapper>
    );
}

export default Login;

