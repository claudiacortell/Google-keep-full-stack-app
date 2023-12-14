import React from "react";
import ReactDOM from "react-dom";

function Note(props) {
  function handleDeletion() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1> {props.title} </h1>
      <p> {props.content} </p>
      <button onClick={handleDeletion}>-</button>
    </div>
  );
}

export default Note;
