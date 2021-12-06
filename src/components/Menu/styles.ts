import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View(
  (props: { showMenu: boolean }) => `
  position: absolute;
  top: 0;
  width: 90%;
  height: ${Dimensions.get('window').height}px;
  right: ${props.showMenu ? '10%' : '100%'};
  background: #fff;
  z-index: 19;
  flex: 1;
  padding: 50px 0;
`,
);

export const Background = styled.TouchableOpacity(
  (props: { showMenu: boolean }) => `
  position: absolute;
  top: 0;
  width: 100%;
  height: ${Dimensions.get('window').height}px;
  right: ${props.showMenu ? '0' : '100%'};
  background: rgba(0, 0, 0, 0.8);
  z-index: 9;
  flex: 1;
`,
);
