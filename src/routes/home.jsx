import styled from "styled-components";
import PostTweetForm from "../componments/post-tweet-form";

const Wrapper = styled.div`
    
`

function Home() {

    return(
        <Wrapper>
            <PostTweetForm />
        </Wrapper>
    );
}

export default Home;