
let times = 0;

const syncDb =  () => {
    times++;
    console.log('tictack cada minuto cuenta....', times)
    return times
}

module.exports = {
    syncDb
}