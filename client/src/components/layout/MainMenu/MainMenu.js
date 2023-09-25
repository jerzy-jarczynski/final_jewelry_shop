import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const MainMenu = () => {

  return (
    <Navbar bg="primary" data-bs-theme="primary" className="rounded my-4 px-4">
      <Navbar.Brand as={Link} to="/" className="text-white" style={{ textDecoration: "none" }}>
        Home
      </Navbar.Brand>
    </Navbar>
  );

};

export default MainMenu;