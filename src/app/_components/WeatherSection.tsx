import { WeatherData } from "./interfaces/forecast";
import { dict } from "../_components";
import Image from "next/image";

interface WeatherSectionProps {
  weatherLoading: boolean;
  weatherError: string | null;
  weatherData: WeatherData | null;
  fetchWeather: () => void;
}

export default function WeatherSection({
  weatherLoading,
  weatherError,
  weatherData,
  fetchWeather,
}: WeatherSectionProps) {
  console.log("🚀 ~ weatherData:", weatherData);
  return (
    <>
      {weatherLoading && (
        <p className="text-center text-blue-500 font-semibold">
          {dict.en.loadingWeather}
        </p>
      )}

      {weatherError && (
        <p className="text-center text-red-500 font-semibold">{weatherError}</p>
      )}

      {weatherData && (
        <div className="p-4 bg-blue-100 rounded shadow-md max-w-md mx-auto mt-6 text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            {dict.en.currentWeather}: {weatherData.city_name}
          </h2>
          <Image
            src={`https://www.weatherbit.io/static/img/icons/${weatherData.weather.icon}.png`}
            alt={weatherData.weather.description}
            className="w-20 h-20 mx-auto mb-4"
            width={0}
            height={0}
          />
          <p className="text-lg text-gray-600">
            <span className="font-semibold">{dict.en.temperature}</span>{" "}
            {weatherData.temp}
            {dict.en.centigrade}
          </p>
          <p className="text-lg text-gray-600 mt-2">
            <span className="font-semibold">{dict.en.description}</span>{" "}
            {weatherData.weather.description}
          </p>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            onClick={fetchWeather}
            disabled={weatherLoading}
          >
            {weatherLoading ? dict.en.updating : dict.en.updateWeather}
          </button>
        </div>
      )}
    </>
  );
}
