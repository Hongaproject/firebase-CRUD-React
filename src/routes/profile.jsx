import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import Tweet from "../componments/tweet";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;
const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 50%;
  background-color: #1d9bf0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 50px;
  }
`;

const AvatarImg = styled.img`
  width: 100%;
`;
const AvatarInput = styled.input`
  display: none;
`;
const Name = styled.span`
  font-size: 22px;
`;
const Tweets = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

const EditNameContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const NameChangeInput = styled.input`
  padding: 10px;
  font-size: 16px;
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
   cursor: pointer;
 `;

function Profile() {
    const user = auth.currentUser;
    const [avatar, setAvatar] = useState(user?.photoURL); // 로그인 유저가 이미지를 가지고 있는지 확인하는 용도
    const [tweets, setTweets] = useState([]);
    const [name, setName] = useState(user?.displayName || "");
    const [editingNameMod, setEditingNameMod] = useState(false);
    const [nameLoading, setNameLoading] = useState(false);
    const onAvatarChange = async(e) => {
        const {files} = e.target;
        if(!user) return;
        if(files && files.length === 1) { // 트윗 업로드 하는거랑 똑같음. 
            const file = files[0];
            const locationRef = ref(storage, `avatars/${user?.uid}`) // avatars라는 폴더에 유저 ID로 사진을 업로드 하려고 하는 중.
            const result = await uploadBytes(locationRef, file);
            const avatarUrl = await getDownloadURL(result.ref);
            setAvatar(avatarUrl);
            await updateProfile(user, {
                photoURL: avatarUrl,
            })
        }
    }
    const fetchTweets = async() => { // 현재 로그인 한 사용자 쓴 tweets 확인
      const tweetQuery = query(
        collection(db, "tweets"),
        where("userId", "==", user?.uid),
        orderBy("createdAT", "desc"),
        limit(15)
      );
      const snapshot = await getDocs(tweetQuery);
      const tweets = snapshot.docs.map((doc) => {
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

    const handleNameChange = (event) =>
      setName(event.target.value);

    const toggleEditName = () => setEditingNameMod(!editingNameMod);

    const updateName = async () => {
      if (nameLoading || !user) return;
      try {
        setNameLoading(true);
        await updateProfile(user, {
          displayName: name,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setNameLoading(false);
        setEditingNameMod(false);
      }
      
    };

    return(
        <Wrapper>
            프로필 입니다.
            <AvatarUpload htmlFor="avatar">
                {avatar ? (
                    <AvatarImg src={avatar} />
                    ) : (
                    <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                    </svg>
                )}
            </AvatarUpload>
            <AvatarInput id="avatar" type="file" accept="image/*" onChange={onAvatarChange} />
            <Name>{user?.displayName ? user.displayName : "Anonymous"}</Name>
              {editingNameMod ? (
                <EditNameContainer>
                  <NameChangeInput
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={handleNameChange}
                  />
                  <Button onClick={updateName}>{nameLoading ? "Loading..." : "Update" }</Button>
                  <Button onClick={toggleEditName}>Cancle</Button>
                </EditNameContainer>
              ) : (
                <Button onClick={toggleEditName}>Change Name</Button>
              )}
            <Tweets>
              {tweets.map((tweet) => (<Tweet key={tweet.id} {...tweet}/> ))}
            </Tweets>
        </Wrapper>
    );
}

export default Profile;




