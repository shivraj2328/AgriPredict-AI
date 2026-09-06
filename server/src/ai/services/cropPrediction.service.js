const tf = require("@tensorflow/tfjs");
const fs = require("fs");
const path = require("path");

let model = null;
let metadata = null;

const MODEL_DIR = path.join(__dirname, "../models/crop-model");
const METADATA_PATH = path.join(
  __dirname,
  "../data/processed/preprocessing-metadata.json"
);

async function loadModel() {
  if (model && metadata) {
    return;
  }

  const modelJsonPath = path.join(MODEL_DIR, "model.json");
  const weightsPath = path.join(MODEL_DIR, "weights.bin");

  const modelJson = JSON.parse(
    fs.readFileSync(modelJsonPath, "utf8")
  );

  const weightsBuffer = fs.readFileSync(weightsPath);

  const weightSpecs = modelJson.weightsManifest.flatMap(
    (manifest) => manifest.weights
  );

  const modelArtifacts = {
    modelTopology: modelJson.modelTopology,
    weightSpecs,
    weightData: weightsBuffer.buffer.slice(
      weightsBuffer.byteOffset,
      weightsBuffer.byteOffset + weightsBuffer.byteLength
    ),
  };

  model = await tf.loadLayersModel(
    tf.io.fromMemory(modelArtifacts)
  );

  metadata = JSON.parse(
    fs.readFileSync(METADATA_PATH, "utf8")
  );

  console.log("AI crop prediction model loaded successfully.");
}

function normalize(value, min, max) {
  if (max === min) {
    return 0;
  }

  return (value - min) / (max - min);
}

async function predictCrop(input) {
  await loadModel();

  const featureNames = metadata.featureNames;
  const minValues = metadata.normalization.minValues;
  const maxValues = metadata.normalization.maxValues;

  const values = featureNames.map((feature, index) => {
    const value = Number(input[feature]);

    if (!Number.isFinite(value)) {
      throw new Error(`Invalid value for ${feature}`);
    }

    return normalize(
      value,
      minValues[index],
      maxValues[index]
    );
  });

  const inputTensor = tf.tensor2d([values]);

  const prediction = model.predict(inputTensor);
  const probabilities = await prediction.data();

  inputTensor.dispose();
  prediction.dispose();

  let bestIndex = 0;

  for (let i = 1; i < probabilities.length; i++) {
    if (probabilities[i] > probabilities[bestIndex]) {
      bestIndex = i;
    }
  }

  const crop = metadata.labels[bestIndex];
  const confidence = probabilities[bestIndex] * 100;

  return {
    crop,
    confidence: Number(confidence.toFixed(2)),
  };
}

module.exports = {
  loadModel,
  predictCrop,
};