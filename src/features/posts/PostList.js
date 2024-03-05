import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButton } from "./ReactionButton";

export const PostList = () => {
  const posts = useSelector((state) => state.posts);
  const orderedPost = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPost.map((post) => {
    return (
      <article key={post.id}>
        <h3>{post.title}</h3>
        <div>
          <PostAuthor userId={post?.user} />
          <TimeAgo timeStamp={post.date} />
        </div>
        <p>{post.content.substring(0, 100)}</p>

        <ReactionButton post={post} />
        <Link to={`/posts/${post.id}`}>View post</Link>
      </article>
    );
  });

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};
