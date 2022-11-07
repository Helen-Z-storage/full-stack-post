//import './App.css';
import { useNavigate} from 'react-router-dom';
import React, { useState } from 'react';
import { connect } from "react-redux";
import * as uiActions from "./redux/actions/uiActions";

const tagSpliter = ",";

function SearchPost(props) {
  const {error, setError} = props;

  const [authorIds, setAuthorIds] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [direction, setDirection] = useState("");
  const navigate = useNavigate();
  
  const handleAdding = (event) => {
    if (authorIds) {
      alert("成功search" + " authorIds: " + authorIds
      + " sortBy: " + sortBy
      + " direction: " + direction
      );
      navigate('/home');
      props.dispatch(uiActions.setError(""));
      event.preventDefault();
    } else {
      props.dispatch(uiActions.setError("请输入至少一个searching authorId！"));
    }
  }

  return (
    <div>
    <form onSubmit={(event) => handleAdding(event)}>
      <label>
        Author Ids split by ",", required:
        <input type="text" name="AuthorIds" value={authorIds} 
            onChange={(event) => setAuthorIds(event.target.value)}/>
      </label>
      <label>
        Sort by, optional, default "id", choose from "id", "reads", "likes", "popularity":
        <input type="text" name="SortBy" value={sortBy} 
            onChange={(event) => setSortBy(event.target.value)}/>
      </label>
      <label>
        Direction, optional, default "asc", choose from "asc", "desc":
        <input type="text" name="Direction" value={direction} 
            onChange={(event) => setDirection(event.target.value)}/>
      </label>
      <input type="submit" value="Submit" />
    </form>
          <button key={1} onClick={() => {navigate('/home'); 
                props.dispatch(uiActions.setError(""));}}>Back</button>
          <div>{props.ui.get("error")}</div>
    </div>
  );
}

export default connect ((state) => {return {ui:state.ui}})(SearchPost);
