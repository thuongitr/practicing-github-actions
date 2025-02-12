const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWorkoutSuggestion = async () => {
    await delay(5000); // 5 seconds delay
    return {
        workout: [
            { id: 1, name: 'Push-ups' },
            { id: 2, name: 'Squats' },
            { id: 3, name: 'Burpees' }
        ]
    };
};

export { fetchWorkoutSuggestion };