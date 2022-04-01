class Alcohol {
    id;
    name;
    describe;
    localisation;
    category;
    nose;
    brand;

    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
    }
}

module.exports = Alcohol;
