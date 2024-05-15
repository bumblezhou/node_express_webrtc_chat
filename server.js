const express = require('express')
const app = express()
const { v4: uuidv4 } = require('uuid')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`)
})

app.get('/:room', (req, res) => {
    res.render('room', {roomId: req.params.room})
})

const https = require('https');
const path = require('path');
const socketio = require('socket.io');
const fs = require('fs');
// Path to your SSL certificate and key files
const options = {
    key: fs.readFileSync(path.join(__dirname, 'jackzhou.me.key')),
    cert: fs.readFileSync(path.join(__dirname, 'jackzhou.me.crt'))
}
const server = https.createServer(options, app)
const io = socketio(server)

io.on('connection', socket => {
    var temp_room_id, temp_user_id;
    socket.on('join-room', (roomId, userId) => {
        console.log(roomId, userId)
        socket.join(roomId)
        socket.to(roomId).emit('user-connected', userId)
        temp_room_id = roomId;
        temp_user_id = userId;
    })

    socket.on('disconnect', () => {
        socket.to(temp_room_id).emit('user-disconnected', temp_user_id)
    })
})

server.listen(443)