import React from 'react';

const CD = function (props) {
  return (
    <div className='cd'>
      <form>
        <input
          type={'text'}
          defaultValue={'URL Link'}
          onChange={(e) => {
            e.preventDefault();
            props.setNewUrl(e.target.value);
          }}
        />
        <button onClick={props.handle}>Submit New Meme URL</button>
      </form>
    </div>
  );
};

export default CD;
