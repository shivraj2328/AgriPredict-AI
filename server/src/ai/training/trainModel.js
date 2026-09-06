const tf = require("@tensorflow/tfjs");
const fs = require("fs");
const path = require("path");

const processedDataPath = path.join(
  __dirname,
  "../data/processed/processed-dataset.json"
);

const modelOutputPath = path.join(
  __dirname,
  "../models/crop-model"
);

const data = JSON.parse(
  fs.readFileSync(processedDataPath, "utf8")
);

const numFeatures = data.trainX[0].length;
const numClasses = Math.max(...data.trainY) + 1;

// Convert data to tensors
const trainX = tf.tensor2d(data.trainX);

const trainY = tf.oneHot(
  tf.tensor1d(data.trainY, "int32"),
  numClasses
);

const testX = tf.tensor2d(data.testX);

const testY = tf.oneHot(
  tf.tensor1d(data.testY, "int32"),
  numClasses
);

// Create model
const model = tf.sequential();

model.add(
  tf.layers.dense({
    inputShape: [numFeatures],
    units: 64,
    activation: "relu",
  })
);

model.add(
  tf.layers.dropout({
    rate: 0.2,
  })
);

model.add(
  tf.layers.dense({
    units: 32,
    activation: "relu",
  })
);

model.add(
  tf.layers.dense({
    units: numClasses,
    activation: "softmax",
  })
);

// Compile model
model.compile({
  optimizer: tf.train.adam(0.001),
  loss: "categoricalCrossentropy",
  metrics: ["accuracy"],
});

model.summary();

async function saveModelManually(model, outputPath) {
  fs.mkdirSync(outputPath, {
    recursive: true,
  });

  const modelJSON = {
    modelTopology: model.toJSON(null, false),
    format: "layers-model",
    generatedBy: `TensorFlow.js ${tf.version.tfjs}`,
    convertedBy: "AgriPredict AI",
    weightsManifest: [
      {
        paths: ["weights.bin"],
        weights: model.getWeights().map((weight) => ({
          name: weight.name,
          shape: weight.shape,
          dtype: weight.dtype,
        })),
      },
    ],
  };

  const weightData = await model.getWeights();

  const tensors = await Promise.all(
    weightData.map(async (weight) => {
      const values = await weight.data();
      return new Uint8Array(
        values.buffer,
        values.byteOffset,
        values.byteLength
      );
    })
  );

  const totalBytes = tensors.reduce(
    (total, tensor) => total + tensor.byteLength,
    0
  );

  const combinedWeights = new Uint8Array(totalBytes);

  let offset = 0;

  for (const tensor of tensors) {
    combinedWeights.set(tensor, offset);
    offset += tensor.byteLength;
  }

  fs.writeFileSync(
    path.join(outputPath, "model.json"),
    JSON.stringify(modelJSON, null, 2)
  );

  fs.writeFileSync(
    path.join(outputPath, "weights.bin"),
    Buffer.from(combinedWeights)
  );
}

async function trainModel() {
  try {
    console.log("\nStarting model training...\n");

    await model.fit(trainX, trainY, {
      epochs: 100,
      batchSize: 32,
      validationData: [testX, testY],
      shuffle: true,

      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          console.log(
            `Epoch ${epoch + 1}: ` +
              `loss=${logs.loss.toFixed(4)}, ` +
              `accuracy=${logs.acc.toFixed(4)}, ` +
              `val_loss=${logs.val_loss.toFixed(4)}, ` +
              `val_accuracy=${logs.val_acc.toFixed(4)}`
          );
        },
      },
    });

    const evaluation = model.evaluate(testX, testY);

    const testLoss = await evaluation[0].data();
    const testAccuracy = await evaluation[1].data();

    console.log("\nFinal Evaluation");
    console.log("-------------------------");
    console.log(`Test Loss: ${testLoss[0].toFixed(4)}`);
    console.log(
      `Test Accuracy: ${(testAccuracy[0] * 100).toFixed(2)}%`
    );

    console.log("\nSaving model...");

    await saveModelManually(
      model,
      modelOutputPath
    );

    console.log("\nModel saved successfully:");
    console.log(modelOutputPath);

    console.log("\nFiles created:");

    console.log(
      path.join(modelOutputPath, "model.json")
    );

    console.log(
      path.join(modelOutputPath, "weights.bin")
    );

    // Dispose tensors
    trainX.dispose();
    trainY.dispose();
    testX.dispose();
    testY.dispose();

    console.log("\nTraining completed successfully. ✅");
  } catch (error) {
    console.error("\nModel training failed:");
    console.error(error);

    trainX.dispose();
    trainY.dispose();
    testX.dispose();
    testY.dispose();

    process.exit(1);
  }
}

trainModel();