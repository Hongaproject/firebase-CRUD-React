import { auth } from "../firebase";

function Home() {

    const logOut = () => {
        auth.signOut();
    }

    return(
        <div>
            홈 입니다.
            <button onClick={logOut}>로그아웃</button>
        </div>
    );
}

export default Home;