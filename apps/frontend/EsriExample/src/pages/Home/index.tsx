import { useEffect, useState } from "react";

import { Text, Loader } from "@mantine/core";
import TrailsDisplay from "../../components/TrailsDisplay";

// If you do not want to include your ESRI API key for this project, set this to true
const SHOULD_LOAD_DATA_FROM_STATIC_JSON = false;

function Home() {
    const [coordinates, setCoordinates] = useState<{ x: number, y: number } | null>(null);
    const [navigatorPermissionsDenied, setNavigatorPermissionsDenied] = useState<boolean>(true);
    const [navigatorIsLoading, setNavigatorIsLoading] = useState<boolean>(true);

    const navigatorWaitingRender = <Text>Please enable location services to view nearby trails.</Text>;
    const loadingRender = <Loader color="blue" />;

    const trailsDisplayRender = navigatorIsLoading ? loadingRender : <TrailsDisplay coordinates={coordinates} shouldLoadDataFromStaticJson={SHOULD_LOAD_DATA_FROM_STATIC_JSON} />;

    useEffect(() => {
        if (!navigator.geolocation) {
            console.error("Geolocation is not supported by this browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoordinates({ x: position.coords.longitude, y: position.coords.latitude });
                setNavigatorPermissionsDenied(false);
                setNavigatorIsLoading(false);
            },
            (error) => {
                console.error("Error getting user's location:", error);
                setNavigatorPermissionsDenied(true);
            }
        );
    }, []);

    return navigatorPermissionsDenied && !SHOULD_LOAD_DATA_FROM_STATIC_JSON ? navigatorWaitingRender : trailsDisplayRender;
}

export default Home