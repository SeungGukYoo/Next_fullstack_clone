import Proptypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";

import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import { useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { useCallback } from "react";
const AppLayout = ({ children }) => {
  const router = useRouter();
  const [searchInput, onChangeSearchInput] = useInput("");
  const { me } = useSelector((store) => store.user);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      router.push(`/hashtag/${searchInput}`);
    },
    [searchInput]
  );
  return (
    <div>
      <ul className="w-full bg-gray-400 h-20 justify-around items-center flex basis-60">
        <li className="hover:bg-red-100 duration-700 flex min-w-fit">
          <Link href="/">
            <a className={router.pathname === "/" ? "bg-red-100" : ""}>LOGO</a>
          </Link>
        </li>
        <li
          className="hover:bg-red-100 duration-700
        min-w-fit"
        >
          <Link href="/profile">
            <a className={router.pathname === "/profile" ? "bg-red-100" : ""}>
              프로필
            </a>
          </Link>
        </li>
        <li>
          <input
            type="text"
            name="search"
            id="search"
            onChange={onChangeSearchInput}
            value={searchInput}
          />
          <button onClick={onSubmit}>search</button>
        </li>
        <li className="hover:bg-red-100 duration-700 min-w-fit">
          <Link href="/signup">
            <a className={router.pathname === "/signup" ? "bg-red-100" : ""}>
              회원가입
            </a>
          </Link>
        </li>
      </ul>
      <div className="grid xl:grid-cols-4 xl:gap-4 sm:gap-0 ">
        <div className="p-8 ">{me ? <UserProfile /> : <LoginForm />}</div>
        <div className="col-span-2">{children}</div>
        <div>
          <a
            href="https://9uk-e.tistory.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            뒤죽박죽 공책
          </a>
        </div>
      </div>
    </div>
  );
};

AppLayout.propTypes = {
  children: Proptypes.node.isRequired,
};

export default AppLayout;
