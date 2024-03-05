import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postUpdated } from "./postsSlice";

export const EditPostForm = () => {
  const { postId } = useParams();

  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  );

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const dispatch = useDispatch();
  const history = useNavigate();

  const handleSavePost = () => {
    dispatch(postUpdated({ id: post.id, title, content }));
    history(`/posts/${post.id}`);
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label>Post Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </form>
      <button onClick={handleSavePost}>Save Post</button>
    </section>
  );
};
