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
                            thumbnailImageUrl: "https://image.shutterstock.com/image-illustration/3d-rendering-robot-working-virtual-600w-621862202.jpg",
                            imageBackgroundColor: "#FFFFFF",
                            title: "hi i'm bot server1",
                            text: "สวัสดีครับ มีอะไรให้ผมรับใช้ครับ",
                            defaultAction: {
                                type: "uri",
                                label: "View detail",
                                uri: "https://www.google.com/"
                            },
                            actions: [
                                {
                                    type: "message",
                                    label: "check port",
                                    text: "check port"
                                },
                                {
                                    type: "message",
                                    label: "check dns",
                                    text: "check dns"
                                },
                                {
                                    type: "message",
                                    label: "check utilize",
                                    text: "check utilize"
                                }
                            ]
                        },
                        {
                            thumbnailImageUrl: "https://image.shutterstock.com/image-illustration/3d-rendering-robot-working-virtual-600w-621862202.jpg",
                            imageBackgroundColor: "#000000",
                            title: "hi i'm bot server2",
                            text: "สวัสดีครับ มีอะไรให้ผมรับใช้ครับ",
                            defaultAction: {
                                type: "uri",
                                label: "View detail",
                                uri: "https://www.google.com/"
                            },
                            actions: [
                                {
                                    type: "message",
                                    label: "check port",
                                    text: "check port"
                                },
                                {
                                    type: "message",
                                    label: "check dns",
                                    text: "check dns"
                                },
                                {
                                    type: "message",
                                    label: "check utilize",
                                    text: "check utilize"
                                }
                            ]
                        }
                    ],
                    imageAspectRatio: "rectangle",
                    imageSize: "cover"
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
