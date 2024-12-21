"use client";

import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "./hooks/useLocation";
import { LocationPermission } from "./_components/LocationPermission";

export default function Home() {
  const { location, error, loading, requestLocation } = useLocation();

  useEffect(() => {
    toast.info(
      <LocationPermission
        loading={loading}
        onRequestPermission={requestLocation}
      />,
      {
        position: "top-right",
        autoClose: false,
        toastId: "location-toast",
      }
    );
  }, []);

  return (
    <div>
      <h1>7-day forecast weather app</h1>
      {location ? (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      ) : (
        error && <p className="text-red-500">{error}</p>
      )}

      <ToastContainer />
    </div>
  );
}
