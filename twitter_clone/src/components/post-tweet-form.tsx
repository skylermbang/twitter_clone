import {styled} from "styled-components";
import { useState } from "react";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, updateDoc } from "firebase/firestore";

const Form = styled.form`
    display:flex;
    flex-direction:column;
    gap:10px;

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
const AttachFileButton= styled.label`
  padding: 10px 0px;
  color:yellow;
  text-align:center;
  border-radius:20px;
  border:1px solid ;
  font-size:14px;
  font-weight: 600px;
  cursor:pointer;
   

`;
const AttachFileInput= styled.input`
    display:none;
`;
const SubmitBtn =styled.input`
    padding: 10px 0px;
    background-color:yellow;
    color:black;
    border:none;
    text-align:center;
    border-radius:20px;
    font-size:16px; 
    cursor:pointer;
    &:hover,
    &:active {
      opacity: 0.9;
    }

`;
export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweet === "" || tweet.length > 180) return;
    try {
      setLoading(true);
      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(
          storage,
          `tweets/${user.uid}-${user.displayName}/${doc.id}`
        );
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url,
        });
      }
      setTweet("");
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
    return <Form onSubmit={onSubmit} >
        <TextArea required onChange={onChange} value={tweet} placeholder="What is happening?"/>
        <AttachFileButton htmlFor="file"> {file ? "Photo added ✅" : "Add photo"}</AttachFileButton>
        <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*"/>
        <SubmitBtn  type="submit" value={isLoading ? "Posting..." : "Post Tweet"} />
    </Form>
}