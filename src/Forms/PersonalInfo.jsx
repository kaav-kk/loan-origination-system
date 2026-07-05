import React, { useState } from "react";

const PersonalInfo = ({
  data,
  setData,
  loanApplication,
  setLoanApplication,
  saveLoan,
  next
}) => {

  const [errors, setErrors] = useState({});

  const requiredFields = {
    customerName: "Customer Name",
    mobile: "Mobile Number"
  };

  // Update input fields
  const handleChange = (e) => {

    const { name, value } = e.target;

    const updatedData = {

      ...data,

      [name]: value

    };

    setData(updatedData);

  };

  // Save Personal Info
  const handleNext = () => {

    const validateErrors = {};

    Object.entries(requiredFields).forEach(([field, label]) => {

      if (!data[field]?.trim()) {

        validateErrors[field] = `${label} is required`;

      }

    });

    setErrors(validateErrors);

    if (Object.keys(validateErrors).length > 0) {

      return;

    }

    const updatedLoan = {

      ...loanApplication,

      personalInfo: data,

      step: 2,

      status: "In Progress"

    };

    setLoanApplication(updatedLoan);

    saveLoan(updatedLoan);

    next(2);

  };

  return (

    <>

      <h2>Personal Information</h2>

      <input
        type="text"
        placeholder="Customer Name"
        name="customerName"
        value={data.customerName}
        onChange={handleChange}
      />

      <p style={{ color: "red" }}>
        {errors.customerName}
      </p>

      <input
        type="text"
        placeholder="Age"
        name="age"
        value={data.age}
        onChange={handleChange}
      />

      <input
        type="text"
        placeholder="Mobile Number"
        name="mobile"
        value={data.mobile}
        onChange={handleChange}
      />

      <p style={{ color: "red" }}>
        {errors.mobile}
      </p>

      <input
        type="text"
        placeholder="Address"
        name="address"
        value={data.address}
        onChange={handleChange}
      />

      <br />
      <br />
     
     <div className="form-buttons">
<button onClick={handleNext}>
        Save & Next
      </button>
     </div>
      

    </>

  );

};

export default PersonalInfo;