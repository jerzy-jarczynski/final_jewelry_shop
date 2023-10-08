import React from "react";
import PropTypes from "prop-types";
import MainMenu from "../MainMenu/MainMenu";
import Footer from "../Footer/Footer";
import { Container } from "react-bootstrap";

const MainLayout = ({ children }) => (
  <Container>
    <MainMenu />
      { children }
    <Footer />
  </Container>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;