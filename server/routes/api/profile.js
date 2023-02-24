const express = require('express');
const router = express.Router();
const Profile = require('../../model/Profile');

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Public
router.post('/', (req, res) => {
	const data = {
		name: req.body.name,
		walletAddress: req.body.walletAddress,
		address: req.body.address,
		detail: req.body.detail,
		job: req.body.job
	};

	Profile.findOneAndUpdate(
		{ walletAddress: req.body.walletAddress },
		{ $set: data },
		{ new: true, upsert: true, setDefaultsOnInsert: true }
	)
		.then((profile) => res.json(profile))
		.catch((err) => res.status(404).send('Sever Err'));
});

// @route    GET api/profile
// @desc     Create or update user profile
// @access   Public

module.exports = router;
