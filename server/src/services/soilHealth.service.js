const scoreNpk = (value, idealMin, idealMax) => {
    if (value >= idealMin && value <= idealMax) {
        return 100;
    }

    const distance =
        value < idealMin
            ? idealMin - value
            : value - idealMax;

    if (distance <= 20) {
        return 80;
    }

    if (distance <= 50) {
        return 60;
    }

    if (distance <= 100) {
        return 30;
    }

    return 10;
};

const classifyNpk = (value, idealMin, idealMax) => {
    if (value >= idealMin && value <= idealMax) {
        return "Ideal";
    }

    const distance =
        value < idealMin
            ? idealMin - value
            : value - idealMax;

    if (distance <= 20) {
        return "Slightly Outside";
    }

    if (distance <= 50) {
        return "Moderately Outside";
    }

    if (distance <= 100) {
        return "Far Outside";
    }

    return "Extremely Outside";
};

const classifyPh = (value) => {
    if (value >= 6.0 && value <= 7.5) {
        return {
            status: "Optimal",
            score: 100
        };
    }

    if (
        (value >= 5.5 && value < 6.0) ||
        (value > 7.5 && value <= 8.0)
    ) {
        return {
            status: "Near Optimal",
            score: 80
        };
    }

    if (
        (value >= 5.0 && value < 5.5) ||
        (value > 8.0 && value <= 8.5)
    ) {
        return {
            status: "Moderate",
            score: 60
        };
    }

    if (
        (value >= 4.0 && value < 5.0) ||
        (value > 8.5 && value <= 9.0)
    ) {
        return {
            status: "Poor",
            score: 30
        };
    }

    return {
        status: "Very Poor",
        score: 10
    };
};

const calculateSoilHealth = (prediction) => {
    const nitrogen = Number(prediction.nitrogen);
    const phosphorus = Number(prediction.phosphorus);
    const potassium = Number(prediction.potassium);
    const ph = Number(prediction.ph);

    if (
        ![
            nitrogen,
            phosphorus,
            potassium,
            ph
        ].every(Number.isFinite)
    ) {
        throw new Error(
            "Valid nitrogen, phosphorus, potassium and pH values are required"
        );
    }

    const nitrogenScore = scoreNpk(
        nitrogen,
        40,
        120
    );

    const phosphorusScore = scoreNpk(
        phosphorus,
        20,
        80
    );

    const potassiumScore = scoreNpk(
        potassium,
        40,
        120
    );

    const phResult = classifyPh(ph);

    const score = Math.round(
        nitrogenScore * 0.25 +
        phosphorusScore * 0.25 +
        potassiumScore * 0.25 +
        phResult.score * 0.25
    );

    let status;

    if (score >= 80) {
        status = "Good";
    } else if (score >= 60) {
        status = "Moderate";
    } else {
        status = "Needs Improvement";
    }

    return {
        score,
        status,

        parameters: {
            nitrogen: {
                value: nitrogen,
                score: nitrogenScore,
                status: classifyNpk(
                    nitrogen,
                    40,
                    120
                )
            },

            phosphorus: {
                value: phosphorus,
                score: phosphorusScore,
                status: classifyNpk(
                    phosphorus,
                    20,
                    80
                )
            },

            potassium: {
                value: potassium,
                score: potassiumScore,
                status: classifyNpk(
                    potassium,
                    40,
                    120
                )
            },

            ph: {
                value: ph,
                score: phResult.score,
                status: phResult.status
            }
        }
    };
};

module.exports = {
    calculateSoilHealth
};