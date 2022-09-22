import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NotFoundPageStyles = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .logo {
    display: block;
    margin-bottom: 40px;
  }
  .heading {
    font-size: 60px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .back {
    display: inline-block;
    padding: 15px 30px;
    color: white;
    ${(props) => props.theme.primary};
    border-radius: 4px;
    font-weight: 500;
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundPageStyles>
      <NavLink to="/" className={"logo"}>
        <img srcSet="/logo.png 2x" alt="MKb" />
      </NavLink>
      <NavLink to="/" className={"back"}>
        Back To Home
      </NavLink>
      <h1 className="heading">Opps ! Page Not Found</h1>
    </NotFoundPageStyles>
  );
};

export default NotFoundPage;
