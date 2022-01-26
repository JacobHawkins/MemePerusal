/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import React, { useState, useEffect, createContext } from 'react';
import Photo from './Components/photo.jsx';
import Axios from 'axios';

export const AppContext = createContext(null);

const App = function () {
  const [url, setUrl] = useState(
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/womanyellingcat-1573233850.jpg'
  );
  const [name, setName] = useState('Woman Yelling Cat');
  const [fav, setFav] = useState(false);
  const [select, setSelect] = useState(1);

  // const getPhoto = () => {
  //   Axios.get("http://localhost:3001/").then((response) => {
  //     console.log(response);
  //   })
  // }

  useEffect(async () => {
    try {
      const response = await Axios.get('http://localhost:3001/');
      const array = response.data; //id,url,name,fav
      console.log('bingo!', array);
    } catch (error) {
      console.log(error);
    }
  }, [select]);

  return (
    <AppContext.Provider
      value={{
        url,
        setUrl,
        name,
        setName,
        fav,
        setFav,
        select,
        setSelect,
      }}
    >
      <div className='App'>
        <Photo />
      </div>
    </AppContext.Provider>
  );
};

export default App;
