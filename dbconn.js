// Mongoose module ko import kar rahe hain
const mongoose = require('mongoose')

// MongoDB ka URI define kar rahe hain jisme 'online_ride_booking' naam ka database hai
const mongoURI = 'mongodb://localhost:27017/online_ride_booking'

// Mongoose se database connect kar rahe hain
mongoose.connect(mongoURI)
.then(() => {
    console.log("Database Connectivity Established...") // Agar connection successful hua to ye print hoga
})
.catch((err) => {
    console.log("Database connectivity failed...") // Agar error aayi to ye message print hoga
})

// Mongoose ko export kar rahe hain taaki dusri files me use kar sake
module.exports = mongoose


