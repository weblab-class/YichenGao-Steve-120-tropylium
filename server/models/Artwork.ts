const mongoose = require("mongoose");

const ArtworkSchema = new mongoose.Schema({
  creator_id: String,
  cellDeltas: [[Number]],
  endDelta: [Number],
  numIterations: Number,
});

export interface Artwork extends Document {
  creator_id: string;
  cellDeltas: number[][];
  endDelta: number[];
  numIterations: number;
  _id: string;
}

module.exports = mongoose.model("artwork", ArtworkSchema);
