import { collection, getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";

const Wrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
`

function TimeLine () {
    const [tweets, setTweets] = useState([]);
    const fetchTweets = async() => {
        const tweetsQuery = query( // query를 생성하는 부분. 
            collection(db, "tweets"),
            orderBy("createdAT", "desc"),
            limit(15) // 처음에 15개의 글만 보여주도록 설정한다.
        );
        const spanshot = await getDocs(tweetsQuery); // 생성된 query에 해당하는 문서를 가지고온다. 
        const tweets = spanshot.docs.map((doc) => {
            const {tweet, createdAT, userId, username, photo} = doc.data();
            return{
                tweet,
                createdAT,
                userId,
                username,
                photo,
                id: doc.id,
            };
        });
        setTweets(tweets);

        // 이 함수는 데이터베이스 및 쿼리와 실시간 연결을 하고 새 요소가 생성, 삭제, 업데이트 시에 알려준다.
        // const unsubscribe = await onSnapshot(tweetsQuery, (snapShot) => { // 이 함수는 계속 데이터베이스를 읽기 때문에 무료 버전서는 사용시에 요금을 내야한다.
        //     const tweets = snapShot.docs.map((doc) => {
        //         const {tweet, createdAT, userId, username, photo} = doc.data();
        //         return{
        //             tweet,
        //             createdAT,
        //             userId,
        //             username,
        //             photo,
        //             id: doc.id,
        //         };
        //     });
        //     setTweets(tweets);
        // })
        
    }

    useEffect(() => {
        fetchTweets();
    }, []);

    // useEffect(() => {
    //     let unsubscribe : Unsubscribe | null = null;
    //     const fetchTweets = async() => {
    //         const tweetsQuery = query( // query를 생성하는 부분. 
    //             collection(db, "tweets"),
    //             orderBy("createdAT", "desc")
    //         );
    //         // const spanshot = await getDocs(tweetsQuery); // 생성된 query에 해당하는 문서를 가지고온다. 
    //         // const tweets = spanshot.docs.map((doc) => {
    //         //     const {tweet, createdAT, userId, username, photo} = doc.data();
    //         //     return{
    //         //         tweet,
    //         //         createdAT,
    //         //         userId,
    //         //         username,
    //         //         photo,
    //         //         id: doc.id,
    //         //     };
    //         // });
    //         // setTweets(tweets);
    //         // 이 함수는 데이터베이스 및 쿼리와 실시간 연결을 하고 새 요소가 생성, 삭제, 업데이트 시에 알려준다.
    //         // unsubscribe = await onSnapshot(tweetsQuery, (snapShot) => { // 이 함수는 계속 데이터베이스를 읽기 때문에 무료 버전서는 사용시에 요금을 내야한다.
    //         //     const tweets = snapShot.docs.map((doc) => {
    //         //         const {tweet, createdAT, userId, username, photo} = doc.data();
    //         //         return{
    //         //             tweet,
    //         //             createdAT,
    //         //             userId, 
    //         //             username,
    //         //             photo,
    //         //             id: doc.id,
    //         //         };
    //         //     });
    //         //     setTweets(tweets);
    //         // })
            
    //     }
    //     fetchTweets();
    //     return () => {
    //       unsubscribe && unsubscribe(); // useEffect에서 값을 반환할 때, unsubscribe함수를 부른다. null이 아니라면 unsubscribe부른다. -> useEffect훅의 tear down 혹은 cleanup기능을 사용하는 것이다.
    //       // 유저가 홈화면 트윗이 있는 화면을 보지 않을 때 값을 반환해서 cleanup을 실시한다. -> 언 마운트시, 즉 컴포넌트를 안 볼때
    //       // 유저가 홈화면 트윗이 있는 화면말고 프로필 화면을 보면 cleanup이 실행된다. 
    // }
    // }, []);

    return(
        <Wrapper>
            {tweets.map((tweet) => <Tweet key={tweet.id} {...tweet} />)}
        </Wrapper>
    )
}

export default TimeLine;



