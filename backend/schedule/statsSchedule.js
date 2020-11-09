const schedule = require('node-schedule')

module.exports = app =>{
    schedule.scheduleJob('*/1 * * * *', async function(){
        const usersCount = await app.db('users').count('id').first()
        const modalitiesCount = await app.db('modalities').count('id').first()
        const classesCount = await app.db('classes').count('id').first()

        const { Stat }=  app.api.stat

        const lastStat = await Stat.findOne({}, {}, {sort: {'createdAt': -1}})
        const stat = new Stat({
            users: usersCount.count,
            modalities: modalitiesCount.count,
            classes: classesCount.count,
            createdAt: new Date()
        })

        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeModalities = !lastStat || stat.modalities !== lastStat.modalities
        const changeClasses = !lastStat || stat.classes !== lastStat.classes
        if(changeUsers || changeModalities || changeClasses){
            stat.save().then(()=> console.log('[Stats] Estatística atualizadas!'))
        }
    })
}
