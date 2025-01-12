import { db } from './dbConnection';

const createWorkout = username => {
  return db('workouts').insert({ username });
};

const addExercise = (workoutId, exerciseName) => {
  return db('workouts_exercises').insert({ workoutId, exerciseName });
};

export { createWorkout, addExercise };