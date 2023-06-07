import React from 'react';

// Table to show data
function Table({ data, headers, body }) {
  // Returns table component with headers and body integrated
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
