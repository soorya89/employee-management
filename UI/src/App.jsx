import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import {BrowserRouter,Routes,Route, NavLink} from 'react-router-dom'
import Employee from './Components/Employee'
import Department from './Components/Department'
import AddDepartment from './Components/AddDepartment'
import AddEmployee from './Components/AddEmployee'
import EditEmployee from './Components/EditEmployee'
import {Container,Nav,Navbar,} from 'react-bootstrap';

function App() {

  return (
    <BrowserRouter>
         <Navbar bg="light" collapseOnSelect expand="lg" className='mb-5'>
        <Container>
          <Navbar.Brand as={NavLink} to="/" >Employee Management System</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Item>
                <Nav.Link as={NavLink} to="/" activeClassName="active">Employee</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/department" activeClassName="active">Manage Department</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
    <Container>
    <Routes>
      <Route path='/'element={<Employee/>}></Route>
      <Route path='/department'element={<Department/>}></Route>
      <Route path='/add_department'element={<AddDepartment/>}></Route>
      <Route path='/add_employee'element={<AddEmployee/>}></Route>
      <Route path='/edit_employee/:id'element={<EditEmployee/>}></Route>
      </Routes>
      </Container>
    
    </BrowserRouter>
  )
}

export default App
