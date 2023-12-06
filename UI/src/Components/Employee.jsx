import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, Card } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../../config";
import ConfirmationModal from "./ConfirmationModal";
import { TrashFill, PencilFill } from "react-bootstrap-icons";

const formatPhoneNumber = (phoneNumber) => {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phoneNumber;
};

function Employee() {
  const [employee, setEmployee] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/`)
      .then((response) => {
        const { data } = response;
        if (data.Status) {
          const formattedEmployee = data.Result.map((e) => ({
            ...e,
            phone: formatPhoneNumber(e.phone),
          }));
          setEmployee(formattedEmployee);
        } else {
          alert(data.Error);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      axios
        .delete(`${BASE_URL}/delete_employee/` + deleteId)
        .then((result) => {
          if (result.data.Status) {
            window.location.reload();
          } else {
            alert(result.data.Error);
          }
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
        });
    }
    setShowModal(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
         <div className="d-flex justify-content-between align-items-center bg-primary ps-3 pe-3 pt-2 pb-2">
          <h4>Manage <span style={{fontWeight:"Bold"}}>Employee</span></h4>
          <Link to="/add_employee" className="btn btn-success">
                    Add New Employee
                  </Link>
                  </div> 

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name </th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employee.map((e) => (
                <tr>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>
                    {e.address},{e.city},{e.state},{e.zip}
                  </td>
                  <td>{e.phone}</td>
                  <td>
                    <Link
                      to={`/edit_employee/` + e.id}
                      className=" me-2 text-warning"
                    >
                      <PencilFill />
                    </Link>
                    <button
                      className=" me-2 btn btn-link p-0 text-danger"
                      onClick={() => handleDelete(e.id)}
                    >
                      <TrashFill />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>

      <ConfirmationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}

export default Employee;
