import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const StyledCube = styled.div`
  cursor: pointer;

  background: ${palette.red[0]};
  &:hover {
    background: ${palette.blue[0]};
  }
`;

const Cube = (props) => <StyledCube {...props} />;

export default Cube;
