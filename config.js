module.exports={
port:process.env.PORT || 3000,
db: process.env.MONGODB || 'mongodb://localhost:27017/mydb',
urlParser: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
}
}