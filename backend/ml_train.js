const tf = require('@tensorflow/tfjs-node');
const path = require('path');

async function trainAndSaveModel() {
  // Simple dummy model
  const model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [9], units: 5, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 5, activation: 'softmax' }));
  model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy' });
  
  // Dummy data for demonstration
  const xs = tf.randomUniform([10, 9]);
  const ys = tf.oneHot(tf.tensor1d([0, 1, 2, 3, 4, 0, 1, 2, 3, 4], 'int32'), 5);
  
  console.log("Training dummy model...");
  await model.fit(xs, ys, { epochs: 5 });
  console.log("Training complete. Saving model...");

  // Save model in the backend/ml-model folder
  const modelPath = path.join(__dirname, 'ml-model');
  await model.save(`file://${modelPath}`);
  console.log(`Model saved to ${modelPath}`);
}

trainAndSaveModel().catch(console.error);
