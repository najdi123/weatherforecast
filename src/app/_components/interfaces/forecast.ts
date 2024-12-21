export interface IForecast {
    valid_date: string;
    temp: number;
    max_temp: number;
    min_temp: number;
    weather: {
        description: string;
        icon: string;
    }
}

export interface WeatherData {
    city_name: string;
    temp: number;
    weather: {
        description: string;
        icon: string;
    };
}

