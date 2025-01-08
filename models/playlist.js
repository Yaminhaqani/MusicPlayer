const mongoose = require("mongoose");
const Joi = require("joi");

const playlistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    desc: { type: String },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
    img: { type: String },
  },
  { timestamps: true }
);

const validate = (playlist) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    user: Joi.string().required(),
    desc: Joi.string().allow(""),
    songs: Joi.string().required(),
    img: Joi.string().allow(""),
  });
  return schema.validate(playlist);
};

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = { Playlist, validate };
