import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

type LocationCardProps = {
    name: string;
    type: string;
};

function LocationCard({ name, type }: LocationCardProps) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="md" >
                {name}
            </Text>

            <Text size="sm" c="dimmed">
                {type}
            </Text>
        </Card>
    )
}

export default LocationCard