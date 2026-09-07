import { useState } from "react";
import { Box, Button, Container, Grid, Stack, Text, Title } from "@mantine/core";
import LocationCard from "../../components/LocationCard";
import { Map, Marker } from 'pigeon-maps';

import exampleTrailsResponse from "../../../testing-json/get-trails-response-near-portland.json";

type Place = {
    name: string;
    type: string;
    location: {
        x: number;
        y: number;
    };
}

function Home() {
    const [inspectedElement, setInspectedElement] = useState<Place | null>(null);
    const coordinate: [number, number] | null = inspectedElement
        ? [inspectedElement.location.y, inspectedElement.location.x]
        : null;
    const placeElements = exampleTrailsResponse.results;

    const handleCardClick = (place: Place) => {
        setInspectedElement(place);
    }

    const placeCards = placeElements.map((place, index) => (
        <Grid.Col key={index} span={4}>
            <LocationCard name={place.name} type={place.type} handleClick={() => handleCardClick(place)} />
        </Grid.Col>
    ));

    const render = inspectedElement ? (
        <Container size="md" my="md">
            <Stack gap="sm">
                <Title order={2}>Inspected Element</Title>
                <Text>Name: {inspectedElement.name}</Text>
                <Text>Type: {inspectedElement.type}</Text>
                <Text>Location: ({inspectedElement.location.x}, {inspectedElement.location.y})</Text>

                {coordinate && (
                    <Box maw={400} w="100%" mx={0}>
                        <Map height={250} defaultCenter={coordinate} defaultZoom={12}>
                            <Marker width={50} anchor={coordinate} color="red" />
                        </Map>
                    </Box>
                )}

                <Button w="fit-content" onClick={() => setInspectedElement(null)}>
                    Back to List
                </Button>
            </Stack>
        </Container>
    ) : (
        <Container size="md" my="md">
            <Grid>
                {placeCards}
            </Grid>
        </Container>
    );

    return render
}

export default Home