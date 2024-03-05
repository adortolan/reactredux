import { useDispatch } from "react-redux";
import { reactionAdd } from "./postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

export const ReactionButton = ({ post }) => {
  const dispatch = useDispatch();

  const reactionsButton = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <buton
        key={name}
        type="button"
        onClick={() =>
          dispatch(reactionAdd({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </buton>
    );
  });

  return <div>{reactionsButton}</div>;
};
