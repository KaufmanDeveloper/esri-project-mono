import { useState } from "react";
import { Button, Container, Grid } from "@mantine/core";
import LocationCard from "../../components/LocationCard";

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
        <div>
            <h2>Inspected Element</h2>
            <p>Name: {inspectedElement.name}</p>
            <p>Type: {inspectedElement.type}</p>
            <p>Location: ({inspectedElement.location.x}, {inspectedElement.location.y})</p>

            <Button my="md" onClick={() => setInspectedElement(null)}>
                Back to List
            </Button>
        </div>
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