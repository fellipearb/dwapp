import React, { useRef, useState } from 'react';
import { RNCamera } from 'react-native-camera';
import {
  CameraRN,
  ButtonTakePhoto,
  Container,
  ContainerButtonTakePhoto,
} from './styles';

interface ICamera {
  onTakePicture: (base64: string) => void;
  toggleShowCamera: (show: boolean) => void;
}

export const Camera = ({ onTakePicture, toggleShowCamera }: ICamera) => {
  const [flash, setFlash] = useState(false);

  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      //@ts-ignore
      const data = await cameraRef?.current?.takePictureAsync(options);

      onTakePicture(data.base64);
      toggleShowCamera(false);
    }
  };

  return (
    <Container>
      <CameraRN
        ref={cameraRef}
        type={RNCamera.Constants.Type.back}
        flashMode={
          flash
            ? RNCamera.Constants.FlashMode.on
            : RNCamera.Constants.FlashMode.off
        }
        androidCameraPermissionOptions={{
          title: 'Permissão para usar camera',
          message: 'Precisamos de permissão para usar sua camera!',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      <ContainerButtonTakePhoto>
        {
          //@ts-ignore
          <ButtonTakePhoto
            icon="flash"
            onPress={() => setFlash(!flash)}
            compact
          />
        }
        {
          //@ts-ignore
          <ButtonTakePhoto icon="camera" onPress={takePicture} compact />
        }
      </ContainerButtonTakePhoto>
    </Container>
  );
};

export default Camera;
