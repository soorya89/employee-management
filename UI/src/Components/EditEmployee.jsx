import React, { useState, useEffect } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ArrowLeft } from "react-bootstrap-icons";

function EditEmployee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    salary: "",
    address: "",
    city: "",
    state: "",
    Zip: "",
    department_id: "",
  });
  const [department, setDepartment] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${BASE_URL}/department`)
      .then((response) => {
        const { data } = response;
        if (data.Status) {
          setDepartment(data.Result);
        } else {
          alert(data.Error);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    axios
      .get(`${BASE_URL}/` + id)
      .then((result) => {
        setEmployee({
          ...employee,
          name: result.data.Result[0].name,
          email: result.data.Result[0].email,
          phone: result.data.Result[0].phone,
          salary: result.data.Result[0].salary,
          address: result.data.Result[0].address,
          city: result.data.Result[0].city,
          state: result.data.Result[0].state,
          zip: result.data.Result[0].zip,
          department_id: result.data.Result[0].department_id,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${BASE_URL}/edit_employee/` + id, employee)
      .then((result) => {
        if (result.data.Status) {
          navigate("/");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
    <div className="d-flex justify-content-between align-items-center bg-primary ps-3 pe-3 pt-2 pb-2">
      <h4>Add <span style={{fontWeight:"Bold"}}>Employee</span></h4>
      <Link to="/" style={{color:"white"}}>
          <ArrowLeft /> Back to List
      </Link>
      </div>
      <div className="container mt-3">
        <div>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-4">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="inputName"
              placeholder="Enter Name"
              className="form-control rounded-0"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>

          <div className="col-4">
            <label for="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="inputEmail"
              placeholder="Enter Email"
              autoComplete="off"
              className="form-control rounded-0"
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>

          <div className="col-4">
            <label htmlFor="inputPhone" className="form-label">
              Phone
            </label>
            <PhoneInput
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
                placeholder: "Enter Phone",
              }}
              country={"us"}
              value={employee.phone}
              onChange={(phone) => setEmployee({ ...employee, phone })}
            />
          </div>

          <div className="col-4">
            <label for="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              className="form-control rounded-0"
              value={employee.salary}
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>

          <div className="col-4">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              id="inputAddress"
              placeholder="Enter Address"
              autoComplete="off"
              className="form-control rounded-0"
              value={employee.address}
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>

          <div className="col-4">
            <label for="inputCity" className="form-label">
              City
            </label>
            <input
              type="text"
              id="inputCity"
              placeholder="Enter City"
              autoComplete="off"
              className="form-control rounded-0"
              value={employee.city}
              onChange={(e) =>
                setEmployee({ ...employee, city: e.target.value })
              }
            />
          </div>

          <div className="col-4">
            <label for="inputState" className="form-label">
              State
            </label>
            <input
              type="text"
              id="inputState"
              placeholder="Enter State"
              autoComplete="off"
              className="form-control rounded-0"
              value={employee.state}
              onChange={(e) =>
                setEmployee({ ...employee, state: e.target.value })
              }
            />
          </div>

          <div className="col-4">
            <label for="inputZip" className="form-label">
              Zip
            </label>
            <input
              type="text"
              id="inputZip"
              placeholder="Enter Zip"
              autoComplete="off"
              className="form-control rounded-0"
              value={employee.zip}
              onChange={(e) =>
                setEmployee({ ...employee, zip: e.target.value })
              }
            />
          </div>

          <div className="col-4">
            <label for="department" className="form-label">
              Department
            </label>
            <select
              name="department"
              id="department"
              className="form-select"
              value={employee.department_id}
              onChange={(e) =>
                setEmployee({ ...employee, department_id: e.target.value })
              }
            >
              {department.map((d) => {
                return <option value={d.id}>{d.name}</option>;
              })}
            </select>
          </div>
          <div className="col-12 d-flex justify-content-end mt-3">
            <button type="submit" className="btn btn-primary ">
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default EditEmployee;
