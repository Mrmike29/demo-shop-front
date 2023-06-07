import React from 'react';

function Table({ data, headers, body }) {
  return (
    <div>
      <table className='table'>
        <thead className='table-head'>
          <tr>
            {headers.map((item) => (
              <td key={item.name}>{item.name}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          { body }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
