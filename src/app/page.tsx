"use client";

import { useEffect, useState } from "react";

interface Location {
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [location, setLocation] = useState<Location | null>(null);
  console.log("🚀 ~ Home ~ location:", location);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          console.log("Latitude:", position.coords.latitude);
          console.log("Longitude:", position.coords.longitude);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error: GeolocationPositionError) => {
          console.error("Error occurred while retrieving location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return <div>7-day forecast weather app</div>;
}
