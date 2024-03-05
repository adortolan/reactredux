import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: "1",
    title: "First Post!",
    content: "Hello!",
    user: 0,
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
  {
    id: "2",
    title: "Second Post",
    content: "More text",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdd: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        };
      },
    },
    reactionAdd(state, action) {
      const { postId, reaction } = action.payload;
      const existPost = state.find((post) => post.id === postId);

      if (existPost) {
        existPost.reactions[reaction]++;
      }
    },

    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existPost = state.find((post) => post.id === id);

      if (existPost) {
        existPost.title = title;
        existPost.content = content;
      }
    },
  },
});

export const { postAdd, postUpdated, reactionAdd } = postSlice.actions;

export default postSlice.reducer;
