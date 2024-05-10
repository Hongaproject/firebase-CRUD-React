import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    
`;

const Form = styled.form`
    
`;

const Input = styled.input`
    
`;

function CreateAccount() {
    
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
        console.log(name, email, password);
    }

    return(
        <Wrapper>
            <Form onSubmit={onSubmit}>
                <Input name="name" value={name} onChange={onChange} placeholder="Name" type="text" required />
                <Input name="email" value={email} onChange={onChange} placeholder="Email" type="email" required />
                <Input name="password" value={password} onChange={onChange} placeholder="Password" type="password" required />
                <Input type="submit" value="Create Account" />
            </Form>
        </Wrapper>
    );
}

export default CreateAccount;

