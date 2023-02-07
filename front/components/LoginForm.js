import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LOG_IN_REQUEST } from "../action";
import { useEffect } from "react";

const Loginform = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector((store) => store.user);
  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: LOG_IN_REQUEST,
        data: { email, password },
      });
    },
    [email, password]
  );

  useEffect(() => {
    if (logInError) alert(logInError);
  }, [logInError]);

  return (
    <form onSubmit={onSubmitForm}>
      <div className="mb-3">
        <label htmlFor="user-email">이메일</label>
        <br />
        <input
          className="form-control
        block
        w-15
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          type="email"
          value={email}
          onChange={onChangeEmail}
          required
        />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <input
          type="password"
          name="user-password"
          className=" form-control
        block
        w-15
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div className="mt-3">
        <button
          type="submit"
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          {logInLoading ? "로딩중" : "로그인"}
        </button>
        <Link href="/signup">
          <a className="inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out ml-2">
            회원가입
          </a>
        </Link>
      </div>
    </form>
  );
};

export default Loginform;
