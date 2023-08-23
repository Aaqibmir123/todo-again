import React, { useRef, useState } from "react";
import "./Form.css";

function Form() {
  const nameRef = useRef();
  const [data, setData] = useState([]);
  const [editedTask, setEditedTask] = useState({ index: -1, text: "" }); // State to hold the edited task text and index

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredUserName = nameRef.current.value;
    setData([...data, enteredUserName]);
    nameRef.current.value = "";
  };
  const handleEditSave = (index, task) => {
    if (index === editedTask.index) {
      // If the Save button is clicked
      // Implement task update logic here using the editedTask.text
      // Update the task at the specified index with the new editedTask.text
      const updatedData = [...data];
      updatedData[index] = editedTask.text;
      setData(updatedData);
      setEditedTask({ index: -1, text: "" }); // Clear the editedTask state
    } else {
      // If the Edit button is clicked
      setEditedTask({ index, text: task }); // Set the task index and text
    }
  };

  const DeleteHandler = (index) => {
    const filterData = data.filter((_, i) => i !== index);
    setData(filterData);
  };

  return (
    <div className="container">
      <h1 className="title">To-Do List</h1>
      <div className="todo-form">
        <input
          className="task-input"
          type="text"
          placeholder="Enter a new task"
          ref={nameRef}
        />
        <button className="add-button" onClick={submitHandler}>
          Add
        </button>
      </div>
      <ul className="task-list">
        {data.map((user, index) => (
          <li className="task-item" key={index}>
            {index === editedTask.index ? (
              <>
                <input
                  className="edit-input"
                  type="text"
                  value={editedTask.text}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, text: e.target.value })
                  }
                />
                <button
                  className="save-button"
                  onClick={() => handleEditSave(index)}>
                  Save
                </button>
              </>
            ) : (
              <>
                {user}
                <button
                  className="delete-button"
                  onClick={() => DeleteHandler(index)}>
                  Delete
                </button>
                <button
                  className="edit-button"
                  onClick={() => handleEditSave(index, user)}>
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Form;
