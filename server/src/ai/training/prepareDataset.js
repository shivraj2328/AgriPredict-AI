const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const FEATURE_NAMES = [
  "N",
  "P",
  "K",
  "temperature",
  "humidity",
  "ph",
  "rainfall",
];

const inputPath = path.join(
  __dirname,
  "../data/Crop_recommendation.csv"
);

const outputDir = path.join(__dirname, "../data/processed");

const processedDataPath = path.join(
  outputDir,
  "processed-dataset.json"
);

const metadataPath = path.join(
  outputDir,
  "preprocessing-metadata.json"
);

const rows = [];

fs.createReadStream(inputPath)
  .pipe(csv())
  .on("data", (row) => {
    rows.push(row);
  })
  .on("end", () => {
    try {
      if (rows.length === 0) {
        throw new Error("Dataset is empty.");
      }

      // Get unique crop labels
      const labels = [
        ...new Set(rows.map((row) => row.label)),
      ].sort();

      const labelMap = {};

      labels.forEach((label, index) => {
        labelMap[label] = index;
      });

      // Extract numerical features
      const features = rows.map((row) =>
        FEATURE_NAMES.map((feature) => Number(row[feature]))
      );

      // Calculate min/max for normalization
      const minValues = FEATURE_NAMES.map((_, index) =>
        Math.min(...features.map((row) => row[index]))
      );

      const maxValues = FEATURE_NAMES.map((_, index) =>
        Math.max(...features.map((row) => row[index]))
      );

      // Min-Max normalization
      const normalizedFeatures = features.map((row) =>
        row.map((value, index) => {
          const min = minValues[index];
          const max = maxValues[index];

          if (max === min) {
            return 0;
          }

          return (value - min) / (max - min);
        })
      );

      // Encode labels
      const encodedLabels = rows.map(
        (row) => labelMap[row.label]
      );

      // Create shuffled indices
      const indices = Array.from(
        { length: rows.length },
        (_, index) => index
      );

      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [indices[i], indices[j]] = [
          indices[j],
          indices[i],
        ];
      }

      // 80/20 split
      const trainSize = Math.floor(rows.length * 0.8);

      const trainIndices = indices.slice(0, trainSize);
      const testIndices = indices.slice(trainSize);

      const trainX = trainIndices.map(
        (index) => normalizedFeatures[index]
      );

      const trainY = trainIndices.map(
        (index) => encodedLabels[index]
      );

      const testX = testIndices.map(
        (index) => normalizedFeatures[index]
      );

      const testY = testIndices.map(
        (index) => encodedLabels[index]
      );

      const processedDataset = {
        trainX,
        trainY,
        testX,
        testY,
      };

      const metadata = {
        featureNames: FEATURE_NAMES,
        labels,
        labelMap,
        normalization: {
          method: "min-max",
          minValues,
          maxValues,
        },
        dataset: {
          totalRows: rows.length,
          featureCount: FEATURE_NAMES.length,
          classCount: labels.length,
          trainRows: trainX.length,
          testRows: testX.length,
        },
      };

      fs.mkdirSync(outputDir, {
        recursive: true,
      });

      fs.writeFileSync(
        processedDataPath,
        JSON.stringify(processedDataset, null, 2)
      );

      fs.writeFileSync(
        metadataPath,
        JSON.stringify(metadata, null, 2)
      );

      console.log("Dataset preparation completed.");
      console.log(`Total rows: ${rows.length}`);
      console.log(`Features: ${FEATURE_NAMES.length}`);
      console.log(`Classes: ${labels.length}`);
      console.log(`Training rows: ${trainX.length}`);
      console.log(`Testing rows: ${testX.length}`);
      console.log(`Processed dataset: ${processedDataPath}`);
      console.log(`Metadata: ${metadataPath}`);
    } catch (error) {
      console.error(
        "Dataset preparation failed:",
        error.message
      );

      process.exit(1);
    }
  })
  .on("error", (error) => {
    console.error(
      "Error reading dataset:",
      error.message
    );

    process.exit(1);
  });