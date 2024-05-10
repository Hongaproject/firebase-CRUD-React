// react-router-dom v6과 다르게 v6.4이후 부터는 createBrowserRouter를 사용해서 라우팅을 한다.

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./componments/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./componments/loading-screen";
import { auth } from "./firebase";

// 객체형 라우터 구성방식
const router = createBrowserRouter([ // 배열로 routes를 전달한다. 이 부분을 하나로 묶기 위해 
  { // 여기 부분은 Layout부분 요소 홈이랑 프로필 부분만 보여지게 할 것 
    path: "/",
    element: <Layout />, // 이렇게 되면 Layout부분에 있는 Outlet밑에 children에 있는 컴포넌트들을 불러올 수 있다.
    children: [ // children을 사용해서 route를 추가해준다. 
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  }
])

const GlobalStyles = createGlobalStyle`
  ${reset}; // styled-reset를 사용하여 기본 스타일을 초기화 시킨다.
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

// RouterProvider은 router라는 필수 속성을 가지고있고 createBrowserRouter로 만든것을 뒤에 붙여주면 됩니다. 
function App() {

  const [isLoding, setIsLoding] = useState(true); // 로딩 화면 만들기, 파이어베이스가 유저 체크하는 동안 잠시 로딩화면 보여주려고 제작
  const init = async() => {
    await auth.authStateReady(); // 로그인 여부를 확인하는 동안 기다린다는 코드.
    setIsLoding(false);
    // setTimeout(()=> setIsLoding(false), 2000); // 확인 용으로 코드 해놈.
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      {
        isLoding ? <LoadingScreen /> : <RouterProvider router={router} /> 
      }
    </Wrapper>
  );
}

export default App;

