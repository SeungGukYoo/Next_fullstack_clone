import React from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from "../action";
import Proptypes from "prop-types";

const FollowButton = ({ post }) => {
  const { me } = useSelector((store) => store.user);
  const isFollowing = me?.Followings.find((el) => el.id === post.User.id);
  const dispatch = useDispatch();
  const onFollow = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [isFollowing]);

  return (
    <div className="w-full py-5 flex justify-end border-b">
      <button
        className={`mr-5 px-6 py-2.5  leading-tight rounded shadow-md font-medium text-xs  hover:shadow-lg active:shadow-lg transition durtaion-150 ease-in-out 
				${isFollowing ? "border border-gray-100" : "border-none"}
				hover:${isFollowing ? "bg-gray-100" : "bg-blue-700"}
				text-${isFollowing ? "black" : "white"}
				${isFollowing ? "bg-white " : "bg-blue-600"}`}
        onClick={onFollow}
      >
        {isFollowing ? "UNFOLLOW" : "FOLLOW"}
      </button>
    </div>
  );
};

FollowButton.propTypes = {
  post: Proptypes.shape({
    Comments: Proptypes.array,
    Images: Proptypes.array,
    Likers: Proptypes.array,
    Retweet: Proptypes.shape({
      Images: Proptypes.array,
      RetweetId: Proptypes.number,
      id: Proptypes.number.isRequired,
      content: Proptypes.string.isRequired,
      createdAt: Proptypes.string.isRequired,
      updatedAt: Proptypes.string.isRequired,
      User: Proptypes.shape({
        id: Proptypes.number.isRequired,
        nickname: Proptypes.string.isRequired,
      }),
    }),
    RetweetId: Proptypes.number,
    User: Proptypes.shape({
      id: Proptypes.number.isRequired,
      nickname: Proptypes.string.isRequired,
    }).isRequired,
    UserId: Proptypes.number.isRequired,
    content: Proptypes.string.isRequired,
    createdAt: Proptypes.string.isRequired,
    id: Proptypes.number.isRequired,
    updatedAt: Proptypes.string.isRequired,
  }).isRequired,
};
export default FollowButton;
