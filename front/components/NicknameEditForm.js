import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_NICKNAME_REQUEST } from '../action';
import useInput from '../hooks/useInput';
const NicknameEditForm = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((stroe) => stroe.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  };
  return (
    <div className='p-5  border-solid border-2 border-sky-500 mt-3'>
      <form className='border-solid border-2 border-sky-500 flex h-14'>
        <label className=''>닉네임</label>
        <input type='text' className=' flex-1 border-solid border-l-2 border-r-2 border-sky-500' value={nickname} onChange={onChangeNickname} />
        <button onClick={onSubmit}>수정</button>
      </form>
    </div>
  );
};

export default NicknameEditForm;
