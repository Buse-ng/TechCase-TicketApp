import axios from "axios";
import React, { useEffect, useState } from "react";

const SearchArea = ({ filter, setFilter, data }) => {
  const [city, setCity] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [newValue, setNewValue] = useState("");
  useEffect(() => {
    const fetchCity = async () => {
      const res = await axios.get("http://localhost:5030/api/city");
      const data = await res.data.city;
      setCity(data);
    };

    fetchCity();
  }, []);

  const handleCity = async (e) => {
    setNewValue(e.target.value);
    const filterCity = await data.filter((v) => v.city === e.target.value);
    setSelectValue(filterCity);
    setFilter(filterCity);
  };
  console.log("selectValue", selectValue);
  // console.log("city", city)
  // console.log("value", value);
  return (
    <>
      <div>
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select an option
        </label>
        <select
          id="countries"
          value={newValue}
          className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
          onChange={handleCity}
        >
          <option defaultValue="Choose a country">Default Value</option>
          {city &&
            city.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      {/* {filter.length > 0 ? (
        <>
          {filter.map((activity) => (
            <p key={activity._id}>{activity.title}</p>
          ))}
        </>
      ) : (
        <p>Veri bulunamadı</p>
      )} */}
    </>
  );
};

export default SearchArea;
