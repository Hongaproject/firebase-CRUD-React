import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Wrapper, Form, Title, Input, Error, Switcher } from "../componments/auth-components";
import GithubBtn from "../componments/github-btn";


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
            await signInWithEmailAndPassword(auth, email, password); // 이메일과 비밀번호가 다르다면 오류가 나타 난다.
            navigator("/"); // 로그인이 된 상태니까 Home화면이 보여야 한다.
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
            <Switcher>
                Don't have an account? <Link to='/create-account'>Create</Link>
            </Switcher>
            <GithubBtn />
        </Wrapper>
    );
}

export default Login;

