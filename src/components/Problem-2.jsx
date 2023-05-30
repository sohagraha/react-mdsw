import React from "react";
import { useNavigate } from "react-router-dom";

const Problem2 = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg"
            style={{
              backgroundColor: "#46139f",
              color: "#fff",
            }}
            type="button"
            onClick={() => {
              navigate("/all-contact");
            }}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg"
            style={{
              backgroundColor: "#ff7f50",
            }}
            type="button"
            onClick={() => {
              navigate("/us-contact");
            }}
          >
            US Contacts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Problem2;
