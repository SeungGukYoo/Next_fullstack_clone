import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Content from "./Content";
import Image from "./Image";
import {
  RetweetOutlined,
  HeartTwoTone,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useCallback } from "react";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import {
  LIKE_POST_REQUEST,
  REMOVE_POST_REQUEST,
  RETWEET_POST_REQUEST,
  UNLIKE_POST_REQUEST,
} from "../action";
import FollowButton from "./FollowButton";
import RetweetContent from "./RetweetContent";
import moment from "moment";

moment.locale("ko");
// moment.locale("ko");
const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const dispatch = useDispatch();
  const id = useSelector((store) => store.user.me?.id);
  const liked = post.Likers.find((el) => el.id === id);

  const onUnlike = useCallback(
    (e) => {
      e.preventDefault();
      if (!id) return alert("로그인이 필요합니다.");
      dispatch({
        type: UNLIKE_POST_REQUEST,
        data: post.id,
      });
    },
    [id]
  );
  const onLike = useCallback(
    (e) => {
      e.preventDefault();
      if (!id) return alert("로그인이 필요합니다.");
      dispatch({
        type: LIKE_POST_REQUEST,
        data: post.id,
      });
    },
    [id]
  );
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);
  const onRemovePost = useCallback(() => {
    dispatch({ type: REMOVE_POST_REQUEST, data: post.id });
  }, []);
  const onRetweet = useCallback(() => {
    if (!id) return alert("로그인이 필요합니다.");
    dispatch({
      type: RETWEET_POST_REQUEST,
      data: post.id,
    });
  }, [id]);
  console.log();
  return (
    <div className=" border border-grey-500 mt-5 w-auto">
      {id !== post.User.id && id && <FollowButton post={post} />}
      <div>
        {post?.Images.length > 0 && <Image post={post} />}
        <div className="float-left">
          {moment(post.createdAt).format("YYYY.MM.DD")}
        </div>
        {post.RetweetId ? (
          <RetweetContent Retweet={post.Retweet} User={post.User} />
        ) : (
          <Content content={post.content} User={post.User} />
        )}
      </div>
      <div className="flex w-full h-14 border ">
        <button
          className="flex-1  border-r hover:text-blue-400 transition ease-in-out duration-150"
          onClick={onRetweet}
        >
          <RetweetOutlined className="text-xl" />
        </button>
        {id && liked ? (
          <button
            className="flex-1 border-r hover:text-blue-400 transition ease-in-out duration-150"
            onClick={onUnlike}
          >
            <HeartTwoTone className="text-xl" twoToneColor="#eb2f96" />
          </button>
        ) : (
          <button
            className="flex-1 border-r hover:text-blue-400 transition ease-in-out duration-150"
            onClick={onLike}
          >
            <HeartOutlined className="text-xl" />
          </button>
        )}

        <button
          onClick={onToggleComment}
          className="flex-1 border-r hover:text-blue-400 transition ease-in-out duration-150"
        >
          <MessageOutlined className="text-xl " />
        </button>
        <div className="flex-1 flex justify-center relative h-full w-full  hover:text-blue-400 transition ease-in-out duration-150">
          <button>
            <EllipsisOutlined className=" text-xl " />
          </button>
          <div className=" absolute right-0 bg-white group-hover:block:flex group-hover:block:flex-col">
            {id === post.User.id && id ? (
              <>
                <button className="border px-4 py-1">수정</button>
                <button onClick={onRemovePost} className="border px-4 py-1">
                  삭제
                </button>
              </>
            ) : (
              <button className="border px-4 py-1">신고</button>
            )}
          </div>
        </div>
      </div>

      {commentFormOpened && (
        <div className="mt-3 px-3">
          <p>{`${post.Comments.length}개의 댓글`}</p>

          <CommentForm post={post} />
          {post.Comments.map((comment, idx) => (
            <Comments comment={comment} key={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nickname: PropTypes.string.isRequired,
    }),
    UserId: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    Comments: PropTypes.arrayOf(PropTypes.object),
    imagePath: PropTypes.arrayOf(PropTypes.object),
    Retweet: PropTypes.object,
    RetweetId: PropTypes.number,
    Images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        src: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
        PostId: PropTypes.number.isRequired,
      }).isRequired
    ),
    Likers: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
export default PostCard;
