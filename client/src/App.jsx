/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import React, { useState, useEffect, createContext } from 'react';
import Photo from './Components/photo.jsx';
import CD from './Components/C_D.jsx';
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
  const [newUrl, setNewUrl] = useState('');
  const [setup] = useState(0);

  const handleClickPrev = () => {
    arrayData.forEach(async (meme) => {
      if (meme.id === select) {
        var last = arrayData.length - 1;
        if (select === 1) {
          setSelect(arrayData[last].id);
          try {
            await Axios.post(
              `http://localhost:3001/select?select=${arrayData[last].id}`
            );
          } catch (error) {
            console.log(error);
          }
        } else {
          setSelect(select - 1);
          try {
            await Axios.post(
              `http://localhost:3001/select?select=${select - 1}`
            );
          } catch (error) {
            console.log(error);
          }
        }
      }
    });
  };

  const handleClickNext = async () => {
    arrayData.forEach(async (meme) => {
      if (meme.id === select) {
        var last = arrayData.length - 1;
        if (select === arrayData[last].id) {
          setSelect(1);
          try {
            await Axios.post(`http://localhost:3001/select?select=${1}`);
          } catch (error) {
            console.log(error);
          }
        } else {
          setSelect(select + 1);
          try {
            await Axios.post(
              `http://localhost:3001/select?select=${select + 1}`
            );
          } catch (error) {
            console.log(error);
          }
        }
      }
    });
  };

  const handleClickAdd = async (e) => {
    e.preventDefault();
    try {
      await Axios.post(`http://localhost:3001/new?new=${newUrl}`);
      console.log('Added Meme!');
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickDelete = async (e) => {
    e.preventDefault();
    try {
      var happened = await Axios.post(
        `http://localhost:3001/delete?delete=${select}`
      );
      console.log('Deleted Meme!');
      if (happened) {
        setSelect(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    try {
      const response = await Axios.get('http://localhost:3001/num');
      const array = response.data; //id,num
      setSelect(array[0].num);
      if (arrayData.length === 0) {
        try {
          await Axios.post(`http://localhost:3001/select?select=${1}`);
        } catch (error) {
          console.log(error);
        }
      }
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
        <CD newUrl={newUrl} setNewUrl={setNewUrl} handle={handleClickAdd} />
        <button onClick={handleClickDelete}>Delete</button>
      </div>
    </AppContext.Provider>
  );
};

export default App;
