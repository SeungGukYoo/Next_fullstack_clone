import React from "react";
import PostCardContent from "./PostCardContent";
import Link from "next/link";

import Proptypes from "prop-types";

const Content = ({ content, User }) => {
  return (
    <div className="flex gap-5 p-5">
      <Link href={`/user/${User.id}`}>
        <a>
          <div
            className="relative flex items-center
			justify-center w-10 h-10
			overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer"
          >
            <span
              className="
					h-full
					text-lg
					text-gray-600 dark:text-gray-300
					leading-9
				"
            >
              {User.nickname[0]}
            </span>
          </div>
        </a>
      </Link>

      <div
        className="w-full
      flex flex-col items-start"
      >
        <div>
          <h1 className="text-lg">{User.nickname}</h1>
        </div>
        <PostCardContent content={content} />
      </div>
    </div>
  );
};
Content.propTypes = {
  content: Proptypes.string.isRequired,
  User: Proptypes.shape({
    id: Proptypes.number.isRequired,
    nickname: Proptypes.string.isRequired,
  }).isRequired,
};

export default Content;
