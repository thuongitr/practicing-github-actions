export const up = async knex => {

    await knex.schema.createTable("workouts", table => {
        table.increments("id");
        table.string("username");
    });

    await knex.schema.createTable("workouts_exercises", table => {
        table.integer("workoutId").references("workouts.id");
        table.string("exerciseName");
    });
};

export const down = async knex => {
    await knex.schema.dropTable("workouts");
    await knex.schema.dropTable("workouts_exercises");
};
