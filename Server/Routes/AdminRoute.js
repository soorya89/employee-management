import express from "express";
import con from "../utils/db.js";

const router = express.Router();

//get all department
router.get("/department", (req, res) => {
  const sql = "SELECT * FROM department";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Query Error:", err);
      return res.status(500).json({ Status: false, Error: "Query Error" });
    }
    return res.json({ Status: true, Result: result });
  });
});

//add department
router.post("/add_department", (req, res) => {
  const { department } = req.body;

  if (!department) {
    return res
      .status(400)
      .json({ Status: false, Error: "Department data missing" });
  }

  const checkIfExistsQuery = "SELECT * FROM department WHERE name = ?";
  con.query(checkIfExistsQuery, [department], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Check query error:", checkErr);
      return res.status(500).json({
        Status: false,
        Error: "Check query error",
        Details: checkErr.message,
      });
    }

    if (checkResult.length > 0) {
      return res
        .status(400)
        .json({ Status: false, Error: "Department already exists" });
    }

    const insertQuery = "INSERT INTO department (`name`) VALUES (?)";
    con.query(insertQuery, [department], (err, result) => {
      if (err) {
        console.error("Query error:", err);
        return res
          .status(500)
          .json({ Status: false, Error: "Query error", Details: err.message });
      }
      return res.json({ Status: true });
    });
  });
});


//add employee
router.post("/add_employee", (req, res) => {
  const email = req.body.email;
  const checkQuery = `SELECT * FROM employee WHERE email = ?`;
  con.query(checkQuery, [email], (err, rows) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });

    if (rows.length > 0) {
      return res.json({
        Status: false,
        Error: "Employee with this email already exists",
      });
    } else {
      const sql = `INSERT INTO employee (name, email, phone, salary, address, city, state, zip, department_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [
        req.body.name,
        email,
        req.body.phone,
        req.body.salary,
        req.body.address,
        req.body.city,
        req.body.state,
        req.body.zip,
        req.body.department_id,
      ];

      con.query(sql, values, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true });
      });
    }
  });
});



//get all employee
router.get("/", (req, res) => {
  const sql = "SELECT * FROM employee";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Query Error:", err);
      return res.status(500).json({ Status: false, Error: "Query Error" });
    }
    return res.json({ Status: true, Result: result });
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Query Error:", err);
      return res.status(500).json({ Status: false, Error: "Query Error" });
    }
    return res.json({ Status: true, Result: result });
  });
});


//edit-employee
router.put("/edit_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE employee set name= ?,email= ?, phone= ?, salary= ?,address= ?,city=?,state=? ,zip=?,department_id= ? WHERE id=?`;
  const values = [
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.salary,
    req.body.address,
    req.body.city,
    req.body.state,
    req.body.zip,
    req.body.department_id,
  ];
  con.query(sql, [...values, id], (err, result) => {
    if (err) {
      console.error("Query Error:", err);
      return res
        .status(500)
        .json({ Status: false, Error: "Query Error" + err });
    }
    return res.json({ Status: true, Result: result });
  });
});


//delete-employee
router.delete("/delete_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "delete from employee where id=?";
  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Query Error:", err);
      return res
        .status(500)
        .json({ Status: false, Error: "Query Error" + err });
    }
    return res.json({ Status: true, Result: result });
  });
});


//delete-department
router.delete("/delete_department/:id", (req, res) => {
  const id = req.params.id;
  const sql = "delete from department where id=?";
  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Query Error:", err);
      return res
        .status(500)
        .json({ Status: false, Error: "Query Error" + err });
    }
    return res.json({ Status: true, Result: result });
  });
});

export { router as adminRouter };
