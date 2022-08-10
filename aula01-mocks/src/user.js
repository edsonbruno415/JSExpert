class User {
    constructor({ id, name, profession, age }) {
        const currentYear = 2020;
        this.id = +id;
        this.name = name;
        this.profession = profession;
        this.birthDay = currentYear - (+age);
    }
}

module.exports = User;