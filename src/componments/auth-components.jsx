import styled from "styled-components";

// 로그인과 회원가입 부분 스타일이 똑같아서 한 개의 파일에서 스타일을 묶어놓고 그걸 가져다가 쓰게 만들려고함.
// 이렇게하면 한 파일에서 수정을 해도 로그인과 회원가입 부분이 동시에 적용이 되기 때문에 좋다.

export const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
    justify-content: center;
`;

export const Title = styled.h1`
    font-size: 42px;    
`;

export const Form = styled.form`
    margin-top: 50px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

export const Input = styled.input`
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

export const Error = styled.span`
    font-weight: 600;
    color: tomato;
`;

export const Switcher = styled.span`
    margin-top: 20px;
    a {
        color: #1d9bf0;
    }
`