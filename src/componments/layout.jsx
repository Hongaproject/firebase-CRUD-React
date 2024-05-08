import { Outlet } from "react-router-dom";

// Outlet은 react-router-dom v6.4에 등장 했으며 중첩 라우팅을 지원해준다.
// App파일 부분에 createBrowserRouter를 사용하여 라우터를 생성했는데 Outlet을 사용하면
// 생성한 라우터를 Outlet를 사용해서 하위 컴포넌트를 불러올 수 있다. children느낌이라고 생각하면 편하다.

function Layout(){
    return(
        <div>
            <h2>레이아웃 부분</h2>
            <Outlet />
        </div>
    )
}

export default Layout;