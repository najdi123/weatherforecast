import { useState } from "react";
import { toast } from "react-toastify";

interface Location {
  latitude: number;
  longitude: number;
}

export function useLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const dismissToast = () => {
    toast.dismiss("location-toast");
  };

  const requestLocation = () => {
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
          });
          dismissToast();
          setLoading(false);
        },
        (geoError) => {
          setError(`Error: ${geoError.message}`);
          toast.error(
            <div>
              Location error: {geoError.message}
              <button
                className="ml-2 bg-green-500 px-3 py-1 rounded-md text-white text-xs"
                onClick={() => handleSelectTehran()}
              >
                Select Tehran
              </button>
            </div>,
            {
              toastId: "location-error-toast",
              position: "top-right",
              autoClose: false,
            }
          );
          dismissToast();
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      toast.error("Geolocation is not supported by this browser.", {
        position: "top-right",
        autoClose: 5000,
        toastId: "location-error-toast",
      });
      dismissToast();
      setLoading(false);
    }
  };

  const handleSelectTehran = () => {
    setLocation({ latitude: 35.6892, longitude: 51.389 });
    toast.success("Tehran set as your location!", {
      position: "top-right",
      autoClose: 2500,
    });
    dismissToast();
  };

  return { location, error, loading, requestLocation };
}
