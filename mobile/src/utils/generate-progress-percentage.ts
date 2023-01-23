export function GenerateProgressPorcentage( amount: number, completed: number){
    return Math.round((completed / amount) * 100)
}