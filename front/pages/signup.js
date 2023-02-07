import React, { useState } from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import useInput from "../hooks/useInput";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST } from "../action";
import { useEffect } from "react";
import { useRouter } from "next/router";
import wrapper from "../store/configureStore";
import axios from "axios";
import { END } from "redux-saga";
const Signup = () => {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { signUpLoading, signUpDone, signUpError, logInDone } = useSelector(
    (store) => store.user
  );

  useEffect(() => {
    if (signUpDone) router.replace("/");
    if (logInDone) router.replace("/");
  }, [signUpDone, logInDone]);
  useEffect(() => {
    if (signUpError) alert(signUpError);
  }, [signUpError]);

  const onChnageTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (password !== passwordCheck) setPasswordError(true);
      if (!term) setTermError(true);
      dispatch({ type: SIGN_UP_REQUEST, data: { email, password, nickname } });
    },
    [password, passwordCheck, term]
  );

  return (
    <AppLayout>
      <Head>
        <title>회원가입</title>
      </Head>
      <section className="border mt-5">
        <form onSubmit={onSubmit} className="p-5">
          <h1 className="text-xl mb-3">회원가입 양식</h1>
          <div>
            <label
              htmlFor="user-Email"
              className="text-gray-400 mb-1 inline-block"
            >
              Email:
            </label>
            <br />
            <input
              className="border-blue-300 border-2 h-11 w-1/2 rounded bg-blue-50 pl-3 outline-none focus:border-blue-600 transition ease-out"
              type="email"
              name="user-Email"
              value={email}
              required
              onChange={onChangeEmail}
            />
          </div>
          <div>
            <label htmlFor="user-nick">닉네임</label>
            <br />
            <input
              type="text"
              name="user-nick"
              value={nickname}
              required
              onChange={onChangeNickname}
            />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <input
              type="password"
              name="user-password"
              value={password}
              required
              onChange={onChangePassword}
            />
          </div>
          <div>
            <label htmlFor="user-password-check">비밀번호 확인</label>
            <br />
            <input
              type="password"
              name="user-password-check"
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
            />
            {passwordError && (
              <p className=" text-red-600">비밀번호가 일치하지 않습니다.</p>
            )}
          </div>
          <input
            type="checkbox"
            name="user-term"
            checked={term}
            onChange={onChnageTerm}
          />
          약관에 동의하시겠습니까?
          {termError && (
            <p className="text-red-600">약관에 동의하셔야 합니다.</p>
          )}
          <div>
            <button type="submit">
              {signUpLoading ? "로딩중" : "가입하기"}
            </button>
          </div>
        </form>
      </section>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Signup;
