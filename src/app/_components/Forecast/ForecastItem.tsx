import Image from "next/image";
import React from "react";

import { IForecast } from "../interfaces/forecast";
import { dict } from "../dict";

interface Props {
  day: IForecast;
}

const ForecastItem = ({ day }: Props) => {
  return (
    <div
      key={day.valid_date}
      className="p-4 bg-gray-100 rounded shadow-md flex flex-col items-center"
    >
      <h3 className="font-semibold">
        {new Date(day.valid_date).toDateString()}
      </h3>
      <Image
        src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`}
        alt={day.weather.description}
        className="w-16 h-16"
        width={0}
        height={0}
      />
      <p className="mt-2 text-gray-600">{day.weather.description}</p>
      <p className="mt-1">
        {dict.en.averageTemp} {day.temp} {dict.en.centigrade}
      </p>
      <p>
        {dict.en.high}: {day.max_temp}
        {dict.en.centigrade} / {dict.en.low}: {day.min_temp}°C
      </p>
    </div>
  );
};

export default ForecastItem;
