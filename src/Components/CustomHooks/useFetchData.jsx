import { useState, useEffect } from "react";

export default function useFetchData(
  initialValue = [],
  type = "",
  id = "",
  option = "",
) {
  const [data, setData] = useState(initialValue);
  const [dataLoading, setDataLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      try {
        setDataLoading(true);
        const request = await fetch(
          `https://api.jikan.moe/v4/${type}/${id}/${option}`,
        );
        const { data } = await request.json();
        setData(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setDataLoading(false);
      }
    }
    getData();
  }, [type, id, option]);
  return [data, dataLoading];
}
