import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div``;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const Button = styled.button`
   background-color: tomato;
   color: white;
   font-weight: 600;
   border: 0;
   font-size: 12px;
   padding: 5px 10px;
   text-transform: uppercase;
   border-radius: 5px;
   margin-right: 5px;
   cursor: pointer;
 `;

 const SaveButton = styled(Button)`
   background-color: #1d9bf0;
 `;

function Tweet ({username, tweet, photo, userId, id}) {

    const user = auth.currentUser; // 유저를 체크해 줌.
    const [isEditMod, setEdittingMod] = useState(false);
    const [editedTweet, setEditedTweet] = useState(tweet);

    const onDelete = async() => {
      const ok = window.confirm("삭제 하시겠습니까?")
      if(!ok || user?.uid !== userId) return;
      try {
        await deleteDoc(doc(db, "tweets", id)) // 삭제를 하고 싶으면 deleteDoc를 사용해서 문서를 찾고 tweets컬렉션에 있는 id를 확인해서 삭제를 진행한다.
        if(photo){
          const photoRef = ref(storage, `tweets/${user.uid}/${id}`); // 트윗에 올라온 사진 경로를 찾는 코드
          await deleteObject(photoRef); 
        }
      } catch (error) {
        console.log(error);
      } finally {

      }
    }

    // 누르면 수정 모드로 바뀜
   const onEdit = async () => {
    if (user?.uid !== userId) return;
    setEdittingMod(true);
    };
    // 누르면 수정모드 취소
    const onCancel = async () => {
      setEdittingMod(false);
    };
    // 누르면 트윗이 업데이트 됨
    const onSave = async () => {
      // 유저가 맞는지 먼저 확이
      if (user?.uid !== userId) return;
      try {
        // 유저 아이디가 일치하는 선에서 먼저 문서 레퍼런스를 불러옴
        const docRef = doc(db, "tweets", id);
        // 삭제 후 생성하려 했으나 업데이트라는 좋은 함수가 있음
        await updateDoc(docRef, { tweet: editedTweet });
        // 수정을 마친 뒤엔 수정모드를 끔
        setEdittingMod(false);
      } catch (e) {
        console.log(e);
      }
    };
    

    return(
          <Wrapper>
            <Column>
              <Username>{username}</Username>
              <Payload>
                {isEditMod ? (
                  <>
                    <input
                      type="text"
                      // useState를 사용해 실시간으로 값을 변화시킴
                      value={editedTweet}
                      // 체인지 이벤트가 useState에 변화된 내용을 전달
                      onChange={(e) => setEditedTweet(e.target.value)}
                    ></input>
                  </>
                ) : (
                  <>{tweet}</>
                )}
              </Payload>
                {user?.uid === userId ? (
                  <>
                    <Button onClick={onDelete}>Delete</Button>
                    {isEditMod ? (
                      <>
                        <Button onClick={onCancel}>Cancel</Button>
                        <SaveButton onClick={onSave}>Save</SaveButton>
                      </>
                    ) : (
                      <Button onClick={onEdit}>Edit</Button>
                    )}
                  </>
                ) : null}
              </Column>
              <Column>
                {photo ? (
                  <Photo src={photo} />
                ) : null}
              </Column>
          </Wrapper> 
    );
}

export default Tweet;







