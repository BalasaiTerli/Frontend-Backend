import React from "react";
import { useEffect, useState } from "react";

const useAPI = (url) => {
  const [data, setData] = useState();

  const fetchData = async () => {
    const apiData = await fetch(url);
    const jsonData = await apiData.json();
    setData(jsonData);
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return data;
};

export default useAPI;
