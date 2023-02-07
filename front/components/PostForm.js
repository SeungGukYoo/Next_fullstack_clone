import React, { useEffect } from "react";
import { useCallback } from "react";
import { useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  ADD_POST_REQUEST,
  REMOVE_IMAGE,
  UPLOAD_IMAGES_REQUEST,
} from "../action";
import useInput from "../hooks/useInput";

const PostForm = () => {
  const imageInput = useRef();
  const [text, onChangeText, setText] = useInput("");
  const { imagePaths, addPostDone } = useSelector((store) => store.post);
  const dispatch = useDispatch();
  const onChangeImages = useCallback((e) => {
    e.preventDefault();
    const imageFormData = new FormData();

    [].forEach.call(e.target.files, (el) => {
      imageFormData.append("image", el);
    });

    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  });
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!text || !text.trim()) return alert("게시글을 작성하세요");
      const formData = new FormData();
      imagePaths.forEach((el) => formData.append("image", el));
      formData.append("content", text);
      dispatch({
        type: ADD_POST_REQUEST,
        data: formData,
      });
    },
    [text, imagePaths]
  );

  const imageUpload = useCallback((e) => {
    e.preventDefault();
    imageInput.current.click();
  }, []);
  const onRemoveImage = useCallback(
    (idx) => () => {
      dispatch({
        type: REMOVE_IMAGE,
        index: idx,
      });
    },
    []
  );

  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone]);
  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="w-full mt-4 h-20 border border-solid border-gray-300
        resize-none"
        type="text"
        name="text"
        id="text"
        value={text}
        onChange={onChangeText}
      />
      <div className="flex w-full justify-between mt-3">
        <input
          type="file"
          name="image"
          id="image"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
        <button
          className="
					border 
					border-blue-500 
					text-blue-500 
					text-xs 
					rounded 
					p-2 
					focus:outline-none
					focus:bg-blue-500
					focus:text-white
					hover:bg-blue-500
					hover:text-white
					
					transition duration-150 ease-in-out
					"
          onClick={imageUpload}
        >
          image upload
        </button>
        <button
          className="
				p-2
				rounded
				text-xs
				bg-blue-500
				text-white
				leading-tight
				shadow-md
				hover:bg-blue-700
				hover:shadow-lg
				focus:bg-blue-700
				focus:shadow-lg
				focus:outline-none 
				focus:ring-0 
					
				transition 
				duration-150 
				ease-in-out
				"
          type="submit"
        >
          POST
        </button>
      </div>
      <div>
        {imagePaths.map((path, idx) => (
          <div key={path}>
            <img src={`http://localhost:3065/${path}`} alt={path} />
            <div>
              <button onClick={onRemoveImage(idx)}>제거</button>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
};

export default PostForm;
