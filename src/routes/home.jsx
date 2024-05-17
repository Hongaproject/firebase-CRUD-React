import styled from "styled-components";
import PostTweetForm from "../componments/post-tweet-form";
import TimeLine from "../componments/timeline";

const Wrapper = styled.div`
    display: grid;
    gap: 50px;
    overflow-y: scroll;
    grid-template-rows: 1fr 5fr;
`

function Home() {

    return(
        <Wrapper>
            <PostTweetForm />
            <TimeLine />
        </Wrapper>
    );
}

export default Home;