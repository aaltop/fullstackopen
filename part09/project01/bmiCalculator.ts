


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

console.log(calculateBmi(180, 74))