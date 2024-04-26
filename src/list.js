import React, { useEffect, useState } from 'react';
import './list.css';

const UserList = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/user/list' , {
          headers : {
            'Content-type' : 'application/json'
          }
        })
        const jsonData = await response.json();
        setUserData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Contact No</th>
            <th>Previous Experience</th>
            <th>Is Admin</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.oidc_id}>
              <td>{user.oidc_id}</td>
              <td>{user.first_name}</td>
              <td>{user.middle_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.designation}</td>
              <td>{user.phone_number}</td>
              <td>{user.previous_exp}</td>
              <td>{String(user.is_admin)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

