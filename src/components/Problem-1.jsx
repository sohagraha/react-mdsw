import React, { useEffect, useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    status: "",
  });

  const handleClick = (val) => {
    setShow(val);
  };

  useEffect(() => {
    if (show === "all") {
      setFilteredData(data.sort((a, b) => a.group - b.group));
    } else {
      if (show === "active") {
        setFilteredData(
          data.filter((item) => item.status.toLowerCase() === "active")
        );
      } else {
        setFilteredData(
          data.filter((item) => item.status.toLowerCase() === "completed")
        );
      }
    }
  }, [show, data]);

  const handleSubmit = (formData) => {
    if (formData.name && formData.status) {
      setData([
        ...data,
        {
          name: formData.name,
          status: formData.status,
          group:
            formData.status.toLowerCase() === "active"
              ? 1
              : formData.status.toLowerCase() === "completed"
              ? 2
              : 3,
        },
      ]);
      setFormData({
        name: "",
        status: "",
      });
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form className="row gy-2 gx-3 align-items-center mb-4">
            <div className="col-auto">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  });
                }}
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                value={formData.status}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    status: e.target.value,
                  });
                }}
                className="form-control"
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(formData);
                }}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
