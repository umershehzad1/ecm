'use strict'

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

const express = require('express');
              require('express-group-routes');
     
/** Controllers **/
const campaignCtrl = require('../app/Http/Controllers/v1/CampaignController');

const	app = express.Router();

app.group("/campaign", (Route) => {

    Route.get("/get-subscribers", campaignCtrl.getSubscribers);
    Route.post("/add-subscriber", campaignCtrl.addSubscriber);
    Route.post("/unsubscribe", campaignCtrl.unsubscribe);
    Route.post("/start-campaign", campaignCtrl.startCampaign);
});

module.exports = app;