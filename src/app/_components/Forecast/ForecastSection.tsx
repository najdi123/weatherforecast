import { IForecast } from "../interfaces/forecast";
import ForecastList from "./ForecastList";

interface ForecastSectionProps {
  fetchForecast: () => void;
  forecast: IForecast[] | null;
  forecastLoading: boolean;
  forecastError: string | null;
  location: boolean;
}

export default function ForecastSection({
  fetchForecast,
  forecast,
  forecastLoading,
  forecastError,
  location,
}: ForecastSectionProps) {
  return (
    <>
      {location && (
        <>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mx-auto block"
            onClick={fetchForecast}
            disabled={forecastLoading}
          >
            {forecastLoading ? "Loading..." : "Show 7-Day Forecast"}
          </button>
          {forecastError && (
            <p className="text-center text-red-500 font-semibold mt-2">
              {forecastError}
            </p>
          )}
        </>
      )}

      {forecast && <ForecastList forecast={forecast} />}
    </>
  );
}
