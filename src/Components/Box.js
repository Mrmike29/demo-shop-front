import React from 'react';

function Box({ header, body }) {
  return (
    <div className='app-box'>
      <div className='box-header'>
        { header }
      </div>
      <div className='box-body'>
        { body }
      </div>
    </div>
  );
}

export default Box;
