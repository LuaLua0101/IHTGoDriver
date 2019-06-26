import styled from "styled-components";
import { Icon } from "native-base";

const StyledIcon = styled(Icon)`
  color: ${props => props.theme.mainColor};
  font-size: 20;
`;
export default StyledIcon;
