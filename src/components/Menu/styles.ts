import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: ${Dimensions.get('window').height}px;
  position: relative;
`;

export const ContainerItems = styled.View`
  width: 80%;
  padding: 30px 0;
  height: ${Dimensions.get('window').height}px;
  z-index: 999;
  position: absolute;
  background: #fff;
  flex: 1;
`;

export const Background = styled.TouchableOpacity`
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  height: ${Dimensions.get('window').height}px;
  position: absolute;
`;
