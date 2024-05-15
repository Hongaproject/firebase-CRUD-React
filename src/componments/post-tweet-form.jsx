import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

function PostTweetForm() {

  const [isLoading, setIsLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file,setFile] = useState(null);

  const onChange = (e) => {
    setTweet(e.target.value);
  };
  
  const onFileChange = (e) => {
    const {files} = e.target;
    if(files && files.length === 1){ // 여러 사진을 올리지 못하게 1개만 올리게 하려고 작성한 코드.
      setFile(files[0]);
    }
  };


    return(
        <Form>
            <TextArea rows={5} maxLength={500} value={tweet} onChange={onChange} placeholder="글을 작성해 주세요."/>
            <AttachFileButton htmlFor="file">{file ? "업로드 ✅"  : "사진 업로드"}</AttachFileButton>
            <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
            <SubmitBtn type="submit" value={isLoading ? "Posting..." : "Post Tweet"} />
        </Form>

    )
}

export default PostTweetForm;