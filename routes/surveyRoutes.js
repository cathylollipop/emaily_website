const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
       // current user - req.user
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false });

        // no need to send back the entire recipient list
        res.send(surveys);
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');

        _.chain(req.body)
            .map(({ email, url }) => {
               const match = p.test(new URL(url).pathname); // return an object with survey Id and choice
                if(match) {
                    return { email, surveyId: match.surveyId, choice: match.choice };
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                // run the query for each event
                // no communication from express to mongo database by using this function, everything is done in database
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false }
                    }
                }, {
                    // $inc is called a mongo operator - increment
                    // key interpretation [choice] doesn't create an array - during the run time, replace the choice to yes or no based on actual assigned choice
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }).exec();
            })
            .value();

        res.send({});
    });

    // can have as many as arguments, but need to put middlewares in order of running
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey ({
           title,
           subject,
           body,
           //recipients: recipient.split(',').map(email => { return { email: email }})
           recipients: recipients.split(',').map(email => ({ email: email.trim() })),          _user: req.user.id,
           dateSent: Date.now()
        });

        // Great place to send an email!
        const mailer = new Mailer(survey, surveyTemplate(survey));

        // there might be any error happen in these async await functions so use try catch
        try{
            await mailer.send(); // an async function - make sure send completes first
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user); // send back the user model with updated user model and get the header updated

        } catch (err) {
            res.status(422).send(err);
        }
    });
};