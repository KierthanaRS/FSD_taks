"use client";
import React from "react";
import { useState } from "react";

export default function Home() {
  const [Form, setForm] = useState({
    firstName: "",
    lastName: "",
    employeeId: "",
    email: "",
    phone: "",
    department: "",
    joiningDate: "",
    role: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    employeeId: "",
    email: "",
    phone: "",
    department: "",
    joiningDate: "",
    role: "",
  });

  const validateErrors = (name, value) => {
    let err = "";
    switch (name) {
      case "firstName":
        if (value.trim() === "") {
          err = "First Name is required";
        }
        break;
      case "lastName":
        if (value.trim() === "") {
          err = "Last Name is required";
        }
        break;
      case "employeeId":
        if (value.trim() === "") {
          err = "Employee Id is required";
        }
        if (value.length > 10) {
          err = "Employee Id should be less than 10 characters";
        }
        break;
      case "email":
        if (value != "" && !/^\S+@\S+\.\S+/.test(value)) {
          err = "Email is not valid";
        }
        break;
      case "phone":
        if (value.trim() === "" || !/^[0-9]{10}$/.test(value)) {
          err = "Phone number is invalid";
        }
        break;
      case "department":
        if (value.trim() === "") {
          err = "Deaprtment is required";
        }
        break;
      case "joiningDate":
        const today = new Date().toISOString().split("T")[0];
        if (value > today) err = "Future Dates are not allowed";
        break;
      case "role":
        if (value.trim() === "") {
          err = "Role is required";
        }
        break;
    }
    setErrors({ ...errors, [name]: err });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...Form, [name]: value });
    validateErrors(name, value);
  };
  const handleReset=()=>{
    setForm({
      firstName: "",
    lastName: "",
    employeeId: "",
    email: "",
    phone: "",
    department: "",
    joiningDate: "",
    role: "",
    })

  }
  const handleSubmit = async (e) => {
    const isValid = Object.values(errors).every((err) => err === "");
    if (!isValid) {
      alert("Fix all the errors before submitting");
      return;
    }
    const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post-data`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Form),
    });
    const data=await result.json();
    if(result.ok){
      alert("Employee Data submitted successfully")
      handleReset();
    }
    else{
      alert(`Error: ${data.message} ${data.error.sqlMessage}`)
    }
  };
  return (
    <div className="bg-primary min-h-screen   flex flex-col p-4">
      <h1 className=" text-4xl text-textcolour mt-5 ml-[40%]">Add Employee</h1>
      <form className="flex flex-col mt-5 ml-[35%] border-solid-white border-secondary p-4 rounded-md">
        <div className="block">
          <label className="text-textcolour p-2 font-bold"> First Name</label>
          <input
            className="rounded-md p-2 focus:outline-blue-500 text-primary"
            type="text"
            name="firstName"
            value={Form.firstName}
            placeholder="First Name"
            onChange={handleChange}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
          )}
        </div>
        <div className="mt-5">
          <label className="text-textcolour p-2 font-bold"> Last Name</label>
          <input
            className="rounded-md p-2 focus:outline-blue-500 text-primary"
            type="text"
            name="lastName"
            value={Form.lastName}
            placeholder="Last Name"
            onChange={handleChange}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
          )}
        </div>
        <div className="mt-5">
          <label className="text-textcolour p-2 font-bold">Employee Id</label>
          <input
            className="rounded-md p-2 focus:outline-blue-500 text-primary"
            type="text"
            name="employeeId"
            value={Form.employeeId}
            placeholder="Eployee Id"
            onChange={handleChange}
          />
          {errors.employeeId && (
            <p className="text-sm text-red-500 mt-1">{errors.employeeId}</p>
          )}
        </div>
        <div className="mt-5">
          <label className="text-textcolour p-2 font-bold"> Email</label>
          <input
            className="rounded-md p-2 focus:outline-blue-500 text-primary"
            type="email"
            name="email"
            value={Form.email}
            placeholder="Email"
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mt-5">
          <label className="text-textcolour p-2 font-bold">Phone Number</label>
          <input
            className="rounded-md p-2 focus:outline-blue-500 text-primary"
            type="text"
            name="phone"
            value={Form.phone}
            placeholder="Phone Number"
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>
        <div className="mt-5">
          <label className="text-textcolour p-2 font-bold">Department</label>
          <select
            className="rounded-md p-2 focus:outline-blue-500 text-primary"
            name="department"
            value={Form.department}
            placeholder="Department"
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
          </select>
          {errors.department && (
            <p className="text-sm text-red-500 mt-1">{errors.department}</p>
          )}
        </div>
        <div className="mt-5">
          <label className="text-textcolour p-2 font-bold">
            Date of Joining
          </label>
          <input
            className="rounded-md p-2 focus:outline-blue-500 text-primary"
            type="Date"
            name="joiningDate"
            value={Form.joiningDate}
            placeholder="Date of Joining"
            onChange={handleChange}
          />
          {errors.joiningDate && (
            <p className="text-sm text-red-500 mt-1">{errors.joiningDate}</p>
          )}
        </div>
        <div className="mt-5">
          <label className="text-textcolour p-2 font-bold"> Role</label>
          <input
            className="rounded-md p-2 focus:outline-blue-500 text-primary"
            type="text"
            name="role"
            value={Form.role}
            placeholder="Role"
            onChange={handleChange}
          />
          {errors.role && (
            <p className="text-sm text-red-500 mt-1">{errors.role}</p>
          )}
        </div>
      </form>
      <button
        className="bg-secondary text-primary hover:bg-textcolour w-[100px] p-2 rounded-lg align-middle justify-center ml-[43%] mt-4"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
