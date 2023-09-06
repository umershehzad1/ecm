'use strict'

let mongoose = require('mongoose');

let schema = new mongoose.Schema({

	email: {type: String, required: true, unique: true},
	active: {type: Boolean, default: true}
}, { timestamps: true } );

mongoose.model('Subscriber', schema);