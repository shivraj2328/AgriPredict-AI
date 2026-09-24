const axios = require("axios");

const getWeatherData = async (latitude, longitude) => {
    try {
        // Get current temperature and humidity
        const currentResponse = await axios.get(
            "https://api.open-meteo.com/v1/forecast",
            {
                params: {
                    latitude,
                    longitude,
                    current: "temperature_2m,relative_humidity_2m"
                },
                timeout: 10000
            }
        );

        // Get historical daily precipitation for 12 complete months
        const endDate = new Date();
        endDate.setDate(1);
        endDate.setDate(0);

        const startDate = new Date(endDate);
        startDate.setMonth(startDate.getMonth() - 11);
        startDate.setDate(1);

        const formatDate = (date) =>
            date.toISOString().split("T")[0];

        const rainfallResponse = await axios.get(
            "https://archive-api.open-meteo.com/v1/archive",
            {
                params: {
                    latitude,
                    longitude,
                    start_date: formatDate(startDate),
                    end_date: formatDate(endDate),
                    daily: "precipitation_sum",
                    timezone: "auto",
                    precipitation_unit: "mm"
                },
                timeout: 10000
            }
        );

        const currentWeather = currentResponse.data.current;

        const dailyTimes = rainfallResponse.data.daily?.time;
        const dailyPrecipitation =
            rainfallResponse.data.daily?.precipitation_sum;

        if (
            currentWeather?.temperature_2m == null ||
            currentWeather?.relative_humidity_2m == null ||
            !dailyTimes?.length ||
            !dailyPrecipitation?.length
        ) {
            throw new Error("Incomplete weather data received");
        }

        // Calculate monthly rainfall totals
        const monthlyRainfall = {};

        dailyTimes.forEach((date, index) => {
            const rainfall = dailyPrecipitation[index];

            if (!Number.isFinite(rainfall)) {
                return;
            }

            const month = date.substring(0, 7);

            if (!monthlyRainfall[month]) {
                monthlyRainfall[month] = 0;
            }

            monthlyRainfall[month] += rainfall;
        });

        const monthlyValues = Object.values(monthlyRainfall);

        if (monthlyValues.length === 0) {
            throw new Error("No valid monthly rainfall data received");
        }

        const totalRainfall = monthlyValues.reduce(
            (sum, value) => sum + value,
            0
        );

        const meanMonthlyRainfall =
            totalRainfall / monthlyValues.length;

        return {
            temperature: currentWeather.temperature_2m,
            humidity: currentWeather.relative_humidity_2m,
            rainfall: Number(meanMonthlyRainfall.toFixed(2))
        };
    } catch (error) {
        console.error(
            "Weather API error:",
            error.response?.data || error.message
        );

        throw new Error("Failed to fetch weather data");
    }
};

module.exports = {
    getWeatherData
};