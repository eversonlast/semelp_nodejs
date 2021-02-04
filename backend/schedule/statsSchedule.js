const schedule = require('node-schedule')

module.exports = app =>{
    const {waitingList} = app.api.waitingList
    schedule.scheduleJob('*/1 * * * *', async function(){
        const usersCount = await app.db('users').count('id').first()
        const modalitiesCount = await app.db('modalities').count('id').first()
        const classesCount = await app.db('classes').count('id').first()
        const classesUsersCount = await app.db('classesUsers').count('id').first().where({activeClass: true})
        const waitingListCount = await waitingList.estimatedDocumentCount()

        const { Stat }=  app.api.stat

        const lastStat = await Stat.findOne({}, {}, {sort: {'createdAt': -1}})
        const stat = new Stat({
            users: usersCount.count,
            modalities: modalitiesCount.count,
            classes: classesCount.count,
            classesUsers: classesUsersCount.count,
            waitingList: waitingListCount,
            createdAt: new Date()
        })

        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeModalities = !lastStat || stat.modalities !== lastStat.modalities
        const changeClasses = !lastStat || stat.classes !== lastStat.classes
        const changeClassesUsers = !lastStat || stat.classesUsers !== lastStat.classesUsers
        const changeWaitingList = !lastStat || stat.waitingList !== lastStat.waitingList
        if(changeUsers || changeModalities || changeClasses || changeClassesUsers || changeWaitingList){
            stat.save().then(()=> console.log('[Stats] Estatística atualizadas!'))
        }
    })
}
