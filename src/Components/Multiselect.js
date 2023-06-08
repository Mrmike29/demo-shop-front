import React, { useState } from 'react';

function Multiselect({ data, setValue }) {
  // Variables for Multiselect value
  const [selectedVal, setSelectedVal] = useState([]);

  // Handle change on Multiselect and set new values
  const handleSelect = (event) => {
    const options = Array.from(event.target.options);
    const opSelected = options.filter((option) => option.selected);

    const selectedCat = opSelected.map((option) => option.value);
    
    setSelectedVal([...selectedVal, selectedCat]);
    setValue([...selectedVal, selectedCat])
    
    selectedVal.filter((op, key) => { 
      if (op[0] === selectedCat[0]) {
        delete selectedVal[key];
        setSelectedVal(selectedVal.filter(elements => elements !== null));
        setValue(selectedVal.filter(elements => elements !== null))
      } 
    })
  };

  // Create Multiselect component to choose date from data variable
  return (
    <div>
        <select multiple value={selectedVal} onChange={handleSelect} className="multi-select">
          {data.map((item) => (
            <option key={item.id} value={item.id}>{ item.name }</option>
          ))}
        </select>
    </div>
  );
}

export default Multiselect;
