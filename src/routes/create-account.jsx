import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Wrapper, Form, Title, Input, Error, Switcher } from "../componments/auth-components";


function CreateAccount() {
    
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const navigator = useNavigate();

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

    const onSubmit = async(e) => { 
        e.preventDefault();
        setErr(""); // 에러메세지가 뜬 상태로 클릭하면 초기화 되서 다시 렌더링 되게 해줌. 
        if(isLoading || name === "" || email === "" || password === "") return; // 이름, 이메일, 비밀번호가 비어있는지 확인하는 용도
        try{
            setLoading(true);
            const credentials = await createUserWithEmailAndPassword(auth, email, password); // email과 password를 이용해서 사용자 생성을 해준다. 
            await updateProfile(credentials.user, { // 닉네임 수정을 가능하게 해준다.
                displayName: name,
            });
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
            <Title>Join 🙌</Title>
            <Form onSubmit={onSubmit}>
                <Input name="name" value={name} onChange={onChange} placeholder="Name" type="text" required />
                <Input name="email" value={email} onChange={onChange} placeholder="Email" type="email" required />
                <Input name="password" value={password} onChange={onChange} placeholder="Password 6자리 이상" type="password" required />
                <Input type="submit" value={isLoading ? "Loding..." : "Create Account"} />
            </Form>
            {err !== "" ? <Error>{err}</Error> : null}
            <Switcher>
                Already have an account? <Link to='/login'>Login</Link>
            </Switcher>
        </Wrapper>
    );
}

export default CreateAccount;

