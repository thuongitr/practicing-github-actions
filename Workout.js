import { db } from './dbConnection';
import { logger } from './logger';

const createWorkout = username => {
    if (typeof username !== 'string' || username.length < 4) {
        throw new Error("the parameter username is not valid");
    }
    return db('workouts').insert({ username });
};

const addExercise = (workoutId, exerciseName) => {
    const result = db('workouts_exercises').insert({ workoutId, exerciseName });
    logger.logInfo({ workoutId, exerciseName }, `Exercise ${exerciseName} added to workout ${workoutId}`);
    return result;
};

export { createWorkout, addExercise };