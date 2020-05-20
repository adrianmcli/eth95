import styled from "styled-components";
import { TextField } from "react95";

const Input = styled(TextField)`
  &:before {
    width: 100%;
    height: 100%;
    z-index: unset;
  }
  & > input {
    font-size: 14px;
  }
`;

export default Input;
