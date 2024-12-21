import { useState } from "react";
import axios, { AxiosError } from "axios";

interface ForecastData {
    valid_date: string;
    temp: number;
    max_temp: number;
    min_temp: number;
    weather: {
        description: string;
        icon: string;
    };
}

export function useForecast(latitude: number | null, longitude: number | null) {
    const [forecast, setForecast] = useState<ForecastData[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchForecast = async () => {
        if (latitude === null || longitude === null) {
            setError("Latitude and Longitude are required");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `https://api.weatherbit.io/v2.0/forecast/daily`,
                {
                    params: {
                        lat: latitude,
                        lon: longitude,
                        key: process.env.NEXT_PUBLIC_WEATHERBIT_API_KEY,
                        days: 7, // Fetch only 7 days
                    },
                }
            );
            setForecast(response.data.data); // Extract the forecast data array
        } catch (err: unknown) {
            const axiosError = err as AxiosError<{ error: string }>;
            setError(axiosError.response?.data?.error || "Failed to fetch forecast data");
        } finally {
            setLoading(false);
        }
    };

    return { forecast, loading, error, fetchForecast };
}
