import { styled } from "styled-components";
import { ITweet } from "./timeline";
import { useState } from "react";

import { auth, db, storage } from "../firebase";
import { updateDoc,deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const DeleteBtn = styled.button`
    background-color: transparent;  
    color: white;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 10px;
    text-transform: uppercase;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: tomato;
    }
`;

const EditBtn= styled.button`
    background-color: transparent;
    color:white;
    font-weight;600px;
    border:0;
    font-size:12px;
    padding:5px 10px;
    text-transform: uppercase;
    border-radius:5px;
    cursor:pointer;

    &:hover {
      background-color: green;
  }

`

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

const TextArea =styled.textarea`
    rows={5};
    maxLength={180};
    border:2px solid white;
    padding: 20px;
    border-radius: 20px;
    font-size 16px;
    color:white;
    background-color:black;
    width:100%;
    resize:none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color:yellow;
  }


`



export default function Tweet({username,photo,tweet,userId,id}:ITweet){
    const user = auth.currentUser;
    const [editStatus, setEditStatus] = useState(false);
    const [newTweet, setNewTweet] = useState(tweet);

    const onDelete = async () => {
      const ok = confirm("Are you sure you want to delete this tweet?");
      if (!ok || user?.uid !== userId) return;
      try {
        await deleteDoc(doc(db, "tweets", id));
        if (photo) {
          const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
          await deleteObject(photoRef);
        }
      } catch (e) {
        console.log(e);
      } finally {
        //
      }
    };

    const onEdit = async () => {
    
      
      const ok = confirm("Are you sure you want to edit this tweet?");
      if (!ok ) return;
      if (user?.uid !== userId) {
        alert("You are not authorized to edit this tweet.");
        return; // Stop the function if the user is not authorized
      }
      try {
        await updateDoc(doc(db, "tweets", id), { tweet: newTweet });  // Update with newTweet
        // Photo handling logic...
      } catch (e) {
        console.error(e);
      }finally{
        setEditStatus(false); // Reset the editing status to close the textarea
      }
    };

    const onChangeStatus = () => {
      setEditStatus(true);  // Toggle edit status to enable editing
    };

    const onSave = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNewTweet(e.target.value);
    };
    return(  
    <Wrapper>

        <Column>

        <Username>User :{username}</Username>
        {editStatus ? (
                    <TextArea value={newTweet} onChange={onSave} />
                ) : (
                    <Payload>{tweet}</Payload>
                )}  
        {user?.uid === userId?  <DeleteBtn onClick={onDelete}>Delete</DeleteBtn> : null}
        {user?.uid === userId && (
          editStatus ? (
                    <EditBtn onClick={onEdit}>Save</EditBtn>
                ) : (
                    <EditBtn onClick={onChangeStatus}>Edit</EditBtn>
                )
            )}
        
        </Column>
        {photo ? (
        <Column>
          <Photo src={photo} />
        </Column>
      ) : null}
   

       
    </Wrapper>)
      

    
}