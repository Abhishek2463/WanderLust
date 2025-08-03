const mongoose = require("mongoose");
const reviews = require("./review");
const Review = require("./review.js");
const { required } = require("joi");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    location: String,
    country: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }, ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        },
    },
});

listingSchema.post("findOneAndDelete", async(listing) => {
    if (listing) {
        await Review.deleteMany({ reviews: { $in: listing.reviews } });
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;