import React, { useEffect } from "react";
import { useCallback } from "react";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../action";

const CommentForm = ({ post }) => {
  const id = useSelector((store) => store.user.me?.id);
  const { addCommentDone } = useSelector((store) => store.post);
  const [commentText, onChangeCommentText, setCommentText] = useInput("");
  const dispatch = useDispatch();

  const onSubmitComment = useCallback(
    (e) => {
      e.preventDefault();
      return dispatch({
        type: ADD_COMMENT_REQUEST,
        data: { content: commentText, postId: post.id, userId: id },
      });
    },
    [commentText, id]
  );
  useEffect(() => {
    if (addCommentDone) setCommentText("");
  }, [addCommentDone]);
  return (
    <form className="mt-3" onSubmit={onSubmitComment}>
      <textarea
        className="w-full resize-none border"
        onChange={onChangeCommentText}
        rows={4}
        value={commentText}
      />
      <button
        className="flex ml-auto px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        type="submit"
      >
        댓글 추가
      </button>
    </form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};
export default CommentForm;
