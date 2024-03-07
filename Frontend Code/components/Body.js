import React, { useState, useEffect } from "react";
import useAPI from "../Hooks/useApi";
import "./index.css";
import Pagination from "./pagination";
import MainList from "./MainList";

const Body = () => {

  const [initialPage, setInitialPage] = useState(1);
  const [postPage, setPostPage] = useState(20);

  const [datas, setDatas] = useState([]);

  const [sortOrder, setSortOrder] = useState({ date: "asc", time: "asc" });



  const data = useAPI("http://localhost:7000/customers");


    const onHandleInput = (event) => {
      
    const filteredDataName = data.filter((eachCustomer) =>
      eachCustomer.customer_name
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );

    const filteredDataLocation = data.filter((eachCustomer) =>
      eachCustomer.location
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );

    setDatas([...filteredDataLocation, ...filteredDataName]);
  };

  useEffect(() => {
    setDatas(data);
  }, [data]);

  const handleSort = (column) => {
    let sortedData = [...datas];

    sortedData.sort((a, b) => {

      if (column === "date") {
        const dateA = new Date(a.extracted_date);
        const dateB = new Date(b.extracted_date);
        return sortOrder[column] === "asc" ? dateA - dateB : dateB - dateA;

      } 

      else if (column === "time") {
        const timeA = new Date("1970-01-01T" + a.extracted_time);
        const timeB = new Date("1970-01-01T" + b.extracted_time);
        return sortOrder[column] === "asc" ? timeA - timeB : timeB - timeA;
      }

      return 0;

    });

    setDatas(sortedData);

    setSortOrder((prevSortOrder) => ({
      ...prevSortOrder,
      [column]: prevSortOrder[column] === "asc" ? "desc" : "asc",
    }));
  };

  const getSortIndicator = (column) => {
    if (sortOrder[column]) {
      return sortOrder[column] === "asc" ? "▲" : "▼"
    }
    return "";
  };


  let firstSlice = initialPage * postPage;
  let lastSlice = firstSlice - postPage;
  
  const currentData = (datas || []).slice(lastSlice, firstSlice);

  return (

    <div>
      <div className="inputBox">
        <input
          type="text"
          placeholder="Search by name or location"
          onChange={onHandleInput}
        />
      </div>

      
      <table>

        <thead>
          <tr>
            <th className="header">S.no</th>
            <th className="header">Customer_name</th>
            <th className="header">Age</th>
            <th className="header">Phone</th>
            <th className="header">Location</th>
            <th className="header cursor" onClick={() => handleSort("date")}>
              Date {getSortIndicator("date")}
            </th>
            <th className="header cursor" onClick={() => handleSort("time")}>
              Time {getSortIndicator("time")}
            </th>
          </tr>
        </thead>

        <tbody>
          <MainList currentData = {currentData} />
        </tbody>

      </table>


      <Pagination
        postPage={postPage}
        setInitialPage={setInitialPage}
        currentPage={initialPage}
      />

    </div>
  );
};

export default Body;
