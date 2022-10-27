const Program = require("../models/programModel.js");
const AppError = require("../utilities/appError.js");
const _ = require("lodash");
const Offer = require("../models/offerModel");

exports.createAnOffer = async (req, res, next) => {
    const newOffer = new Offer(req.body);

    try {
        const savedOffer = await newOffer.save();
        res.status(201).json(savedOffer);
    } catch(err) {
        return next(new AppError(400, err.message));
    }
}

exports.viewAllOffer = async (req, res, next) => {
    try {
        const offers = await Offer.find();
        res.status(201).json({
            message: 'success',
            // totalActiveOffers: offers.length,
            offers
        })
    } catch(err) {
        return next(new AppError(400, err.message));
    }
}

exports.updateAnOffer = async (req, res, next) => {
    try {
        const updatedOffer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(201).json({
            message: 'offer updated',
            updatedOffer
        });
    } catch(err) {
        return next(new AppError(400, err.message));
    }
}

exports.viewAnOffer = async (req, res, next) => {
    try {
        const offer = await Offer.findById(req.params.id);
        res.status(201).json({
            message: 'success',
            offer
        })
    } catch(err) {
        return next(new AppError(400, err.message));
    }
}

exports.deleteAnOffer = async (req, res, next) => {
    try {
        await Offer.findByIdAndDelete(req.params.id);
        res.status(201).json({
            message: 'offer deleted'
        })
    } catch(err) {
        return next(new AppError(400, err.message));
    }
}