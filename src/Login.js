// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // Import your CSS file

function Login() {
  const [deliveryPerson, setDeliveryPerson] = useState({
    deliveryPersonID: "",
  });
  const navigate = useNavigate();
  const setInput = (e) => {
    const { name, value } = e.target;
    setDeliveryPerson((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const login = async () => {
    try {
      const response = await axios.post("/api/login", {
        ID: deliveryPerson.deliveryPersonID,
      });
      if (response.status === 200) {
        // Login successful
        const userDetails = response.data;
        // Redirect to App.js and pass user details as a prop
        navigate(`/app/${userDetails.deliveryPersonID}`, {
          state: userDetails,
        });
      } else {
        // Handle unsuccessful login
        console.log("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const deleteUserDetails = async () => {
    try {
      const response = await axios.delete(
        `/api/person/${deliveryPerson.deliveryPersonID}`
      );
      console.log(response);
      if (response.status === 200) {
        console.log("deleted");
        window.alert(`${deliveryPerson.deliveryPersonID} Deleted`);
      } else {
        console.error("Failed to fetch delivery person");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const updateUserDetails = async () => {
    try {
      const response = await axios.post("/api/login", {
        ID: deliveryPerson.deliveryPersonID,
      });
      if (response.status === 200) {
        navigate(`/update/${deliveryPerson.deliveryPersonID}`, {
          state: response.data,
        });
      } else {
        // Handle unsuccessful login
        console.log("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createOrderDetails = async () => {
    try {
      const response = await axios.post("/api/login", {
        ID: deliveryPerson.deliveryPersonID,
      });
      if (response.status === 200) {
        navigate(`/create/${deliveryPerson.deliveryPersonID}`, {
          state: response.data,
        });
      } else {
        // Handle unsuccessful login
        console.log("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="user-details-container">
      <h2>User Details</h2>
      <div className="input-group">
        <label htmlFor="deliveryPersonID">Delivery Personnel ID:</label>
        <input
          type="text"
          id="deliveryPersonID"
          name="deliveryPersonID"
          placeholder="Enter ID"
          onChange={setInput}
        />
      </div>
      <div className="button-group">
        <button onClick={login} className="fetch-button">
          Fetch User Details
        </button>
        <button onClick={updateUserDetails} className="fetch-button">
          Update Details
        </button>
        <button onClick={deleteUserDetails} className="delete-button">
          Delete User
        </button>
        <button onClick={createOrderDetails} className="create-button">
          Create Order
        </button>
      </div>
    </div>
  );
}

export default Login;
