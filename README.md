PagerDuty Oncall Call Forwarding
====

Leverage on Twilio TwiML and PagerDuty API v2, this small service will forward phone call to on-call engineers.

Installation
----
TBD

How it works
----
```
+----------------------------------------------------------------------------------------+
|      +                                                                                 |
|      |                                                                                 |
|      | Incoming call to a virtual number at Twilio                                     |
|      |                                                                                 |
|      |                                                                                 |
|      v                                                                                 |
|  +--------+                      +-----------------+  check who is       +--------+    |
|  |        |    TwiML request     |                 |    on-call          |        |    |
|  + Twilio +--------------------->| pd-call-forward |-------------------->| PD API |    |
|  |        +<---------------------+                 |<--------------------+        |    |
|  +---+----+    TwiML response    +-----------------+  get on-call and    +--------+    |
|      |                                                 his phone no.                   |
|      |                                                                                 |
|      | Call forwarding                                                                 |
|      |                                                                                 |
|      v                                                                                 |
|  +-----+------------+                                                                  |
|  | On-call engineer |                                                                  |
|  +------------------+                                                                  |
+----------------------------------------------------------------------------------------+
```

Other similar projects
----
- https://github.com/vend/phoneduty (possibly broken due to Pagerduty API v1 deprecation)
- https://github.com/appliscale/telephonist
- https://github.com/guardian/smooth-operator
- https://github.com/ajohnstone/autoscale/tree/master/scripts/pager-duty-to-twilio


Reference
----
- https://www.twilio.com/docs/voice/twiml
- https://www.twilio.com/docs/voice/tutorials/how-to-respond-to-incoming-phone-calls-node-js
- https://www.twilio.com/docs/voice/tutorials/call-forwarding-nodejs-express
- https://v2.developer.pagerduty.com/v2/page/api-reference

