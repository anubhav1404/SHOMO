import { createContext, useReducer } from "react";
export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});
const postListReducre = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducre,
    DEFAULT_POST_LIST
  );

  const addPost = (userId, postBody, postTitle, reactions, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postBody,
        body: postTitle,
        reaction: reactions,
        userId: userId,
        tags: tags,
      },
    });
  };

  const deletePost = (postId) => {
    // console.log(`delete post called for ${postId}`)
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };
  return (
    <PostList.Provider
      value={{
        postList,
        addPost,
        deletePost,
      }}
    >
      {children}
    </PostList.Provider>
  );
};
const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "HELLO",
    body: "STILL LEARNING",
    reaction: 0,
    userId: "user-9",
    tags: ["vt", "LEARNING PHASE"],
  },
  {
    id: "2",
    title: "NEVER LOOSE NEVER WHAT",
    body: "NGL",
    reaction: 999,
    userId: "user-19",
    tags: ["FREEDOM ", "MOTIVATION"],
  },
];
export default PostListProvider;
