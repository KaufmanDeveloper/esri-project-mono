import { Card, Text, } from '@mantine/core';

type LocationCardProps = {
    name: string;
    type: string;
    handleClick?: () => void;
};

function LocationCard({ name, type, handleClick }: LocationCardProps) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder component="button"
            onClick={handleClick}
            style={{
                cursor: 'pointer',
                textAlign: 'left', // Resets standard button text alignment
                width: '100%',      // Ensures full width if inside a grid/flex layout
            }}>
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