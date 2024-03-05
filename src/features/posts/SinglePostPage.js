import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";

export const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  );

  if (!post) {
    return (
      <section>
        <h2>Post no found</h2>
      </section>
    );
  }

  return (
    <section>
      <article>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <Link to={`/editpost/${postId}`}>Edit Post</Link>
        <PostAuthor userId={post.user} />
      </article>
    </section>
  );
};
