import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Icon } from '@iconify/react';

export default function UserDetails() {

  const [selectedValue, setSelectedValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState("")

  const getFacts = async () => {
    const res = await fetch("https://randomuser.me/api/?results=20");
    return res.json();
  };

  const { data, error, isLoading } = useQuery('randomFacts', getFacts);
  const [userData, setUserData] = useState([])
  
  useEffect(() => {
    setUserData(data?.results)
  }, [data])



  
  // Error and Loading states
  // if (error) return <div>Request Failed</div>;
  // if (isLoading) return <div>Loading...</div>;


  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const handleSearch = () => {
    const filteredResults = userData.filter(
      (user) =>
        user?.name?.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.name?.last.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.location?.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.gender.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setUserData(filteredResults);
  };

 

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    // filterDataByAge(selectedValue);
  };


  const filterDataByAge = (age) => {
    if (age === '61') {
      setUserData(userData.filter((user) => user?.dob?.age >= 61));
    } else if (age === '30') {
      setUserData(userData.filter((user) => user?.dob?.age <= 30));
    } else {
      const minAge = parseInt(age) - 30;
      setUserData(
        userData.filter((user) => user?.dob?.age <= parseInt(age) && user?.dob?.age > minAge)
      );
    }
  };

  useEffect(() => {
    filterDataByAge(selectedOption);
  }, [selectedOption]);
 
  const options = [
    { value: 30, label: '0 - 30' },
    { value: 60, label: '31 - 60' },
    { value: 61, label: '61 Upward' },
  ];


 
  return (
    <div className="w-full px-4 py-8">
      <h2 className="text-xl font-semibold mb-4">User Profile</h2>
      <div className="flex my-5 bg-gray-200 flex-col md:flex-row justify-between border-2 px-4 items-center border-solid border-black">
        <div className="relative sm:w-3/4 md:w-1/2 py-2.5">
          <input
            className="w-full p-2"
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search by name, nationality, or gender"
          />
          <span onClick={handleSearch}>
            <Icon className="absolute top-[22px] right-3" icon="fluent:search-24-filled" color="black" width="20" height="20" />
          </span>
        </div>
        <div className="flex gap-4">
          <div className="flex" >
            <select value={selectedOption} onChange={handleSelectChange}>
              <option value="">Filter by age range</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-500">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-500 px-4 py-2">ID</th>
              <th className="border border-gray-500 px-4 py-2">Name</th>
              <th className="border border-gray-500 px-4 py-2">Age</th>
              <th className="border border-gray-500 px-4 py-2">Gender</th>
              <th className="border border-gray-500 px-4 py-2">Nationality</th>
            </tr>
          </thead>
          <tbody>
            {userData?.map((user, index) => (
              <tr key={user?.name?.first} className="text-center">
                <td className="border border-gray-500 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-500 px-4 py-2">{user?.name?.title} {user?.name?.first} {user?.name?.last}</td>
                <td className="border border-gray-500 px-4 py-2">{user?.dob?.age}</td>
                <td className="border border-gray-500 px-4 py-2 capitalize">{user?.gender}</td>
                <td className="border border-gray-500 px-4 py-2">{user?.location?.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
