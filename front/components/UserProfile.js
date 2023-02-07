import React, { useEffect } from "react";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutRequestAction } from "../reducers/user";
import Link from "next/link";

const UserProfile = () => {
  const dispatch = useDispatch();

  const { me, logOutLoading } = useSelector((store) => store.user);

  const onLogOut = useCallback(() => dispatch(logOutRequestAction()), []);

  return (
    <div className="shadow-md p-10 min-w-full">
      <div className="flex justify-between items-center">
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {me.nickname[0]}
          </span>
        </div>
        <p className="">{me.nickname}</p>
        <button
          onClick={onLogOut}
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          {logOutLoading ? "로그아웃 중" : "로그아웃"}
        </button>
      </div>
      <div className="flex justify-between mt-10 text-center">
        <Link href={`/user/${me.id}`}>
          <a>
            <p>
              post <br /> {me.Posts.length}
            </p>
          </a>
        </Link>
        <Link href={"/profile"}>
          <a>
            <p>
              follower
              <br />
              {me.Followers.length}
            </p>
          </a>
        </Link>
        <Link href={"/profile"}>
          <a>
            <p>
              following
              <br />
              {me.Followings.length}
            </p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
