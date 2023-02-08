import Link from "next/link";
import Proptypes from "prop-types";
const Comments = ({ comment }) => {
  console.log(comment);
  return (
    <div className="flex px-5 my-4 items-center gap-3 border py-3">
      <Link href={`/user/${comment.User.id}`}>
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
				"
            >
              {comment.User.nickname[0]}
            </span>
          </div>
        </a>
      </Link>

      <div>
        <span className="text-sm text-gray-500">{comment.User.nickname}</span>
        <p>{comment.content}</p>
      </div>
    </div>
  );
};
Comments.propTypes = {
  comment: Proptypes.shape({
    id: Proptypes.number.isRequired,
    content: Proptypes.string.isRequired,
    UserId: Proptypes.number.isRequired,
    PostId: Proptypes.number.isRequired,
    createdAt: Proptypes.string.isRequired,
    updatedAt: Proptypes.string.isRequired,
    User: Proptypes.shape({
      id: Proptypes.number.isRequired,
      nickname: Proptypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Comments;
