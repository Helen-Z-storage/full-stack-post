//import './App.css';
import { useNavigate} from 'react-router-dom';
import React, { useState } from 'react';

function AddPost() {
    
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleAdding = () => {
    if (text) {
      alert("成功add" + " tags: " + JSON.stringify(tags)
      + " text: " + text);
      navigate('/home');
      //event.preventDefault();
    } else {
      setError("请输入post的内容！");
    }
  }

  return (
    <div>
    <form onSubmit={() => handleAdding()}>
      <label>
        Post Text, required:
        <input type="text" name="Text" value={text} 
            onChange={(event) => setText(event.target.value)}/>
      </label>
      <label>
        Post Tags split by ",", optional:
        <input type="text" name="Tags" value={tags} 
            onChange={(event) => setTags(event.target.value)}/>
      </label>
      <input type="submit" value="Submit" />
    </form>
          <button key={1} onClick={() => navigate('/home')}>Back</button>
          <div>{error}</div>
    </div>
  );
}

export default AddPost;
