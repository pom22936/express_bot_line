const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const AIMLParser = require('aimlparser')

const app = express()
const port = process.env.PORT || 4000
const aimlParser = new AIMLParser({ name:'node_bot' })

aimlParser.load(['./test-aiml.xml'])

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    aimlParser.getResult(msg, (answer, wildCardArray, input) => {
        reply(reply_token, answer)
    })
    res.sendStatus(200)
})

app.post('/bot/richmenu', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    richmenu(reply_token)
    res.sendStatus(200)
})

app.listen(port)

function reply(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 93/xB6ktp/LJ43Qisrnt9VZnlD3XLUMqcqi9HSCStI8GA56e9TBUQfjFeZBsh8J5zkgsqJJWdJrdZofv+d5eTa7pvC9f5wNyETUpj493RX+nDEK65RE3jrc4bx5/SOncN4KzqPT/mKsC0BJlkARUAwdB04t89/1O/w1cDnyilFU='
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msg
        }]
    })

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

function richmenu(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 93/xB6ktp/LJ43Qisrnt9VZnlD3XLUMqcqi9HSCStI8GA56e9TBUQfjFeZBsh8J5zkgsqJJWdJrdZofv+d5eTa7pvC9f5wNyETUpj493RX+nDEK65RE3jrc4bx5/SOncN4KzqPT/mKsC0BJlkARUAwdB04t89/1O/w1cDnyilFU='
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        "size": {
            "width": 2500,
            "height": 1686
          },
          "selected": false,
          "name": "Nice richmenu",
          "chatBarText": "Tap to open",
          "areas": [
            {
              "bounds": {
                "x": 0,
                "y": 0,
                "width": 2500,
                "height": 1686
              },
              "action": {
                "type": "postback",
                "data": "action=buy&itemid=123"
              }
            }
          ]
    })

    request.post({
        url: 'https://api.line.me/v2/bot/richmenu',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}