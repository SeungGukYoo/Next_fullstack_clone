import React, { useCallback, useRef } from "react";
import Modal from "./Modal";
import Proptypes from "prop-types";

const Image = ({ post }) => {
  const modal = useRef(false);

  const showImage = useCallback(() => modal.current.open(), []);
  if (post.Images.length === 1) {
    return (
      <>
        <div className="  border-b">
          <img
            className="w-1/2 mx-auto"
            src={`http://localhost:3065/${post.Images[0].src}`}
            alt="image"
            onClick={showImage}
          />
        </div>
        {modal && <Modal ref={modal} images={post.Images} />}
      </>
    );
  }
  if (post.Images.length === 2) {
    return (
      <>
        <div className=" border-b">
          <img
            className="inline-block w-1/2"
            src={`http://localhost:3065/${post.Images[0].src}`}
            alt="image"
            onClick={showImage}
          />
          <img
            className="inline-block w-1/2"
            src={`http://localhost:3065/${post.Images[1].src}`}
            alt="image"
            onClick={showImage}
          />
        </div>
        {modal && <Modal ref={modal} images={post.Images} />}
      </>
    );
  }

  return (
    <div>
      <div className=" flex justify-center border-b">
        <img
          className="w-1/2"
          src={`http://localhost:3065/${post.Images[0].src}`}
          alt="image"
          onClick={showImage}
        />

        <p
          className="w-1/2 text-lg text-gray-700 text-center my-auto cursor-pointer"
          onClick={showImage}
        >
          + <br />
          {`${post.Images.length - 1}개의 사진 더보기`}
        </p>
      </div>
      {modal && <Modal ref={modal} images={post.Images} />}
    </div>
  );
};

Image.propTypes = {
  post: Proptypes.shape({
    comments: Proptypes.array,
    Images: Proptypes.arrayOf(
      Proptypes.shape({
        PostId: Proptypes.number.isRequired,
        id: Proptypes.number.isRequired,
        src: Proptypes.string.isRequired,
        createdAt: Proptypes.string.isRequired,
        updatedAt: Proptypes.string.isRequired,
      }).isRequired
    ),
    Retweet: Proptypes.array,
    RetweetId: Proptypes.number,
    User: Proptypes.shape({
      id: Proptypes.number.isRequired,
      nickname: Proptypes.string.isRequired,
    }),
    UserId: Proptypes.number.isRequired,
    content: Proptypes.string.isRequired,
    createdAt: Proptypes.string.isRequired,
    id: Proptypes.number.isRequired,
    updatedAt: Proptypes.string.isRequired,
  }).isRequired,
};

export default Image;
