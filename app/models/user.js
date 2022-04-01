class User {

    id;
    first_name;
    Last_name;
    mail;
    password;
    pseudo;
    role;

    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
    }
}

module.exports = User;
