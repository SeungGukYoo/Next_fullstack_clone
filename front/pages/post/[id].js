import axios from "axios";
import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { END } from "redux-saga";
import { LOAD_MY_INFO_REQUEST, LOAD_POST_REQUEST } from "../../action";
import wrapper from "../../store/configureStore";

const Post = () => {
  const router = useRouter();
  const { singlePost } = useSelector((store) => store.post);
  const { id } = router.query;
  return (
    <AppLayout>
      <Head>
        <title>{singlePost.User.nickname}님의 게시글</title>
        <meta name="description" content={singlePost.content} />
        <meta name="og:title" content={`${singlePost.User.nickname}`} />
        <meta name="og:description" content={singlePost.content} />
        <meta
          name="og:image"
          content={
            singlePost.Images[0]
              ? singlePost.Images[0].src
              : "https://nodebird.com/favicon.ico"
          }
        />
        <meta name="og:url" content={`https://nodebird.com/post/${id}`} />
      </Head>

      <PostCard post={singlePost}></PostCard>
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
    console.log(context.params.id);
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_POST_REQUEST,
      data: context.params.id,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Post;
