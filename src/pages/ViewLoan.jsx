import React from "react";
import { useNavigate } from "react-router-dom";
import "../ViewLoan.css";

const ViewLoan = () => {

  const navigate = useNavigate();

  const loan = JSON.parse(
    localStorage.getItem("selectedLoan")
  );

  if (!loan) {
    return <h2>No Loan Found</h2>;
  }

  return (

    <div className="view-page">

      <div className="view-card">

        <h1>Loan Application</h1>

        <div className="section">

          <h3>Loan Information</h3>

          <p><b>Loan ID :</b> {loan.loanId}</p>

          <p><b>Loan Type :</b> {loan.loanType}</p>

          <p><b>Status :</b> {loan.status}</p>

        </div>

        <div className="section">

          <h3>Personal Information</h3>

          <p><b>Name :</b> {loan.personalInfo.customerName}</p>

          <p><b>Age :</b> {loan.personalInfo.age}</p>

          <p><b>Mobile :</b> {loan.personalInfo.mobile}</p>

          <p><b>Address :</b> {loan.personalInfo.address}</p>

        </div>

        <div className="section">

          <h3>Loan Details</h3>

          <p><b>Loan Amount :</b> {loan.loanDetails.loanAmount}</p>

          <p><b>Tenure :</b> {loan.loanDetails.tenure}</p>

          <p><b>Purpose :</b> {loan.loanDetails.purpose}</p>

        </div>

        <div className="section">

          <h3>Eligibility</h3>

          <p><b>Annual Income :</b> {loan.eligibility.income}</p>

          <p><b>CIBIL Score :</b> {loan.eligibility.cibilScore}</p>

          <p><b>Employment :</b> {loan.eligibility.employmentType}</p>

        </div>

        <div className="section">

          <h3>Disbursement</h3>

          <p><b>Account Number :</b> {loan.disbursement.accountNumber}</p>

          <p><b>IFSC :</b> {loan.disbursement.ifscCode}</p>

        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/Dashboard")}
        >
          Back
        </button>

      </div>

    </div>

  );

};

export default ViewLoan;