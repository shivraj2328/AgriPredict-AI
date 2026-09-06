const { predictCrop } = require("./services/cropPrediction.service");

async function testPrediction() {
  try {
    const result = await predictCrop({
      N: 90,
      P: 42,
      K: 43,
      temperature: 20.8,
      humidity: 82.0,
      ph: 6.5,
      rainfall: 202.9,
    });

    console.log("Prediction Result:");
    console.log(result);
  } catch (error) {
    console.error("Prediction test failed:", error);
  }
}

testPrediction();