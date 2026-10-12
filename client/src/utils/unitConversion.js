export const celsiusToFahrenheit = (celsius) => {
    return (Number(celsius) * 9) / 5 + 32;
};

export const millimeterToInch = (millimeter) => {
    return Number(millimeter) / 25.4;
};

export const formatTemperature = (celsius, unit = "C") => {
    const value =
        unit === "F"
            ? celsiusToFahrenheit(celsius)
            : Number(celsius);

    return `${value.toFixed(1)}°${unit}`;
};

export const formatRainfall = (millimeter, unit = "mm") => {
    const value =
        unit === "inch"
            ? millimeterToInch(millimeter)
            : Number(millimeter);

    return `${value.toFixed(2)} ${unit}`;
};