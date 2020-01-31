exports.up = function (knex) {
    return knex.schema.createTable("monsters", table => {
        table.increments();

        table.string("name", 255)
            .notNullable()
            .unique()
            .index()
    });
};

exports.down = function (knex) {
    knex.schema.dropTableIfExists("monsters");
};
