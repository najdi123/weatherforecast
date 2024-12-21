"use client";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Location {
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = () => {
    toast.info(
      <div>
        <span>We need your location to show the weather forecast.</span>
        <button
          className={`block bg-blue-500 px-4 py-2 rounded-md text-white text-[10px] mx-auto mt-3 ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={handlePermissionRequest}
          disabled={loading}
        >
          {loading ? "Loading..." : "Allow Location"}
        </button>
      </div>,
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: true,
        draggable: true,
        toastId: "location-toast",
      }
    );
  };

  const handlePermissionRequest = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          toast.success("Location retrieved successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            draggable: true,
          });
          toast.dismiss("location-toast");
          setLoading(false);
        },
        (error) => {
          setError(`Error: ${error.message}`);
          toast.error(
            <div>
              Location error: {error.message}
              <button
                className="ml-2 bg-green-500 px-3 py-1 rounded-md text-white text-xs"
                onClick={() => {
                  handleSelectTehran();
                  toast.dismiss("location-error-toast");
                }}
              >
                Select Tehran
              </button>
            </div>,
            {
              toastId: "location-error-toast",
              position: "top-right",
              autoClose: false,
              closeOnClick: false,
              draggable: true,
            }
          );
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      toast.error("Geolocation is not supported by this browser.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        draggable: true,
        toastId: "location-error-toast",
      });
      setLoading(false);
    }
  };

  const handleSelectTehran = () => {
    setLocation({ latitude: 35.6892, longitude: 51.389 });
    toast.success("Tehran set as your location!", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
    });
  };

  return (
    <div>
      <h1>7-day forecast weather app</h1>
      {location ? (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      ) : (
        <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
      )}

      <ToastContainer />
    </div>
  );
}
