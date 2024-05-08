// react-router-dom v6과 다르게 v6.4이후 부터는 createBrowserRouter를 사용해서 라우팅을 한다.

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./componments/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";

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

// RouterProvider은 router라는 필수 속성을 가지고있고 createBrowserRouter로 만든것을 뒤에 붙여주면 됩니다. 
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
