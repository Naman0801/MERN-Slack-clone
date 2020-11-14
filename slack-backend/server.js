import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Pusher from 'pusher';

import mongoData from './mongoData.js';

// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1107166",
    key: "6e6fc816201368692bf1",
    secret: "d945f20d094fa81ab1bc",
    cluster: "ap2",
    useTLS: true
});  

// app middleware
app.use(cors());
app.use(express.json());

// db config
// u847lwtWPIhlRnQ8 pass
const mongoURI = 'mongodb+srv://admin:u847lwtWPIhlRnQ8@cluster0.uommv.mongodb.net/slackDB?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
    console.log('DB Connected');

    const changeStream = mongoose.connection.collection('conversations').watch();

    changeStream.on('change', (change) => {
       if (change.operationType === 'insert') {
            pusher.trigger('channels', 'newChannel', {
                'change': change
            }); 
       } else if (change.operationType === 'update') {
            pusher.trigger('conversation', 'newMessage', {
                'change': change
            }); 
       } else {
           console.log('Error Triggering psher');
       } 
    })
})

// API routes
app.get('/', (req, res) => res.status(200).send('Slack clone by NAMAN'));

app.post('/new/channel', (req, res) => {
    const dbData = req.body;

    mongoData.create(dbData, (err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
});

app.post('/new/mesage', (req, res) => {
    const id = req.query.id;
    const newMessage = req.body;

    mongoData.update(
        {_id: id},
        {$push: {conversation: newMessage}},
        (err, data) => {
            if(err) {
                res.status(500).send(err);
            } else {
                res.status(201).send(data);
            } 
        }
    )
})

app.get('/get/channelList', (req, res) => {
    mongoData.find((err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            let channels = [];

            data.map((channelData) => {
                const channelInfo = {
                    id: channelData._id,
                    name: channelData.channelName
                }

                channels.push(channelInfo);
            })

            res.status(201).send(channels);
        }
    })
})

app.get('/get/conversation', (req, res) => {
    const id = req.query.id

    mongoData.find({ _id: id }, (err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})

// listen
app.listen(port, () => console.log(`listening to local host: ${port}`));
