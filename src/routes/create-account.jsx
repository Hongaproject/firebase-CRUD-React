import { useState } from "react";
import styled from "styled-components";

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

function CreateAccount() {
    
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    const onChange = (e) => { // 이렇게 하면 input이 변경 되었을 때 어떤 input이 변경되었는지 찾을 수 있다.
        const {target: {name, value}} = e;
        if(name === "name"){ // 뭔지를 아니까 state의 값을 set에 넣어줄수있다.
            setName(value)
        }else if(name === "email") {
            setEmail(value)
        }else if(name === "password") {
            setPassword(value)
        }
    }

    const onSubmit = (e) => { 
        e.preventDefault();
        try{

        } catch(e){

        } finally{
            setLoading(false);
        }
    }

    return(
        <Wrapper>
            <Title>Log into 🙌</Title>
            <Form onSubmit={onSubmit}>
                <Input name="name" value={name} onChange={onChange} placeholder="Name" type="text" required />
                <Input name="email" value={email} onChange={onChange} placeholder="Email" type="email" required />
                <Input name="password" value={password} onChange={onChange} placeholder="Password" type="password" required />
                <Input type="submit" value={isLoading ? "Loding..." : "Create Account"} />
            </Form>
            {err !== "" ? <Error>{err}</Error> : null}
        </Wrapper>
    );
}

export default CreateAccount;

