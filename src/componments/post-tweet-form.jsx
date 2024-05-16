import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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

  const onSubmit = async(e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if(!user || isLoading || tweet === "" || tweet.length > 180) return; // 로딩 중인지, 트윗이 비었는지, 트윗길이가 500자 보다 많은지 확인 용으로 코드를 짬. 로그인 여부도 확인한다.
    try {
      setIsLoading(true);
      const doc = await addDoc(collection(db, "tweets"), { // 이미 만들어진 tweets라는 컬렉션안에 파이어베이스 내장함수addDoc를 사용해서 새로운 document를 생성해준다. -> database에 document가 있는데 그 부분을 생성시켜주는 코드
        tweet, // 작성한 내용.
        createdAT: Date.now(), // 생성을 언제했는지 확인하기 위해 만듬.
        username: user.displayName || "Anonymous", // displayName이 없다면 익명으로 보여준다.
        userId: user.uid, // 트윗이 내껀지 확인하기 및 삭제 하기 위해 만든 코드.
      });
      if(file){ // 이미지 첨부시 이 경로로 저장이된다. 
        const locationRef = ref(storage, `tweets/${user.uid}-${user.displayName}/${doc.id}`); //  tweet 폴더를 생성하고 / 유저 아이디 - 유저 이름 / 문서 id
        const result = await uploadBytes(locationRef, file); // locationRef에 넣는다. 
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url,
        });
      }
      setTweet("");
      setFile(null);
    } catch (err) { 
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

    return(
        <Form onSubmit={onSubmit}>
            <TextArea rows={5} maxLength={500} value={tweet} onChange={onChange} placeholder="글을 작성해 주세요." required/>
            <AttachFileButton htmlFor="file">{file ? "업로드 ✅"  : "사진 업로드"}</AttachFileButton>
            <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
            <SubmitBtn type="submit" value={isLoading ? "Posting..." : "Post Tweet"} />
        </Form>

    )
}

export default PostTweetForm;