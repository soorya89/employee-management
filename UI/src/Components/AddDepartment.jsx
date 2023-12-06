import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import { Modal, Button } from "react-bootstrap";

function AddDepartment() {
  const [departmentName, setDepartmentName] = useState("");
  const [departments, setDepartments] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/department`)
      .then((response) => {
        const { data } = response;
        if (data.Status) {
          setDepartments(data.Result);
        } else {
          alert(data.Error);
        }
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isDuplicate = departments.some(
      (d) => d.name.toLowerCase() === departmentName.toLowerCase()
    );

    if (isDuplicate) {
      alert("Department already exists");
      return;
    }

    axios
      .post(`${BASE_URL}/add_department`, { department: departmentName })
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.error("Error adding department:", err));
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Add department
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="department">
                <strong>Department:</strong>
              </label>
              <input
                type="text"
                name="department"
                placeholder="Enter department"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                className="form-control rounded-0"
              />
            </div>
            <button className="btn btn-success w-100 rounded-0 mb-2">
              Add New
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddDepartment;
