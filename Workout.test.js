import assert from "assert";
import { Workout } from "./Workout.js";

const workout = new Workout();
workout.addToWorkout("squats");
workout.removeFromWorkout("squats");
assert.deepStrictEqual(workout.exercises, []);

console.log("Workout test passed");
