import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
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
            orderBy("createdAT", "desc")
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
            setTweets(tweets);
        });
        // 이 함수는 데이터베이스 및 쿼리와 실시간 연결을 하고 새 요소가 생성, 삭제, 업데이트 시에 알려준다.
        // await onSnapshot(tweetsQuery, (snapShot) => {
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

    return(
        <Wrapper>
            {tweets.map((tweet) => <Tweet key={tweet.id} {...tweet} />)}
        </Wrapper>
    )
}

export default TimeLine;



