import { db, closeConnection } from './dbConnection';
import { addExercise, createWorkout } from './Workout';

beforeEach(async () => {
    await db("workouts_exercises").truncate();
    await db("workouts").truncate();
});

afterAll(async () => await closeConnection());

test('createWorkout creates a workout for a username', async () => {
    await createWorkout('Heimo Tulo');
    const result = await db.select('username').from('workouts');
    expect(result).toEqual([{ username: 'Heimo Tulo' }]);
});

test("addExercise adds an exercise to the workout", async () => {
    const username = "Heimo Tulo";
    await createWorkout(username);
    const { id: workoutId } = await db
        .select()
        .from("workouts")
        .where({ username });
    await addExercise(workoutId, "squats");
    const result = await db.select("exerciseName").from("workouts_exercises");
    expect(result).toEqual([{ workoutId, exerciseName: "squats" }]);
});
