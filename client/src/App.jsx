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
  const [select, setSelect] = useState(0);
  const [arrayData, setArrayData] = useState([]);
  const [setup] = useState(0);

  const handleClickPrev = () => {
    arrayData.forEach((meme) => {
      if (meme.id === select) {
        var last = arrayData.length - 1;
        if (select === 1) {
          setSelect(arrayData[last].id);
        } else {
          setSelect(select - 1);
        }
      }
    });
  };

  const handleClickNext = () => {
    arrayData.forEach((meme) => {
      if (meme.id === select) {
        var last = arrayData.length - 1;
        if (select === arrayData[last].id) {
          setSelect(1);
        } else {
          setSelect(select + 1);
        }
      }
    });
  };

  useEffect(async () => {
    try {
      const response = await Axios.get('http://localhost:3001/num');
      const array = response.data; //id,num
      setSelect(array[0].num);
    } catch (error) {
      console.log(error);
    }
  }, [setup]);

  useEffect(async () => {
    try {
      const response = await Axios.get('http://localhost:3001/');
      const array = response.data; //id,url,name,fav
      setArrayData(array);
      array.forEach((meme) => {
        if (meme.id === select) {
          setName(meme.name);
          setUrl(meme.url);
        }
      });
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
        <div className='Carousel'>
          <button onClick={handleClickPrev}>Previous</button>
          <Photo />
          <button onClick={handleClickNext}>Next</button>
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
