import React, { useContext } from 'react';
import { AppContext } from '../App';

const Photo = function () {
  const { url } = useContext(AppContext);
  const { name } = useContext(AppContext);

  console.log('yahtzee!', url, name);

  return <img src={url} alt={name} />;
};

export default Photo;
