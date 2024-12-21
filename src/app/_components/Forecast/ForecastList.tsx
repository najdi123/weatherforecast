import { IForecast } from "../interfaces/forecast";
import ForecastItem from "./ForecastItem";

interface ForecastProps {
  forecast: IForecast[];
}

export default function Forecast({ forecast }: ForecastProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {forecast.map((day) => (
        <ForecastItem key={day.valid_date} day={day} />
      ))}
    </div>
  );
}
