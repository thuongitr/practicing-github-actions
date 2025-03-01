import { db, closeConnection } from './dbConnection.js';
import { jest } from '@jest/globals';
import { addExercise, createWorkout } from './Workout.js';
import { logger } from './logger.js';


beforeAll(() => jest.spyOn(logger, "logInfo").mockImplementation(jest.fn()));

beforeEach(async () => {
    await db("workouts_exercises").truncate();
    await db("workouts").truncate();
});

afterEach(() => logger.logInfo.mockClear());

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

    test("log added exercise", () => {
        expect.assertions(3);
        addExercise(1, "squats");
        const callArguments = logger.logInfo.mock.calls[0];
        const [firstArgument, secocndArgument] = callArguments;
        expect(logger.logInfo.mock.calls).toHaveLength(1);
        expect(firstArgument).toEqual({ workoutId: 1, exerciseName: "squats" });
        expect(secocndArgument).toEqual("Exercise squats added to workout 1");
    });

});

