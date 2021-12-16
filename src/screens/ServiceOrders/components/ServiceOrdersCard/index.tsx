import React from 'react';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import { IServiceOrders } from '../..';

interface IServiceOrdersCard {
  order: IServiceOrders;
  goToDetails: (order: IServiceOrders) => void;
}

const ServiceOrdersCard = ({ order, goToDetails }: IServiceOrdersCard) => {
  const { id, client, equipment, brand, images, status, content } = order;
  const image = images?.length ? images[0].path : 'https://picsum.photos/700';

  return (
    <Card>
      <Card.Content>
        <Title>{client?.name}</Title>
        <Paragraph>OS: {id}</Paragraph>
        <Paragraph>
          {equipment} {brand}
        </Paragraph>
        <Paragraph>Status: {status?.name}</Paragraph>
        <Paragraph>
          {content.value}
          {'\n'}
        </Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: image }} />
      <Card.Actions>
        <Button onPress={() => goToDetails(order)}>Visualizar</Button>
      </Card.Actions>
    </Card>
  );
};

export default ServiceOrdersCard;
