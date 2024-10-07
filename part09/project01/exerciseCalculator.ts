
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

interface Args {
    target: number,
    exerciseHours: number[]
}

function parseArgs(args: string[]): Args {
    const stringNums: string[] = args.slice(2)

    const usage: string = `
        usage: exerciseCalculator <targetAverage> <...hoursPerDay>

        targetAverage: number
            The aimed-for average exercise hours over the course of the
            training period.
        
        hoursPerDay: number
            The exercise hours per day during the training period.

        All values should be positive.
    `

    if (stringNums.length < 2) {
        console.log(usage)
        throw Error("Invalid number of command line arguments!")
    }

    const nums = stringNums.map(parseFloat)
    if (nums.some(isNaN)) {
        console.log(usage)
        throw Error("Arguments should be parseable to floats!")
    }

    if (nums.some(num => num < 0)) {
        console.log(usage)
        throw Error("Arguments should be positive!")
    }

    return {
        target: nums[0],
        exerciseHours: nums.slice(1)
    }
}

const args: Args = parseArgs(process.argv)

console.log(calculateExercises(args.exerciseHours, args.target))

export {}