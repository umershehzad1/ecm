'use strict'

const mongoose = require('mongoose');
const Subscriber = mongoose.model('Subscriber');

let config     = {}; 
config.app = require('../../../../config/app');
config.services = require('../../../../config/services');

const json = require('../../../Traits/ApiResponser');
const email = require('../../../Traits/sendEmail');

let o = {}

o.getSubscribers = async (req, res, next) => {
    try{
        
        const subscribers = await Subscriber.find({ active: true});
        json.showAll(res, subscribers, 200)
    }catch(err){

        console.log('Error', err)
        return json.errorResponse(res, err)
    }
    

}

o.addSubscriber = async (req, res, next) => {

    try{
        const subscriber = await Subscriber.findOne({ email: req.body.email});

        if(subscriber){

            return json.errorResponse(res, 'Subscriber Already Exist!', 409)
        }

        let newSubscriber = new Subscriber({

            email: req.body.email
        })

        newSubscriber = await newSubscriber.save()

        json.showOne(res, newSubscriber, 201)

    }catch(err){

        console.log('Error', err)
        return json.errorResponse(res, err)
    }
    
}

o.unsubscribe = async (req, res, next) => {

    try{

        const subscriber = await Subscriber.find({ email: req.body.email});

        if(!subscriber){

            return json.errorResponse(res, 'Subscriber does not exist!', 404)
        }
        
        const updatedSubscriber = await Subscriber.findOneAndUpdate({ email: req.body.email }, { $set: {default: false}}, { upsert: true, new: true })

        json.showOne(res, updatedSubscriber)

    }catch(e) {
        
        return json.errorResponse(res, err)
    }
}

o.startCampaign = async (req, res, next) => {

    try{

        const subscribers = await Subscriber.find({ active: true});

        subscribers.forEach((subscriber) => {
            
            email.send(subscriber.email, req.body.subject, req.body.html);
        })
        
        json.showOne(res, "The campaign has been started!");

    }catch(e) {
        
        return json.errorResponse(res, err)
    }
}

module.exports = o;