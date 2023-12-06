import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import ConfirmationModal from "./ConfirmationModal";
import { Card } from "react-bootstrap";
import AddDepartment from "./AddDepartment";

function Department() {
  const [department, setDepartment] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      axios
        .delete(`${BASE_URL}/delete_department/` + deleteId)
        .then((result) => {
          if (result.data.Status) {
            window.location.reload();
          } else {
            alert(result.data.Error);
          }
        })
        .catch((error) => {
          console.error("Error deleting department:", error);
        });
    }
    setShowModal(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          
        <div className="d-flex justify-content-between align-items-center bg-primary ps-3 pe-3 pt-2 pb-2">
          <h4>Department List</h4>
          <AddDepartment />
                  </div> 

         
          <div className="mt-3">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th width="100">Action</th>
                </tr>
              </thead>
              <tbody>
                {department.map((d) => (
                  <tr key={d.id}>
                    <td>{d.name}</td>
                    <td>
                      {" "}
                      <button
                        className="btn btn-danger btn-sm me-2"
                        onClick={() => handleDelete(d.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

export default Department;
