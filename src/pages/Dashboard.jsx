import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Dashboard.css";

const Dashboard = () => {

  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const [showPopup, setShowPopup] = useState(false);
  const [loanType, setLoanType] = useState("");
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [confirmType, setConfirmType] = useState("");
  const [selectedLoan, setSelectedLoan] = useState(null);

  const [activeQueue, setActiveQueue] = useState(
    role === "APPROVER"
      ? "Approval Pending"
      : "In Progress"
  );

  const allLoans =
    JSON.parse(localStorage.getItem("loanApplication")) || [];

  const filteredLoans = allLoans.filter(
    loan => loan.status === activeQueue
  );

  const logout = () => {
    navigate("/");
  };

  const continueLoan = (loan) => {

    localStorage.setItem(
      "selectedLoan",
      JSON.stringify(loan)
    );

    navigate("/CreateLoan");

  };

  const viewLoan = (loan) => {

    localStorage.setItem(
      "selectedLoan",
      JSON.stringify(loan)
    );

    navigate("/view-loan");

  };

  const approveLoan = (loan) => {

    const updatedLoans = allLoans.map(item =>
      item.loanId === loan.loanId
        ? { ...item, status: "Loan Sanctioned" }
        : item
    );

    localStorage.setItem(
      "loanApplication",
      JSON.stringify(updatedLoans)
    );

    window.location.reload();

  };

  const rejectLoan = (loan) => {

    const updatedLoans = allLoans.map(item =>
      item.loanId === loan.loanId
        ? { ...item, status: "Rejected" }
        : item
    );

    localStorage.setItem(
      "loanApplication",
      JSON.stringify(updatedLoans)
    );

    window.location.reload();

  };

  const proceed = () => {

    if (!loanType) {

      alert("Please select Loan Type");
      return;

    }

    localStorage.removeItem("selectedLoan");
    localStorage.setItem("loanType", loanType);

    setShowPopup(false);

    navigate("/CreateLoan");

  };

  const getStepName = (step) => {

    switch (step) {

      case 1:
        return "Personal Info";

      case 2:
        return "Loan Details";

      case 3:
        return "Eligibility";

      case 4:
        return "Disbursement";

      default:
        return "-";

    }

  };

  return (

  <div className="dashboard-page">

    <div className="top-bar">

      {role === "INITIATOR" && (

        <button
          className="create-btn"
          onClick={() => setShowPopup(true)}
        >
          + Create Loan
        </button>

      )}

      <div className="nav-pill">

        <ul>

          {role === "INITIATOR" && (

            <li
              className={activeQueue === "In Progress" ? "active-tab" : ""}
              onClick={() => setActiveQueue("In Progress")}
            >
              In Progress
            </li>

          )}

          <li
            className={activeQueue === "Approval Pending" ? "active-tab" : ""}
            onClick={() => setActiveQueue("Approval Pending")}
          >
            Approval Pending
          </li>

          <li
            className={activeQueue === "Loan Sanctioned" ? "active-tab" : ""}
            onClick={() => setActiveQueue("Loan Sanctioned")}
          >
            Loan Sanctioned
          </li>

          {role === "APPROVER" && (

            <li
              className={activeQueue === "Rejected" ? "active-tab" : ""}
              onClick={() => setActiveQueue("Rejected")}
            >
              Rejected
            </li>

          )}

        </ul>

      </div>

      <div className="user-info">

        <span>👤 {username}</span>

        <button onClick={logout}>
          Logout
        </button>

      </div>

    </div>

    <div className="queue-container">

      <h2>{activeQueue} Queue</h2>

      {filteredLoans.length === 0 ? (

        <div className="empty-card">
          No Cases Available
        </div>

      ) : (

        <table className="loan-table">

          <thead>

            <tr>

              <th>Loan ID</th>

              <th>Customer Name</th>

              <th>Loan Type</th>

              <th>Current Step</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredLoans.map((loan) => (

              <tr key={loan.loanId}>

                <td>{loan.loanId}</td>

                <td>{loan.personalInfo.customerName}</td>

                <td>{loan.loanType}</td>

                <td>{getStepName(loan.step)}</td>

                <td>

                  {activeQueue === "In Progress" && (

                    <button
                      className="action-btn"
                      onClick={() => continueLoan(loan)}
                    >
                      Continue
                    </button>

                  )}

                  {role === "INITIATOR" &&
                   activeQueue === "Approval Pending" && (

                   <span className="status-text">
                   Awaiting Approval
                   </span>

                  )}

                  {role === "APPROVER" &&
                    activeQueue === "Approval Pending" && (
                    
                    <div className="action-buttons">

                   <button
                    className="view-btn"
                    onClick={() => viewLoan(loan)}
                    >
                   View
                  </button>

                 <button
                 className="approve-btn"
                 onClick={() => {
                 setSelectedLoan(loan);
                 setConfirmType("Approve");
                 setConfirmPopup(true);
                 }}
                 >
                  Approve
                 </button>

                  <button
                   className="reject-btn"
                   onClick={() => {
                   setSelectedLoan(loan);
                   setConfirmType("Reject");
                   setConfirmPopup(true);
                   }}
                  >
                  Reject
                  </button>

                  </div>

                  )}

                  {activeQueue === "Loan Sanctioned" && (

                    <button
                      className="view-btn"
                      onClick={() => viewLoan(loan)}
                    >
                      View
                    </button>

                  )}

                  {activeQueue === "Rejected" && (

                    <button
                      className="reject-btn"
                      disabled
                    >
                      Rejected
                    </button>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

    {showPopup && (

      <div className="modal-overlay">

        <div className="modal">

          <h2>Select Loan Type</h2>

          <label>

            <input
              type="radio"
              name="loanType"
              value="HL"
              onChange={(e) => setLoanType(e.target.value)}
            />

            HL

          </label>

          <br />

          <label>

            <input
              type="radio"
              name="loanType"
              value="LAP"
              onChange={(e) => setLoanType(e.target.value)}
            />

            LAP

          </label>

          <br />
          <br />

          <button onClick={proceed}>
            Proceed
          </button>

          <button onClick={() => setShowPopup(false)}>
            Cancel
          </button>

        </div>

      </div>

    )}
    

    {confirmPopup && (

<div className="modal-overlay">

  <div className="modal">

    <h2>

      {confirmType === "Approve"
        ? "Approve Loan"
        : "Reject Loan"}

    </h2>

    <p>

      Are you sure you want to

      <b> {confirmType.toLowerCase()} </b>

      this loan?

    </p>

    <button

      className={
        confirmType === "Approve"
          ? "approve-btn"
          : "reject-btn"
      }

      onClick={() => {

        if (confirmType === "Approve") {

          approveLoan(selectedLoan);

        } else {

          rejectLoan(selectedLoan);

        }

        setConfirmPopup(false);

      }}

    >

      Yes

    </button>

    <button
      onClick={() => setConfirmPopup(false)}
    >
      Cancel
    </button>

  </div>

</div>

)}

  </div>

);
};

export default Dashboard;