class Garnish {

    id;
    name;
    describe;
    category;

    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
    }
}

module.exports = Garnish;
