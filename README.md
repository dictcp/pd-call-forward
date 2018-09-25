PagerDuty Oncall Call Forwarding
====

Leverage on Twilio TwiML and PagerDuty API v2, this small service will forward phone call to on-call engineers.

How it works
----
```
+----------------------------------------------------------------------------+
|      +                                                                     |
|      |                                                                     |
|      | Incoming call to a virtual number at Twilio                         |
|      |                                                                     |
|      |                                                                     |
|      v                                                                     |
|  +--------+                      +-----------------+         +--------+    |
|  |        |    TwiML request     |                 |         |        |    |
|  + Twilio +--------------------->| pd-call-forward |-------->| PD API |    |
|  |        +<---------------------+                 |<--------+        |    |
|  +---+----+    TwiML response    +-----------------+         +--------+    |
|      |                                                                     |
|      |                                                                     |
|      | Call forwarding                                                     |
|      |                                                                     |
|      v                                                                     |
|  +-----+------------+                                                      |
|  | On-call engineer |                                                      |
|  +------------------+                                                      |
+----------------------------------------------------------------------------+
```

Reference
----
- https://www.twilio.com/docs/voice/twiml
- https://www.twilio.com/docs/voice/tutorials/how-to-respond-to-incoming-phone-calls-node-js
- https://www.twilio.com/docs/voice/tutorials/call-forwarding-nodejs-express
- https://v2.developer.pagerduty.com/v2/page/api-reference
- https://github.com/vend/phoneduty
    - similar project, but broken due to Pagerduty API v1 deprecation

