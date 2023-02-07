import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import Slider from "react-slick";
import Proptypes from "prop-types";

const Modal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  useImperativeHandle(ref, () => {
    return {
      open: () => setOpen((prev) => !prev),
    };
  });

  useEffect(() => {
    open
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [open]);

  return (
    <article>
      {open && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-20 ">
          <div className="bg-black bg-opacity-75 z-20 h-screen">
            <span
              className="h-10 text-gray-500 fixed right-48 top-12 z-20 cursor-pointer"
              onClick={() => {
                setCurrent(0);
                return setOpen((prev) => !prev);
              }}
            >
              CLOSE
            </span>
            <Slider
              initalState={0}
              afterChange={(slide) => setCurrent(slide)}
              infinite
              arrows={false}
              slidesToScroll={1}
              slidesToShow={1}
            >
              {props.images.map((image) => (
                <img
                  className="w-full h-full mx-auto"
                  key={image.src}
                  src={`http://localhost:3065/${image.src}`}
                  alt="image"
                />
              ))}
            </Slider>
          </div>
          <div className="absolute bottom-10 left-1/2">
            {current + 1}/{props.images.length}
          </div>
        </div>
      )}
    </article>
  );
});

Modal.propTypes = {
  images: Proptypes.arrayOf(
    Proptypes.shape({
      PostId: Proptypes.number.isRequired,
      createdAt: Proptypes.string.isRequired,
      id: Proptypes.number.isRequired,
      src: Proptypes.string.isRequired,
      updatedAt: Proptypes.string.isRequired,
    })
  ),
};

export default Modal;
