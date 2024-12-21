import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

interface WeatherData {
    city_name: string;
    temp: number;
    weather: {
        description: string;
        icon: string;
    };
}

export function useWeather(latitude: number | null, longitude: number | null) {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = async () => {
        if (latitude === null || longitude === null) {
            setError("Latitude and Longitude are required");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `https://api.weatherbit.io/v2.0/current`,
                {
                    params: {
                        lat: latitude,
                        lon: longitude,
                        key: process.env.NEXT_PUBLIC_WEATHERBIT_API_KEY,
                    },
                }
            );
            setWeatherData(response.data.data[0]);
        } catch (err: unknown) {
            const axiosError = err as AxiosError<{ error: string }>;
            setError(axiosError.response?.data?.error || "Failed to fetch weather data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (latitude !== null && longitude !== null) {
            fetchWeather();
        }
    }, [latitude, longitude]);

    return { weatherData, loading, error, fetchWeather };
}
