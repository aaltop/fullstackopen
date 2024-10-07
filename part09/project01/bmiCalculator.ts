


function calculateBmi(centimeters: number, kilograms: number): string
{
    const metersSquared: number = (centimeters/100)**2
    const bmi: number = kilograms/metersSquared
    switch (true) {
        case bmi < 18.5: {
            return "underweight"
        }
        case bmi < 25.0: {
            return "Normal range"
        }
        case bmi < 30: {
            return "overweight"
        }
        default: {
            return "obese"
        }
    }
}

interface Args {
    centimeters: number,
    kilograms: number
}

function parseArgs(args: string[]): Args {
    const centiAndKilo: string[] = args.slice(2)
    const usage: string = `
            usage: bmiCalculator <centimeters> <kilograms>

            centimeters: number
                a person's height.

            kilograms: number
                a person's weight.
        `
    
    if (!(centiAndKilo.length === 2)) {
        console.log(usage)
        throw Error("Invalid number of command line arguments!")
    }

    const centimeters: number = parseFloat(centiAndKilo[0])
    const kilograms: number = parseFloat(centiAndKilo[1])
    if (isNaN(centimeters) || isNaN(kilograms)) {
        console.log(usage)
        throw Error("arguments should be parseable to floats!")
    }
    return {
        centimeters,
        kilograms
    }
}

const args: Args = parseArgs(process.argv) 
console.log(calculateBmi(args.centimeters, args.kilograms))