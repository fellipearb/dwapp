import { Button } from 'react-native-paper';
import styled from 'styled-components/native';

export const TextItem = styled.Text`
  font-size: 14px;
  margin-bottom: 4px;
`;

export const ButtonClient = styled(Button)`
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 50px;
  height: 50px;
  z-index: 9;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;
