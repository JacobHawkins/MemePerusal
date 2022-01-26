import React, { useContext } from 'react';
import { AppContext } from '../App';

const Photo = function () {
  const { url } = useContext(AppContext);
  const { name } = useContext(AppContext);

  return <img src={url} alt={name} width={'500'} height={'500'} />;
};

export default Photo;
