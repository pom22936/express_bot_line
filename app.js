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
                altText: "this is a buttons template",
                template: {
                    type: "buttons",
                    thumbnailImageUrl: "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                    title: "Menu",
                    text: "Please select",
                    actions: [{
                        type: "postback",
                        label: "Buy",
                        data: "action=buy&itemid=123"
                    }, {
                        type: "postback",
                        label: "Add to cart",
                        data: "action=add&itemid=123"
                    }, {
                        type: "uri",
                        label: "View detail",
                        uri: "http://localhost:8080"
                    }]
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
