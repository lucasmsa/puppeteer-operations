const express = require('express')
const { documentsRouter } = require('./routes/documentsSelectionRD')
const { calendarRouter } = require('./routes/calendar')

const app = express();

app.use('/', documentsRouter)
app.use('/', calendarRouter)

app.listen((3000), () => console.log(`App listening on port ${3000} 🦦`))