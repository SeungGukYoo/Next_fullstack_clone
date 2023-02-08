import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Head } from "next/head";

import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_USER_REQUEST,
} from "../action";
import NicknameEditForm from "../components/NicknameEditForm";
import AppLayout from "../components/AppLayout";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import FollowList from "../components/FollowList";

const About = () => {
  const { userInfo } = useSelector((store) => store.user);

  return (
    <AppLayout>
      {userInfo ? (
        <div className="shadow-md p-10 min-w-full">
          <div className="flex justify-between items-center">
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <span className="font-medium text-gray-600 dark:text-gray-300">
                {userInfo.nickname[0]}
              </span>
            </div>
            <p className="">{userInfo.nickname}</p>
          </div>
          <div className="flex justify-between mt-10 text-center">
            <p>
              post <br /> {userInfo.Posts.length}
            </p>
            <p>
              follower
              <br />
              {userInfo.Followers.length}
            </p>
            <p>
              following
              <br />
              {userInfo.Followings.length}
            </p>
          </div>
        </div>
      ) : null}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    context.store.dispatch({
      type: LOAD_USER_REQUEST,
      data: 1,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default About;
