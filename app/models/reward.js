class Reward {

    id;
    name;
    describe;
    user_id;

    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
    }
}

module.exports = Reward;
