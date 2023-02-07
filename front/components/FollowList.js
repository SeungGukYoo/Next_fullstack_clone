import React from "react";
import { useDispatch } from "react-redux";
import { REMOVE_FOLLOWER_REQUEST, UNFOLLOW_REQUEST } from "../action";
import Proptypes from "prop-types";

const FollowList = ({ header, data, loadMore }) => {
  const dispatch = useDispatch();
  const onClickMore = () => {
    loadMore();
  };

  const onUnFollow = (e, id) => {
    e.preventDefault();
    if (header === "팔로잉") {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    }
    if (header === "팔로워") {
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: id,
      });
    }
  };

  return (
    <div className=" mt-11 border-solid border-2 border-sky-500 p-10">
      <h1 className="mb-4 text-center">{header}</h1>
      <ul className="flex justify-around">
        {data?.map((el, idx) => {
          return (
            <li key={idx} className="border-solid border-2 border-sky-500 p-5">
              <h1>{el.nickname}</h1>
              <button onClick={(e) => onUnFollow(e, el.id)}>팔로우 취소</button>
            </li>
          );
        })}
      </ul>
      <button className="w-full mt-5 flex justify-center" onClick={onClickMore}>
        MORE
      </button>
    </div>
  );
};

FollowList.propTypes = {
  header: Proptypes.string.isRequired,
  data: Proptypes.arrayOf(
    Proptypes.shape({
      id: Proptypes.number.isRequired,
      email: Proptypes.string.isRequired,
      nickname: Proptypes.string.isRequired,
      updatedAt: Proptypes.string.isRequired,
    }).isRequired
  ).isRequired,
  loadMore: Proptypes.func.isRequired,
};

export default FollowList;
