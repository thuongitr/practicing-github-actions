import { db, closeConnection } from './dbConnection';
import jest from 'jest-mock';
import { addExercise, createWorkout } from './Workout';
import { logger } from './logger';

beforeEach(async () => {
    await db("workouts_exercises").truncate();
    await db("workouts").truncate();
});

afterAll(async () => await closeConnection());

describe("createWorkout", () => {

    test('create a workout for a valid username', async () => {
        expect.hasAssertions();
        await createWorkout('Heimo Tulo');
        const result = await db.select('username').from('workouts');
        expect(result).toEqual([{ username: 'Heimo Tulo' }]);
    });

    test('create a workout for a missing username', async () => {
        expect.hasAssertions();
        try {
            await createWorkout();
        } catch (e) {
            const result = await db.select('username').from('workouts');
            expect(result).toEqual([]);
        }
    });

    test('create a workout with invalid parameter value throws error', async () => {
        expect(() => createWorkout("HT")).toThrow();
        const result = await db.select('username').from('workouts');
        expect(result).toEqual([]);
    });

    test('create a workout for a too short username', async () => {
        expect.assertions(1);
        try {
            await createWorkout('HT');
        } catch (e) {
            const result = await db.select('username').from('workouts');
            expect(result).toEqual([]);
        }
    });

});

describe("addExercise", () => {

    async function getWorkoutId(username) {
        return await db
            .select("id")
            .from("workouts")
            .where({ username });
    }

    test("add an exercise to the workout", async () => {
        const username = "Heimo Tulo";
        await createWorkout(username);
        const workoutId = (await getWorkoutId(username))[0].id;
        await addExercise(workoutId, "squats");
        const result = await db.select("workoutId", "exerciseName").from("workouts_exercises");
        expect(result).toEqual([{
            workoutId: workoutId,
            exerciseName: "squats"
        }]);
    });

});
