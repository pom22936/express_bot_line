const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const AIMLParser = require('aimlparser')

const app = express()
const port = process.env.PORT || 4000
const aimlParser = new AIMLParser({ name: 'node_bot' })

aimlParser.load(['./test-aiml.xml'])

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    reply(reply_token, msg)
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
        messages: [
            {
                type: 'text',
                text: msg
            },
            {
                type: "template",
                altText: "this is a carousel template",
                template: {
                    type: "carousel",
                    columns: [
                        {
                            thumbnailImageUrl: "https://cdn.pixabay.com/photo/2017/10/24/00/39/bot-icon-2883144_960_720.png",
                            title: "this is menu1",
                            text: "description",
                            actions: [
                                {
                                    type: "message",
                                    label: "check port",
                                    data: "check port"
                                },
                                {
                                    type: "message",
                                    label: "check dns",
                                    data: "check dns"
                                },
                                {
                                    type: "message",
                                    label: "check utilize",
                                    uri: "check utilize"
                                }
                            ]
                        },
                        {
                            thumbnailImageUrl: "https://cdn.pixabay.com/photo/2017/10/24/00/39/bot-icon-2883144_960_720.png",
                            title: "this is menu2",
                            text: "description",
                            actions: [
                                {
                                    type: "postback",
                                    label: "check port",
                                    data: "check port"
                                },
                                {
                                    type: "postback",
                                    label: "check dns",
                                    data: "check dns"
                                },
                                {
                                    type: "uri",
                                    label: "check utilize",
                                    uri: "check utilize"
                                }
                            ]
                        }
                    ]
                }
            }
        ]
    })

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}
