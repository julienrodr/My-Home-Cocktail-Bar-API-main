class Soft {

    id;
    name;
    describe;

    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
    }
}

module.exports = Soft;
