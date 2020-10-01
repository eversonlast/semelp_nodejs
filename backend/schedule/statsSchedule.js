const schedule = require('node-schedule')

module.exports = app =>{
    schedule.scheduleJob('*/1 * * * *', async function(){
        const usersCount = await app.db('users').count('id').first()
        const modalitiesCoutn = await app.db('modalities').count('id').first()

        const { Stat }=  app.api.stat

        const lastStat = await Stat.findOne({}, {}, {sort: {'createdAt': -1}})
        const stat = new Stat({
            users: usersCount.count,
            modalities: modalitiesCoutn.count,
            createdAt: new Date()
        })

        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeModalities = !lastStat || stat.modalities !== lastStat.modalities
        if(changeUsers || changeModalities){
            stat.save().then(()=> console.log('[Stats] Estatística atualizadas!'))
        }
    })
}
