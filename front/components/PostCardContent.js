import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import moment from "moment/moment";

const PostCardContent = ({ content }) => {
  return (
    <div className="text-gray-500">
      {content.split(/(#[^\s#]+)/g).map((el, idx) => {
        if (el.match(/(#[^\s#]+)/))
          return (
            <Link key={idx} href={`/hashtag/${el.slice(1)}`}>
              <a className="text-blue-500">{el}</a>
            </Link>
          );
        return el;
      })}
    </div>
  );
};

PostCardContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default PostCardContent;
