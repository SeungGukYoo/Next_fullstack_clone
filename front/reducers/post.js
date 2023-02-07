// 시퀄라이즈로 인해 백엔드 쪽에서 합쳐서 내보내지는 데이터의 경우 앞글자가 대문자로 바뀜
// ex) User의 경우 id+nickname, content의 경우 단순한 문자열 하나

import produce from "../util/produce";

import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_FAILURE,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_SUCCESS,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  REMOVE_IMAGE,
  RETWEET_POST_REQUEST,
  RETWEET_POST_SUCCESS,
  RETWEET_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
} from "../action";

export const initalState = {
  mainPosts: [],
  singlePost: null,
  imagePaths: [],

  hasMorePosts: true,

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,

  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,

  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  removePostLoading: false,
  removePostDone: false,
  removePostError: null,

  retweetPostLoading: false,
  retweetPostDone: false,
  retweetPostError: null,

  likePostLoading: false,
  likePostDone: false,
  likePostError: null,

  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,

  addImageLoading: false,
  addImageDone: false,
  addImageError: null,
};

export const addRequestPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});
export const addRequestComment = () => ({});

const reducer = (state = initalState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        break;
      case LOAD_POST_SUCCESS:
        draft.singlePost = action.data;
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      case LOAD_USER_POSTS_REQUEST:
      case LOAD_HASHTAG_POSTS_REQUEST:
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        break;
      case LOAD_USER_POSTS_SUCCESS:
      case LOAD_HASHTAG_POSTS_SUCCESS:
      case LOAD_POSTS_SUCCESS:
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.hasMorePosts = action.data.length === 10;
        break;
      case LOAD_USER_POSTS_FAILURE:
      case LOAD_HASHTAG_POSTS_FAILURE:
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        break;
      case ADD_POST_SUCCESS:
        draft.mainPosts.unshift(action.data.content);
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.imagePaths = [];
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        break;
      case ADD_COMMENT_SUCCESS:
        const post = draft.mainPosts.find(
          (post) => post.id === action.data.PostId
        );
        post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        break;
      case REMOVE_POST_SUCCESS:
        draft.mainPosts = draft.mainPosts.filter(
          (post) => post.id !== action.data.PostId
        );
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        break;
      case LIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((el) => el.id === action.data.PostId);
        post.Likers.push({ id: action.data.UserId });
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      }
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;
      case UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        break;
      case UNLIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((el) => el.id === action.data.PostId);
        post.Likers = post.Likers.filter((el) => el.id !== action.data.UserId);
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        break;
      }
      case UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
        break;
      case UPLOAD_IMAGES_REQUEST:
        draft.addImageLoading = true;
        break;
      case UPLOAD_IMAGES_SUCCESS:
        draft.addImageDone = true;
        draft.addImageLoading = false;
        draft.imagePaths = action.data;
        break;
      case UPLOAD_IMAGES_FAILURE:
        draft.addImageLoading = false;
        draft.addImageError = action.data.error;
        break;
      case RETWEET_POST_REQUEST:
        draft.retweetPostLoading = true;
        draft.retweetPostDone = false;
        draft.retweetPostError = null;
        break;
      case RETWEET_POST_SUCCESS:
        draft.retweetPostDone = true;
        draft.retweetPostLoading = false;
        draft.mainPosts.unshift(action.data);
        break;
      case RETWEET_POST_FAILURE:
        draft.retweetPostLoading = false;
        draft.retweetPostError = action.data;
        break;

      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter(
          (_, idx) => idx !== action.index
        );
        break;
      default:
        break;
    }
  });
};

export default reducer;
