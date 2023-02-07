import React from "react";
import PostCardContent from "./PostCardContent";
import Link from "next/link";
import PropTypes from "prop-types";
import moment from "moment/moment";

const RetweetContent = ({ Retweet, User }) => {
  return (
    <div>
      <div className="flex items-center gap-5 px-5 pt-5">
        <Link href={`/user/${User.id}`}>
          <a>
            <div
              className="relative flex items-center
			justify-center w-10 h-10
			overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 "
            >
              <span
                className="
					h-full
					text-lg
					text-gray-600 dark:text-gray-300
					leading-9
					cursor-pointer
				"
              >
                {/* eslint-disable-next-line react/prop-types */}
                {User.nickname[0]}
              </span>
            </div>
          </a>
        </Link>

        <h1 className="text-lg">{User.nickname} 님이 리트윗하셨습니다.</h1>
      </div>
      <div className="border m-2">
        <div className="flex gap-5 p-5">
          <Link href={`/user/${Retweet.User.id}`}>
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
                  {Retweet.User.nickname[0]}
                </span>
              </div>
            </a>
          </Link>

          <div
            className="w-full 
      flex flex-col items-start"
          >
            <div>
              <h1 className="text-lg">{Retweet.User.nickname}</h1>
            </div>
            <div>{moment(Retweet.createdAt).format("YYYY.MM.DD")}</div>
            <PostCardContent content={Retweet.content} />
          </div>
        </div>
      </div>
    </div>
  );
};

RetweetContent.propTypes = {
  Retweet: PropTypes.shape({
    Images: PropTypes.array,
    RetweetId: PropTypes.number,
    User: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nickname: PropTypes.string.isRequired,
    }).isRequired,
    UserId: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
  User: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
  }).isRequired,
};
export default RetweetContent;
