import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { postAdd } from "./postsSlice";

export const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);

  const handleTitleChanged = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChanged = (e) => {
    setContent(e.target.value);
  };

  const handleAutorChanged = (e) => {
    setUserId(e.target.value);
  };

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const handleSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdd(title, content, userId));
      setTitle("");
      setContent("");
    }
  };

  return (
    <section>
      <h2>Add new post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          name="postTitle"
          onChange={handleTitleChanged}
          value={title}
        />
        <label htmlFor="postAuthor">Author</label>
        <select value={userId} onChange={handleAutorChanged}>
          <option value=""></option>
          {users.map((user) => (
            <option id={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={handleContentChanged}
        />
        <button
          type="button"
          onClick={handleSavePostClicked}
          disabled={!canSave}
        >
          Save post
        </button>
      </form>
    </section>
  );
};
