import { LoadingSpinner } from "components/loading";
import React from "react";
import styled, { css } from "styled-components";
import Proptypes from "prop-types";
import { NavLink } from "react-router-dom";

const ButtonStyles = styled.button`
  cursor: pointer;
  line-height: 1;
  padding: 0 25px;
  font-weight: 600;
  font-size: 18px;
  height: ${(props) => props.height || "66px"};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.kind === "secondary" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: white;
    `};
  ${(props) =>
    props.kind === "primary" &&
    css`
      color: white;
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
    `};
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
/**
 * @param {*} onClick Handler onClick
 * @requires
 * @param {string} type Type of button 'button' | 'submit'
 * @returns
 */
const Button = ({
  type = "button",
  children,
  kind = "primary",
  onClick = () => {},
  ...props
}) => {
  const { isLoading, to } = props;
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink
        to={to}
        style={{
          display: "inline-block",
        }}
      >
        <ButtonStyles kind={kind} type={type} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }
  return (
    <ButtonStyles kind={kind} type={type} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};

Button.propTypes = {
  type: Proptypes.oneOf(["button", "submit"]),
  isLoading: Proptypes.bool,
  onClick: Proptypes.func,
  children: Proptypes.node,
  kind: Proptypes.oneOf(["primary", "secondary"]),
};

export default Button;
