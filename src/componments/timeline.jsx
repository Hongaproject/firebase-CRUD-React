import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";

const Wrapper = styled.div`
    
`

function TimeLine () {
    const [tweets, setTweets] = useState([]);
    const fetchTweets = async() => {
        const tweetsQuery = query(
            collection(db, "tweets"),
            orderBy("createdAT", "desc")
        );
        const spanshot = await getDocs(tweetsQuery);
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



