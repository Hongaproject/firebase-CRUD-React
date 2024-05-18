import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

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

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;
 
function Tweet ({username, tweet, photo, userId, id}) {

    const user = auth.currentUser; // 유저를 체크해 줌.
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

    return(
        <Wrapper>
            <Column>
                <Username>{username}</Username>
                <Payload>{tweet}</Payload>
                {user?.uid === userId ? <DeleteButton onClick={onDelete}>Delete</DeleteButton> : null}
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




