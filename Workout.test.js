import { db, closeConnection } from './dbConnection';
import { addExercise, createWorkout } from './Workout';

beforeEach(async () => {
    await db("workouts_exercises").truncate();
    await db("workouts").truncate();
});

afterAll(async () => await closeConnection());

describe("createWorkout", () => {

    test('create a workout for a username', async () => {
        await createWorkout('Heimo Tulo');
        const result = await db.select('username').from('workouts');
        expect(result).toEqual([{ username: 'Heimo Tulo' }]);
    });

});

describe("addExercise", () => {

    async function getWorkoutId(username) {
        return await db
            .select()
            .from("workouts")
            .where({ username });
    }

    test("add an exercise to the workout", async () => {
        const username = "Heimo Tulo";
        await createWorkout(username);
        const { id: workoutId } = await getWorkoutId(username);
        await addExercise(workoutId, "squats");
        const result = await db.select("exerciseName").from("workouts_exercises");
        expect(result).toEqual([{ workoutId, exerciseName: "squats" }]);
    });

});
