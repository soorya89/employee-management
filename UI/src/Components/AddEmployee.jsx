import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import { ArrowLeft } from "react-bootstrap-icons";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; 

function AddEmployee() {
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

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    salary: "",
    address: "",
    city: "",
    state: "",
    zip: "",
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
  }, []);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setEmployee({ ...employee, name: newName });
    setErrors({ ...errors, name: newName ? "" : "Name is required" });
  };
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmployee({ ...employee, email: newEmail });
    setErrors({ ...errors, email: newEmail ? "" : "Email is required" });
  };

  const handlePhoneChange = (value, country) => {
    setEmployee({ ...employee, phone: value });
    setErrors({ ...errors, phone: value ? "" : "Phone is required" });
  };

  const handleSalaryChange = (e) => {
    const newSalary = e.target.value;
    setEmployee({ ...employee, salary: newSalary });
    setErrors({ ...errors, salary: newSalary ? "" : "Salary is required" });
  };
  const handleAddressChange = (e) => {
    const newAddress = e.target.value;
    setEmployee({ ...employee, address: newAddress });
    setErrors({ ...errors, address: newAddress ? "" : "Address is required" });
  };
  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setEmployee({ ...employee, city: newCity });
    setErrors({ ...errors, city: newCity ? "" : "City is required" });
  };
  const handleStateChange = (e) => {
    const newState = e.target.value;
    setEmployee({ ...employee, state: newState });
    setErrors({ ...errors, state: newState ? "" : "State is required" });
  };
  const handleDepartmentChange = (e) => {
    const newDepartment = e.target.value;
    setEmployee({ ...employee, department_id: newDepartment });
    setErrors({
      ...errors,
      department_id: newDepartment ? "" : "State is required",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      name,
      email,
      phone,
      salary,
      address,
      city,
      state,
      zip,
      department_id,
    } = employee;
    const newErrors = {
      name: name ? "" : "Name is required",
      email: email ? "" : "Email is required",
      phone: phone ? "" : "Phone is required",
      salary: salary ? "" : "Salary is required",
      address: address ? "" : "Address is required",
      city: city ? "" : "City is required",
      state: state ? "" : "State is required",
      zip: zip ? "" : "Zip is required",
      department_id: department_id ? "" : "Department is required",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }
    axios
      .post(`${BASE_URL}/add_employee`, employee)
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
        <div >
          
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
                onChange={handleNameChange}
              />
              {errors.name && <p className="text-danger">{errors.name}</p>}
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
                onChange={handleEmailChange}
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}
            </div>

            <div className="col-4">
              <label htmlFor="inputPhone" className="form-label">
                Phone
              </label>
              <PhoneInput
                country={"us"}
                value={employee.phone}
                onChange={(value, country) => handlePhoneChange(value, country)}
                inputProps={{ name: "phone", required: true }}
              />
              {errors.phone && <p className="text-danger">{errors.phone}</p>}
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
                onChange={handleAddressChange}
              />
              {errors.address && (
                <p className="text-danger">{errors.address}</p>
              )}
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
                onChange={handleCityChange}
              />
              {errors.city && <p className="text-danger">{errors.city}</p>}
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
                onChange={handleStateChange}
              />
              {errors.state && <p className="text-danger">{errors.state}</p>}
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
                onChange={handleDepartmentChange}
              >
                {department.map((d) => {
                  return <option value={d.id}>{d.name}</option>;
                })}
              </select>
              {errors.department_id && (
                <p className="text-danger">{errors.department_id}</p>
              )}
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
                onChange={handleSalaryChange}
              />
              {errors.salary && <p className="text-danger">{errors.salary}</p>}
            </div>
            <div className="col-12 d-flex justify-content-end mt-3">
              <button type="submit" className="btn btn-primary  ">
                ADD NEW EMPLOYEE
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddEmployee;
