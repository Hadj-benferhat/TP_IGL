import React from 'react';

const HeaderTable = ({ header = [] }) => {
  return (
      <thead>
      <tr>
        {header.map((item, index) => (
                    // console.log(index),

          <th key={index} className={item}>
            {item}
          </th>
        ))}
      </tr>
      
                <tr className="separator-row">
                  <td colSpan="5"></td>
                </tr>
            
    </thead>
    
  );
};

export default HeaderTable;
