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

        startDate.setMonth(
            startDate.getMonth() - 11
        );

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

        const currentWeather =
            currentResponse.data.current;

        const dailyTimes =
            rainfallResponse.data.daily?.time;

        const dailyPrecipitation =
            rainfallResponse.data.daily?.precipitation_sum;


        // Validate current weather data
        if (
            currentWeather?.temperature_2m == null ||
            currentWeather?.relative_humidity_2m == null
        ) {
            throw new Error(
                "Incomplete current weather data received"
            );
        }


        // Validate rainfall data
        if (
            !dailyTimes?.length ||
            !dailyPrecipitation?.length
        ) {
            throw new Error(
                "Incomplete rainfall data received"
            );
        }


        // Calculate monthly rainfall totals
        const monthlyRainfall = {};

        dailyTimes.forEach((date, index) => {

            const rainfall =
                dailyPrecipitation[index];

            if (!Number.isFinite(rainfall)) {
                return;
            }

            const month =
                date.substring(0, 7);

            if (!monthlyRainfall[month]) {
                monthlyRainfall[month] = 0;
            }

            monthlyRainfall[month] += rainfall;
        });


        const monthlyValues =
            Object.values(monthlyRainfall);


        if (monthlyValues.length === 0) {
            throw new Error(
                "No valid monthly rainfall data received"
            );
        }


        // Calculate mean monthly rainfall
        const totalRainfall =
            monthlyValues.reduce(
                (sum, value) => sum + value,
                0
            );

        const meanMonthlyRainfall =
            totalRainfall /
            monthlyValues.length;


        return {
            temperature:
                currentWeather.temperature_2m,

            humidity:
                currentWeather.relative_humidity_2m,

            rainfall:
                Number(
                    meanMonthlyRainfall.toFixed(2)
                )
        };

    } catch (error) {

        console.error(
            "Weather API error:",
            error.response?.data ||
            error.message
        );


        // Preserve our own validation/data errors
        if (
            error.message ===
                "Incomplete current weather data received" ||
            error.message ===
                "Incomplete rainfall data received" ||
            error.message ===
                "No valid monthly rainfall data received"
        ) {
            throw error;
        }


        // Convert external API/network errors
        // into a safe application error
        throw new Error(
            "Weather service unavailable"
        );
    }
};


module.exports = {
    getWeatherData
};