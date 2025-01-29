import { db } from './dbConnection';

const createWorkout = username => {
    if (typeof username !== 'string' || username.length < 4) {
        throw new Error("the parameter username is not valid");
    }
    return db('workouts').insert({ username });
};

const addExercise = (workoutId, exerciseName) => {
    return db('workouts_exercises').insert({ workoutId, exerciseName });
};

export { createWorkout, addExercise };