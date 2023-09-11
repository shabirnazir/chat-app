import React from "react";
import css from "./LandingPage.module.css";
import LoginForm from "../../Forms/LoginForm/LoginForm";

import NavbarContainer from "../Navibar/NavbarContainer";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
const LandingPage = () => {
  return (
    <div>
      <NavbarContainer />
      <LoadingIcon />
    </div>
  );
};

export default LandingPage;
