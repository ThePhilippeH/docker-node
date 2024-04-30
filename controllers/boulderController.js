const Boulder = require('../models/boulder');

exports.getAllBoulders = async (req, res, next) => {
    try {
        const boulders = await Boulder.find();
        res.status(200).json({
            status: 'success',
            results: boulders.length,
            data: {
                boulders,
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'SUPERFAIL',
        });
    }
}

exports.getBoulderByName = async (req, res) => {
    try {
        const boulder = await Boulder.find({name: req.params.name});
        res.status(200).json({
            status: 'success',
            data: {
                boulder,
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
        });
    }
}

exports.getAllGrade = async (req, res) => {
    try {
        const boulders = await Boulder.find({grade: req.params.grade});
        res.status(200).json({
            status: 'success',
            results: boulders.length,
            data: {
                boulders,
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
        });
    }
}

exports.getAllArea = async (req, res) => {
    try {
        const boulders = await Boulder.find({area: req.params.area});
        res.status(200).json({
            status: 'success',
            results: boulders.length,
            data: {
                boulders,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
        });
    }
}

exports.getAllAscentType = async (req, res) => {
    try {
        const boulders = await Boulder.find({ascentType: req.params.ascentType});
        res.status(200).json({
            status: 'success',
            results: boulders.length,
            data: {
                boulders,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
        });
    }
}

exports.getAllWithBeta = async (req, res) => {
    try {
        const boulders = await Boulder.find({betaLink: {$exists: true}});
        res.status(200).json({
            status: 'success',
            results: boulders.length,
            data: {
                boulders,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
        });
    }
}

exports.createBoulder = async (req, res) => {
    try {
        const newBoulder = await Boulder.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                boulder: newBoulder,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail',
        });
    }
}
exports.getBoulderByNameAndArea = async (req, res) => {
    try {
        const boulder = await Boulder.find({name: req.params.name, area: req.params.area});
        res.status(200).json({
            status: 'success',
            data: {
                boulder,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
        });
    }
}

exports.updateBoulder = async (req, res) => {
    try {
        const boulder = await Boulder.findByIdAndUpdate
        (req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'success',
            data: {
                boulder,
            },
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
        });
    }
}

exports.deleteBoulder = async (req, res) => {
    try {
        await Boulder.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
        });
    }
}

exports.getBoulderById = async (req, res) => {
    try {
        const boulder = await Boulder.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                boulder,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
        });
    }
}
exports.updateByNameAndArea = async (req, res) => {

    try {
        const boulder = await Boulder.findOneAndUpdate({name: req.params.name, area: req.params.area}, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'success',
            data: {
                boulder,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
        });
    }
}

exports.deleteByNameAndArea = async (req, res) => {
    try {
        await Boulder.findOneAndDelete({name: req.params.name, area: req.params.area});
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
        });
    }
}