import styled from "styled-components";
import { Select as React95Select } from "react95";

const Select = styled(React95Select)`
  font-size: 14px;

  &:before {
    width: 100%;
    height: 100%;
    z-index: unset;
  }
  & > div > div {
    z-index: unset;
  }
`;

export default Select;
