const {app,
       connectDB
} = require('./app.js')

app.listen(5000, async () => {
    console.log("Server is running on port 5000")
    await connectDB()
})

