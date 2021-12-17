import { Button } from 'react-native-paper';
import styled from 'styled-components/native';

export const ContainerCard = styled.View`
  margin-bottom: 16px;
`;

export const ButtonServiceOrder = styled(Button)`
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

export const ContainerButtons = styled.ScrollView`
  flex-direction: row;
  margin: 8px 0 16px;
`;

export const ButtonFilter = styled(Button)`
  margin-right: 16px;
`;
