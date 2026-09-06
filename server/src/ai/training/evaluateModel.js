const tf = require("@tensorflow/tfjs");
const fs = require("fs");
const path = require("path");

const modelDir = path.join(
  __dirname,
  "../models/crop-model"
);

const modelJsonPath = path.join(
  modelDir,
  "model.json"
);

const weightsPath = path.join(
  modelDir,
  "weights.bin"
);

const processedDataPath = path.join(
  __dirname,
  "../data/processed/processed-dataset.json"
);

const metadataPath = path.join(
  __dirname,
  "../data/processed/preprocessing-metadata.json"
);

async function loadSavedModel() {
  const modelJSON = JSON.parse(
    fs.readFileSync(modelJsonPath, "utf8")
  );

  const weightsBuffer = fs.readFileSync(weightsPath);

  const weightSpecs =
    modelJSON.weightsManifest[0].weights;

  const weightData = new Uint8Array(
    weightsBuffer
  ).buffer;

  const model = await tf.loadLayersModel(
    tf.io.fromMemory(
      modelJSON.modelTopology,
      weightSpecs,
      weightData
    )
  );

  return model;
}

async function evaluateModel() {
  try {
    console.log("\nLoading trained model...\n");

    const model = await loadSavedModel();

    const data = JSON.parse(
      fs.readFileSync(
        processedDataPath,
        "utf8"
      )
    );

    const metadata = JSON.parse(
      fs.readFileSync(
        metadataPath,
        "utf8"
      )
    );

    const testX = tf.tensor2d(data.testX);

    const testY = tf.tensor1d(
      data.testY,
      "int32"
    );

    // Generate predictions
    const predictions =
      model.predict(testX);

    const predictedClasses =
      predictions.argMax(1);

    // Calculate accuracy
    const correct =
      predictedClasses
        .equal(testY)
        .sum();

    const correctCount =
      (await correct.data())[0];

    const totalCount =
      data.testY.length;

    const accuracy =
      (correctCount / totalCount) * 100;

    console.log(
      "============================"
    );
    console.log(
      "MODEL EVALUATION"
    );
    console.log(
      "============================"
    );

    console.log(
      `Test samples: ${totalCount}`
    );

    console.log(
      `Correct predictions: ${correctCount}`
    );

    console.log(
      `Incorrect predictions: ${
        totalCount - correctCount
      }`
    );

    console.log(
      `Accuracy: ${accuracy.toFixed(2)}%`
    );

    // Sample predictions
    const predictionValues =
      await predictions.array();

    const predictedArray =
      predictedClasses.arraySync();

    console.log(
      "\nSample Predictions"
    );

    console.log(
      "============================"
    );

    const sampleCount = Math.min(
      10,
      data.testX.length
    );

    for (
      let i = 0;
      i < sampleCount;
      i++
    ) {
      const actualClass =
        data.testY[i];

      const predictedClass =
        predictedArray[i];

      const confidence =
        Math.max(
          ...predictionValues[i]
        ) * 100;

      const actualCrop =
        metadata.labels[
          actualClass
        ];

      const predictedCrop =
        metadata.labels[
          predictedClass
        ];

      console.log(
        `${i + 1}. Actual: ${actualCrop} | ` +
        `Predicted: ${predictedCrop} | ` +
        `Confidence: ${confidence.toFixed(2)}%`
      );
    }

    // Per-crop evaluation
    console.log(
      "\nPer-Crop Evaluation"
    );

    console.log(
      "============================"
    );

    const cropStats = {};

    metadata.labels.forEach(
      (label) => {
        cropStats[label] = {
          total: 0,
          correct: 0,
        };
      }
    );

    for (
      let i = 0;
      i < data.testY.length;
      i++
    ) {
      const actualClass =
        data.testY[i];

      const actualCrop =
        metadata.labels[
          actualClass
        ];

      cropStats[actualCrop]
        .total++;

      if (
        predictedArray[i] ===
        actualClass
      ) {
        cropStats[actualCrop]
          .correct++;
      }
    }

    Object.entries(
      cropStats
    ).forEach(
      ([crop, stats]) => {
        const cropAccuracy =
          stats.total > 0
            ? (stats.correct /
                stats.total) *
              100
            : 0;

        console.log(
          `${crop}: ` +
          `${stats.correct}/${stats.total} ` +
          `(${cropAccuracy.toFixed(2)}%)`
        );
      }
    );

    // Cleanup
    testX.dispose();
    testY.dispose();
    predictions.dispose();
    predictedClasses.dispose();
    correct.dispose();

    console.log(
      "\nModel evaluation completed successfully. ✅"
    );
  } catch (error) {
    console.error(
      "\nModel evaluation failed:"
    );

    console.error(error);

    process.exit(1);
  }
}

evaluateModel();