import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  let history = useHistory();
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState({
    color: '',
    code: {
      hex: ''
    }
  })

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const idx = colors.findIndex(color => color.id === colorToEdit.id);
  colors[idx] = colorToEdit;

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    axiosWithAuth().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        // console.log(res);
        // console.log(idx);
        // console.log(colors);
        updateColors(colors);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`/api/colors/${color.id}`)
      .then((res) => {
        // history.push(`/bubbles`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const addColor = color => {
    axiosWithAuth().post(`/api/colors`, color)
      .then((res) => {
        console.log(res);
        updateColors(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="colors-wrap">
      {localStorage.getItem('token') && <UserCP onClick={() => {
        localStorage.clear();
        // window.location.reload();
        history.push(`/`);
      }}><p>Logout</p></UserCP>}
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form className="addForm" onSubmit={(e) => {
        e.preventDefault();
        addColor(colorToAdd);
      }}>
        <h3>Add a Color</h3>
        <input
          placeholder="Color"
          onChange={e =>
            setColorToAdd({
              ...colorToAdd,
              color: e.target.value
            })}
        />
        <input
          placeholder="#HEX"
          onChange={e =>
            setColorToAdd({
              ...colorToAdd,
              code: {
                hex: e.target.value
              }
            })}
        />
        <button type="submit">Add Color</button>
      </form>
    </div>
  );
};

const UserCP = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 2rem;
  background: #444444;
  color: #fafafa;

  p {
    padding-right: 5%;
    transition: all 300ms;

    &:hover {
      transition: color 300ms;
      color: #ccc;
      cursor: pointer;
    }
  }
`;

export default ColorList;
