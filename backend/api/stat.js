module.exports = app =>{
    const Stat = app.mongoose.model('Stat', {
        users: Number,
        modalities: Number,
        classes: Number,
        createdAt: Date
    })

    const get = (req, res)=>{
        Stat.findOne({}, {}, {sort: {'createdAt': -1} })
            .then(stat => {
                const defaultStat = {
                    users: 0,
                    modalities: 0,
                    classes: 0
                }
                res.json(stat|| defaultStat)
            })
    }
    
    return{ Stat, get }
}
