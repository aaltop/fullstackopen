
interface calculateExercisesReturn {
    periodLength: number,
    trainingDays: number,
    target: number,
    average: number,
    success: boolean,
    rating: 1 | 2 | 3,
    ratingDescription:
        "too bad"
        | "not too bad but could be better"
        | "better"
}

function calculateExercises(exerciseHours: number[], target: number): calculateExercisesReturn {

    const periodLength: number = exerciseHours.length
    const trainingDays: number = exerciseHours.reduce((prev, cur) => prev + ((0 < cur) ? 1 : 0), 0)

    const average: number = (
        exerciseHours.reduce((prev, cur) => prev+cur)
        /periodLength
    )
    const success: boolean = average >= target

    let rating: calculateExercisesReturn["rating"]
    let ratingDescription: calculateExercisesReturn["ratingDescription"]
    if (average < 0.5*target) {
        rating = 1
        ratingDescription = "too bad"
    } else if (average < target) {
        rating = 2
        ratingDescription = "not too bad but could be better"
    } else {
        rating = 3
        ratingDescription = "better"
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}


console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))