import axios from 'axios';
import React, { useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import wrapper from '../../store/configureStore';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_POSTS_REQUEST, LOAD_USER_REQUEST } from '../../action/index';
import PostCard from '../../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';

const User = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { mainPosts, hasMorePosts, loadPostLoading } = useSelector((store) => store.post);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostLoading) {
          dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
            data: id,
          });
        }
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePosts, id, loadPostLoading]);

  return (
    <AppLayout>
      {mainPosts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: context.params.id,
  });
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: context.params.id,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default User;
