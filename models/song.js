const mongoose = require("mongoose");
const Joi = require("joi")






const songSchema = new mongoose.Schema({
    title:{type: String, required: true},
    artist:{type: String, required: true},
    // song:{type: String, required: true},
    song: { type: String, required: true },
    img:{type: String, required: true},
    genre: {
        type: String,
        enum: [
            "Pop",
            "Rock",
            "Hip-Hop",
            "Jazz",
            "Classical",
            "Electronic",
            "Country",
            "R&B",
            "Reggae",
            "Metal",
            "Folk",
            "Blues",
            "Latin",
            "Islamic",
            "Qawwali",
        ], 
        required: true,
    duration:{type: Number, required: true},
   
    },
})

const validate = (song)=>{
    const schema = Joi.object({
        title: Joi.string().required(),
        artist: Joi.string().required(),
        // song: Joi.string().required(),
        song: Joi.string().uri().required(),
        img: Joi.string().uri().required(),
        genre: Joi.string().valid(
            "Pop",
            "Rock",
            "Hip-Hop",
            "Jazz",
            "Classical",
            "Electronic",
            "Country",
            "R&B",
            "Reggae",
            "Metal",
            "Folk",
            "Blues",
            "Latin",
            "Islamic",
            "Qawwali",
        ).required(),
        duration: Joi.number().required(),
        
    })
    return schema.validate(song);
}

const Song = mongoose.model("Song", songSchema)

module.exports = {Song, validate}