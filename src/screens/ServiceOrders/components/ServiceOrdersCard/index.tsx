import React from 'react';
import { Button, Card, Paragraph, Title } from 'react-native-paper';

interface IServiceOrdersCard {
  id: number;
  client_id: number;
  equipment: string;
  brand: string;
  identification: string;
  reports: string;
  description: string;
  notes: string;
  value: number;
  status_id: string;
  closedAt: string;
}

const ServiceOrdersCard = ({
  client_id,
  equipment,
  brand,
}: IServiceOrdersCard) => {
  return (
    <Card>
      <Card.Content>
        <Title>Client: {client_id}</Title>
        <Paragraph>{equipment}</Paragraph>
        <Paragraph>
          {brand}
          {'\n'}
        </Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Actions>
        <Button>Visualizar</Button>
      </Card.Actions>
    </Card>
  );
};

export default ServiceOrdersCard;
