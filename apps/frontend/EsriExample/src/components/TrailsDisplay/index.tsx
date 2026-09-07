import { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Stack, Text, Title, Loader } from "@mantine/core";
import LocationCard from "../../components/LocationCard";
import { Map, Marker } from 'pigeon-maps';

import trailsNearPortland from "../../../static-json/trails-near-portland.json";

const LOCAL_ROOT_API_URL = "http://localhost:5134";
const RADIUS = 10000;

type Place = {
    name: string;
    type: string;
    location: {
        x: number;
        y: number;
    };
}

type TrailsDisplayProps = {
    coordinates: { x: number, y: number } | null;
    shouldLoadDataFromStaticJson?: boolean;
}

function TrailsDisplay({ coordinates, shouldLoadDataFromStaticJson = false }: TrailsDisplayProps) {
    const initialPlaceElements = shouldLoadDataFromStaticJson ? trailsNearPortland.results : [];
    const initialLoadingState = shouldLoadDataFromStaticJson ? false : true;

    const [placeElements, setPlaceElements] = useState<Place[]>(initialPlaceElements);
    const [isLoading, setIsLoading] = useState<boolean>(initialLoadingState);
    const [error, setError] = useState<string | null>(null);
    const [inspectedElement, setInspectedElement] = useState<Place | null>(null);
    const coordinate: [number, number] | null = inspectedElement
        ? [inspectedElement.location.y, inspectedElement.location.x]
        : null;

    const handleCardClick = (place: Place) => {
        setInspectedElement(place);
    }

    useEffect(() => {
        if (coordinates === null || coordinates.x === null || coordinates.y === null) {
            return;
        }

        let isMounted = true;

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${LOCAL_ROOT_API_URL}/api/Trails?x=${coordinates.x}&y=${coordinates.y}&radius=${RADIUS}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                if (isMounted) {
                    setPlaceElements(result);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : String(err));
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    const placeCards = placeElements.map((place, index) => (
        <Grid.Col key={index} span={4}>
            <LocationCard name={place.name} type={place.type} handleClick={() => handleCardClick(place)} />
        </Grid.Col>
    ));

    const errorRender = error ? (
        <Container size="lg" my="md">
            <Text color="red">{error}</Text>
        </Container>
    ) : null;

    const loadingRender = isLoading ? (
        <Container size="lg" my="md">
            <Loader color="blue" />
        </Container>
    ) : null;

    const render = inspectedElement ? (
        <Container size="md" my="md">
            <Stack gap="sm">
                <Title order={2}>{inspectedElement.name}</Title>
                <Text>{inspectedElement.type}</Text>
                <Text>Coordinates: ({inspectedElement.location.x}, {inspectedElement.location.y})</Text>

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

    return loadingRender || errorRender || render;
}

export default TrailsDisplay