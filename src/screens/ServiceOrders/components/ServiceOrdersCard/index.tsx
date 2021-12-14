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
  client: {
    id: number;
    name: string;
  };
  images?: {
    id: number;
    path: string;
  }[];
}

const ServiceOrdersCard = ({
  client,
  equipment,
  brand,
  images,
}: IServiceOrdersCard) => {
  const image = images?.length ? images[0].path : 'https://picsum.photos/700';

  return (
    <Card>
      <Card.Content>
        <Title>{client?.name}</Title>
        <Paragraph>{equipment}</Paragraph>
        <Paragraph>
          {brand}
          {'\n'}
        </Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: image }} />
      <Card.Actions>
        <Button>Visualizar</Button>
      </Card.Actions>
    </Card>
  );
};

export default ServiceOrdersCard;
