import React from 'react';

const List = ({ data }) => {
    console.log(data, 'x');
    return (
  <ul>
      {data.map((d, i) => (
          <li key={i} className="list-item"><span className="number">{i + 1}.</span> {d.toUpperCase()}</li>
      ))}
  </ul>
)};

export default List;
