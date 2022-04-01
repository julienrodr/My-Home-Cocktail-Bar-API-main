class Cocktail {
    id;
    name;
    describe;
    recipe;
    category;
    user_id;

    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
    }
}

module.exports = Cocktail;
