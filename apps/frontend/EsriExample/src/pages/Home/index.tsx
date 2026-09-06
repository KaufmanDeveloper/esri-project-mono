import { Container, Grid } from "@mantine/core";
import LocationCard from "../../components/LocationCard";

import exampleTrailsResponse from "../../../testing-json/get-trails-response-near-portland.json";

function Home() {
    const placeElements = exampleTrailsResponse.results;

    const placeCards = placeElements.map((place, index) => (
        <Grid.Col span={4}>
            <LocationCard key={index} name={place.name} type={place.categories[0].label} />
        </Grid.Col>
    ));

    return (
        <Container size="md" my="md">
            <Grid>
                {placeCards}
            </Grid>
        </Container>
    )
}

export default Home