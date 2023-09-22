import React, { useContext, useState } from "react";
import { Clear } from "@material-ui/icons";

import storeApi from "../../../utils/storeApi";

import "./inputcard.styles.css";

export default function InputCard({ setOpen, listId, type }) {
  const { addMoreCard, addMoreList } = useContext(storeApi);
  const [title, setTitle] = useState("");

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBtnConfirm = () => {
    if (type === "card") {
      addMoreCard(title, listId);
    } else {
      addMoreList(title);
    }
    setOpen(false);
    setTitle("");
  };

  return (
    <div className="input-card">
      <div className="input-card-container">
        <textarea
          onChange={handleOnChange}
          value={title}
          className="input-text"
          placeholder={
            type === "card"
              ? "Enter the name of the card..."
              : "Enter the title of the list"
          }
          autoFocus
        />
      </div>
      <div className="confirm">
        <button className="button-confirm" onClick={handleBtnConfirm}>
          {type === "card" ? "Add card" : "Add list"}
        </button>
        <button
          className="button-cancel"
          onClick={() => {
            setTitle("");
            setOpen(false);
          }}
        >
          <Clear />
        </button>
      </div>
    </div>
  );
}
