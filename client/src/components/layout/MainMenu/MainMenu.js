import { Navbar, Nav, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../../redux/usersRedux";
import styles from "./MainMenu.module.scss";

const MainMenu = () => {
  const user = useSelector(getUser);

  return (
    <div className={styles.MainMenu}>
      <Navbar bg="primary" expand="lg" className="rounded my-4 px-4">
        <Navbar.Brand as={Link} to="/" className="text-white" style={{ textDecoration: "none" }}>
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end py-3">
          <Nav className={styles.menuContent}>
            {user && (
              <div className="text-white my-auto pb-3 pb-lg-0">Logged as {user.login || user.email}</div>
            )}
              <Button 
                as={Link} 
                to={user ? "/cart" : "/login"} 
                variant="warning" 
                className="text-white d-block my-3 mx-auto w-100 my-lg-0 py-lg-2"
                style={{ maxWidth: "200px" }}
              >
                Cart
              </Button>
            {user && (
              <Nav.Link as={Link} to="/orders" className="text-white d-block py-3 py-lg-0" style={{ textDecoration: "none" }}>
                Orders
              </Nav.Link>
            )}
            {!user && (
              <Nav.Link as={Link} to="/login" className="text-white d-block py-3 py-lg-0" style={{ textDecoration: "none" }}>
                Sign In
              </Nav.Link>
            )}
            {user && (
              <Nav.Link as={Link} to="/logout" className="text-white d-block py-3 py-lg-0" style={{ textDecoration: "none" }}>
                Sign Out
              </Nav.Link>
            )}
            {!user && (
              <Nav.Link as={Link} to="/register" className="text-white d-block py-3 py-lg-0" style={{ textDecoration: "none" }}>
                Sign Up
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default MainMenu;
