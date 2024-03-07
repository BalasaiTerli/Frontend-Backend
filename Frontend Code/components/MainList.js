import React from 'react'

const MainList = ({currentData}) => {
  return (
        <>
      {currentData.map((eachUser, index) => (
        <tr key={index}>
          <td>{eachUser["s.no"]}</td>
          <td>{eachUser.customer_name}</td>
          <td>{eachUser.age}</td>
          <td>{eachUser.phone}</td>
          <td>{eachUser.location}</td>
          <td>{eachUser.extracted_date.split("T")[0]}</td>
          <td>{eachUser.extracted_time}</td>
        </tr>
      ))}
      </>
  );
}

export default MainList;