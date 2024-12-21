"use client";

import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

import { useForecast, useLocation, useWeather } from "@/app/hooks";
import { Container } from "@/components";

import { dict, LocationPermission } from "../_components";
import ForecastSection from "./Forecast/ForecastSection";
import WeatherSection from "./WeatherSection";

export default function Home() {
  const {
    location,
    error: locationError,
    loading: locationLoading,
    requestLocation,
  } = useLocation();
  const {
    weatherData,
    loading: weatherLoading,
    error: weatherError,
    fetchWeather,
  } = useWeather(location?.latitude || null, location?.longitude || null);

  const {
    forecast,
    loading: forecastLoading,
    error: forecastError,
    fetchForecast,
  } = useForecast(location?.latitude || null, location?.longitude || null);

  useEffect(() => {
    toast.info(
      <LocationPermission
        loading={locationLoading}
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
    <Container>
      <div className="mx-4 mb-6">
        <div className="flex justify-center mt-5">
          <h1 className="text-lg">{dict.en.title}</h1>
        </div>

        {!location && locationError && (
          <p className="text-red-500">{locationError}</p>
        )}
        <WeatherSection
          weatherLoading={weatherLoading}
          weatherError={weatherError}
          weatherData={weatherData}
          fetchWeather={fetchWeather}
        />
        <ForecastSection
          fetchForecast={fetchForecast}
          forecast={forecast}
          forecastLoading={forecastLoading}
          forecastError={forecastError}
          location={!!location}
        />
        <ToastContainer />
      </div>
    </Container>
  );
}
