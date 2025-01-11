import { Workout } from "./Workout.js";

const workout = new Workout();
workout.addToWorkout("squats");

const hasOneExercise = workout.exercises.length === 1;
const hasSquatsExercise = workout.exercises[0] === "squats";

if (hasOneExercise && hasSquatsExercise) {
    console.log("The Workout has a function to add an exercise to the it");
} else {
    const actualContent = workout.exercises.join(", ");
    console.error("The addToWorkout function didn't do what we expect!");
    console.error(`Here is the actual content of the workout: ${actualContent}`);
    throw new Error("Test failed!");
}
