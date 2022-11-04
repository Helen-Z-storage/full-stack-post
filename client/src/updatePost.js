//import './App.css';
import { useNavigate} from 'react-router-dom';
import React, { useState } from 'react';
const tagSpliter = ",";

function UpdatePost() {
    
  const [authorIds, setAuthorIds] = useState([]);
  const [tags, setTags] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleUpdating = (event) => {
    if (authorIds || tags || text) {
      alert("成功update" + " authorIds: " + JSON.stringify(authorIds)
                        + " tags: " + JSON.stringify(tags)
                        + " text: " + text
      );
      navigate('/home');
      event.preventDefault();
    } else {
      setError("请输入至少一个更新内容！");
    }
  }

  return (
    <div>
    <form onSubmit={(event) => handleUpdating(event)}>
      <label>
        Author Ids split by ",", optional:
        <input type="text" name="AuthorIds" value={authorIds} 
            onChange={(event) => setAuthorIds(event.target.value.split(tagSpliter))}/>
      </label>
      <label>
        Post Text, optional:
        <input type="text" name="Text" value={text} 
            onChange={(event) => setText(event.target.value)}/>
      </label>
      <label>
        Post Tags split by ",", optional:
        <input type="text" name="Tags" value={tags} 
            onChange={(event) => setTags(event.target.value.split(tagSpliter))}/>
      </label>
      <input type="submit" value="Submit" />
    </form>
          <button key={1} onClick={() => navigate('/home')}>Back</button>
          <div>{error}</div>
    </div>
  );
}

export default UpdatePost;
