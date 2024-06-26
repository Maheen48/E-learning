const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const fs = require('fs');
const routes = fs.readdirSync('./routes')
const csrf = require('csurf')
const cookieParser = require('cookie-parser')
const compression = require('compression')

dotenv.config()


const csrfProtection = csrf({ cookie: true })


const app = express();
const PORT = process.env.PORT || 5000
const enviorment = process.env.ENVOIRMENT

connectDB()

if (enviorment === "development") {
    app.use(morgan('dev'))
}
app.use(cors());
app.use(express.json({ limit: '5mb' }))
app.use(cookieParser())
app.use(compression())


routes.map(r => app.use('/api/v1', require('./routes/' + r)))


//csrf token genration
app.get('/api/v1/csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() })
})


const server = app.listen(PORT, () => console.log(`App is listing in ${enviorment} at port ${PORT}`))


process.on('unhandledRejection', (err, promise) => {
    console.log("ERROR UNHANDLED ===>", err);
    server.close(() => process.exit(1));
})