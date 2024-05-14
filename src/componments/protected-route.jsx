import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

// 로그인한 유저가 볼 수 있는 페이지.
function ProtectedRoute({children}){
    
    // ProtectedRoute 컴포넌트에서 기본값을 login으로 해놔서 로그인 페이지로 보여진다.
    
    const user = auth.currentUser; // 로그인했는지 여부를 알려준다. 
    if(user === null){ // 유저가 null -> 로그인을 하지 않았다면 로그인 페이지로 보내준다.
        return <Navigate to="/login" />
    }

    // 로그인을 했다면 children을 보여준다. Home과 Profile부분을 확인할 수 있다.
    return children
}

export default ProtectedRoute;