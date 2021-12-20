import { RNCamera } from 'react-native-camera';
import { Button } from 'react-native-paper';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #000;
  justify-content: flex-end;
`;

export const CameraRN = styled(RNCamera)`
  flex: 1;
`;

export const ContainerButtonTakePhoto = styled.View`
  flex-direction: row;
  justify-content: center;
  position: absolute;
  width: 100%;
  padding: 16px 0;
`;

export const ButtonTakePhoto = styled(Button)`
  background: #fff;
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  margin: 0 8px;
`;
