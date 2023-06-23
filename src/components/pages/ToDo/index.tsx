import { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ApplicationState } from "../../../store";
import {
  State as ToDoState,
  IActionCreators,
  actionCreators,
} from "../../../store/ToDo";

type InnerProps = ToDoState & IActionCreators;

function ToDo({ toDos, addNote, updateNote, removeNote }: InnerProps) {
  const [additionalText, setAdditionalText] = useState("");
  const [updatableText, setUpdatableText] = useState("");
  const [updatableId, setUpdatableId] = useState("");

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Note</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {toDos.map((item) => (
            <tr key={`row${item.id}`}>
              <td>{item.id}</td>
              <td>{item.note}</td>
              <td>
                <button
                  onClick={() => {
                    removeNote(item.id);
                    setUpdatableId("");
                  }}
                  type="button"
                  className="btn text-danger"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="row">
        <div className="col-10">
          <div className="form-group">
            <input
              type="text"
              placeholder="Please input a note to add."
              className="form-control"
              value={additionalText}
              onChange={(e) => setAdditionalText(e.target.value)}
            />
          </div>
        </div>
        <div className="col-2">
          <button
            onClick={() => {
              addNote(additionalText);
              setAdditionalText("");
            }}
            type="button"
            className="btn btn-primary"
          >
            Add note
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <div className="form-group">
            <select
              value={updatableId}
              onChange={(e) => setUpdatableId(e.target.value)}
              className="form-control"
            >
              <option disabled value="">
                Note No.
              </option>
              {toDos.map((item) => (
                <option key={`id${item.id}`}>{item.id}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-8">
          <div className="form-group">
            <input
              type="text"
              placeholder="Please input a note to update."
              className="form-control"
              value={updatableText}
              onChange={(e) => setUpdatableText(e.target.value)}
            />
          </div>
        </div>
        <div className="col-2">
          <button
            onClick={() => {
              if (updatableId == null) {
                return;
              }
              const id = Number(updatableId);
              if (isNaN(id)) {
                return;
              }
              updateNote({ id, note: updatableText });
              setUpdatableText("");
            }}
            type="button"
            className="btn btn-primary"
          >
            Update note
          </button>
        </div>
      </div>
    </div>
  );
}

export default connect(
  (state: ApplicationState): ToDoState => {
    return {
      ...state.toDo,
    };
  },
  (dispatch) => {
    return {
      ...bindActionCreators(actionCreators, dispatch),
    };
  }
)(ToDo);
