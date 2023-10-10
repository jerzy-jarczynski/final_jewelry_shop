import { Navbar, Nav, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../../redux/usersRedux";
import styles from "./MainMenu.module.scss";

const MainMenu = () => {
  const user = useSelector(getUser);

  return (
    <div className={styles.MainMenu}>
      <Navbar bg="primary" expand="lg" className="rounded my-3 my-lg-4 px-3 px-lg-5">
        <Navbar.Brand as={Link} to="/" className="text-white" style={{ textDecoration: "none" }}>
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end pt-2 pt-lg-3">
          <Nav className={`align-items-center ${styles.menuContent}`}>
            {user && (
              <div className="text-white mb-2 mb-lg-3">Logged as {user.login || user.email}</div>
            )}
            <Button 
                as={Link} 
                to={user ? "/cart" : "/login"} 
                variant="warning" 
                className="text-white mb-2 mb-lg-3 mx-lg-3"
                style={{ minWidth: "100px" }}
            >
                Cart
            </Button>
            {user && (
              <Nav.Link as={Link} to="/orders" className="text-white mb-2 mb-lg-3 mr-lg-2" style={{ textDecoration: "none" }}>
                Orders
              </Nav.Link>
            )}
            {!user && (
              <Nav.Link as={Link} to="/login" className="text-white mb-2 mb-lg-3 mr-lg-2" style={{ textDecoration: "none" }}>
                Sign In
              </Nav.Link>
            )}
            {user && (
              <Nav.Link as={Link} to="/logout" className="text-white mb-2 mb-lg-3 mr-lg-2" style={{ textDecoration: "none" }}>
                Sign Out
              </Nav.Link>
            )}
            {!user && (
              <Nav.Link as={Link} to="/register" className="text-white mb-2 mb-lg-3" style={{ textDecoration: "none" }}>
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
