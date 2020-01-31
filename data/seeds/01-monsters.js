exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("monsters").del()
    .then(function () {
      // Inserts seed entries
      return knex("monsters").insert([
        { name: 'Deviljho' },
        { name: 'Seregios' },
        { name: 'Valstrax' },
        { name: 'Dodogama' },
        { name: 'Kushala Daora' },
        { name: 'Khezu' },
      ]);
    });
};
