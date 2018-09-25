const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const pdClient = require('node-pagerduty');
const moment = require('moment');

const pdApiKey = process.env.PAGERDUTY_API_TOKEN;
const pd = new pdClient(pdApiKey);
const pdScheduleId = process.env.PAGERDUTY_SCHEDULE_ID;
let qs = {
  time_zone: 'UTC',
  since: moment().format(),
  until: moment().add(1, 'second').format()
};

const app = express();

// ref:
// https://www.twilio.com/docs/voice/tutorials/how-to-respond-to-incoming-phone-calls-node-js
app.post('/voice', (request, response) => {
  response.type('text/xml');
  const twiml = new VoiceResponse();

  // check on-call schedule
  pd.schedules.getSchedule(pdScheduleId, qs).then(res => {
    console.log(res.body);
    let body = JSON.parse(res.body);
    let user = body.schedule.final_schedule.rendered_schedule_entries[0].user;
    let userID = user.id;
    let userName = user.summary;

    // check phone number of the on-call user
    pd.users.getUser(userID, {'include[]': 'contact_methods'}).then(res => {
      console.log(res.body);

      let body = JSON.parse(res.body);
      let userItem = body.user.contact_methods.filter(x => (x.type == 'phone_contact_method'))

      console.log(userItem);
      let phoneNumber = "+" + userItem[0].country_code + userItem[0].address;
      
      // call forwarding
      twiml.say({ voice: 'alice' }, 'going to call ' + phoneNumber);
      twiml.dial(phoneNumber);
      response.send(twiml.toString());
    })
  }).catch(e => {
    twiml.say({ voice: 'alice' }, 'error: call routing failed');
  })
});

// health check
app.get('/_healthz', (request, response) => {
  response.send('OK');
})

// Create an HTTP server and listen for requests on port 3000
app.listen(process.env.PORT || 3000);

