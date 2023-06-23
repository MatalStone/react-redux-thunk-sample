import { useState } from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../../../store";
import {
  State as CalendarState,
  IActionCreators,
  actionCreators,
} from "../../../../store/Calendar";
import { bindActionCreators } from "redux";

type InnerProps = CalendarState & IActionCreators;

function CalendarList({ toDos, addNote, updateNote, removeNote }: InnerProps) {
  const [additionalDate, setAdditionalDate] = useState("");
  const [additionalText, setAdditionalText] = useState("");
  const [updatableId, setUpdatableId] = useState("");
  const [updatableDate, setUpdatableDate] = useState("");
  const [updatableText, setUpdatableText] = useState("");

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Date</th>
            <th>Note</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {toDos.map((item) => (
            <tr key={`row${item.id}`}>
              <td>{item.id}</td>
              <td>{`${item.date.getFullYear()}/${
                item.date.getMonth() + 1
              }/${item.date.getDate()}`}</td>
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
        <div className="col-2">
          <input
            value={additionalDate}
            onChange={(e) => {
              setAdditionalDate(e.target.value);
            }}
            type="date"
            className="form-control"
          />
        </div>
        <div className="col-8">
          <div className="form-group">
            <input
              value={additionalText}
              onChange={(e) => {
                setAdditionalText(e.target.value);
              }}
              type="text"
              placeholder="Please input a note to add."
              className="form-control"
            />
          </div>
        </div>
        <div className="col-2">
          <button
            onClick={() => {
              if (additionalDate == null || additionalDate === "") {
                return;
              }
              addNote({ date: new Date(additionalDate), note: additionalText });
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
        <div className="col-2">
          <input
            value={updatableDate}
            onChange={(e) => setUpdatableDate(e.target.value)}
            type="date"
            className="form-control"
          />
        </div>
        <div className="col-6">
          <div className="form-group">
            <input
              value={updatableText}
              onChange={(e) => setUpdatableText(e.target.value)}
              type="text"
              placeholder="Please input a note to update."
              className="form-control"
            />
          </div>
        </div>
        <div className="col-2">
          <button
            onClick={() => {
              if (
                updatableDate == null ||
                updatableDate === "" ||
                updatableId == null ||
                updatableId === ""
              ) {
                return;
              }
              const id = Number(updatableId);
              if (isNaN(id)) {
                return;
              }
              updateNote({
                id,
                date: new Date(updatableDate),
                note: updatableText,
              });
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
  (state: ApplicationState): CalendarState => {
    return {
      ...state.calendar,
    };
  },
  (dispatch) => {
    return {
      ...bindActionCreators(actionCreators, dispatch),
    };
  }
)(CalendarList);
