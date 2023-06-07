import React from 'react';

// Box for forms and modals
function Box({ header, body }) {
  // Returns box component with header and body integrated
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
