import { Check } from 'phosphor-react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { FormEvent, useState } from 'react'
import { api } from '../lib/axios'

const availableWeekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
]

export function NewHabitForm(){

    const [title, setTitle] = useState('')
    const [weekDays, setWeekDays] = useState<number[]>([])

    function handleToggleWeekDay(weekDayIndex : number){
        if(weekDays.includes(weekDayIndex)){
            setWeekDays(weekDays.filter(day => day != weekDayIndex))
        } else{
            setWeekDays([...weekDays, weekDayIndex])
        }
    }

    function createNewHabit(event: FormEvent){
        event.preventDefault()

        if(!title || weekDays.length === 0){
            return
        }

        api.post('habits',{
            title,
            weekDays
        }).then((response) => {
            setTitle('')
            setWeekDays([])
            alert('Hábito criado com sucesso!')
        })
    }

    return (
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">Qual seu comprometimento?</label>
            <input 
                type="text" 
                id="title"
                placeholder="Exercícios, dormir bem, etc..."
                autoFocus
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
            />

            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Qual a recorrência?
            </label>

            <div className='mt-3 flex flex-col gap-2'>
                { availableWeekDays.map((weekDay, index) => (
                    <Checkbox.Root 
                        key={weekDay} 
                        className='flex items-center gap-3 group focus:outline-none'
                        checked={weekDays.includes(index)}
                        onCheckedChange={() => handleToggleWeekDay(index)}
                    >
                        <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-emerald-500 group-data-[state=checked]:border-emerald-500 transition-colors group-focus:ring-2 group-focus:ring-fuchsia-600 group-focus:ring-offset-2 group-focus:ring-offset-background'>
                            <Checkbox.Indicator>
                                <Check size={20} className='text-white'/>
                            </Checkbox.Indicator>
                        </div>
                        <span className='text-white leading-tight'>
                            {weekDay}
                        </span>
                    </Checkbox.Root>
                ))}
            </div>

            <button
                type="submit"
                className="mt-6 rounded-lg p-4 flex items-center gap-3 font-semibold bg-emerald-600 justify-center hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
                <Check size={20} weight="bold" />
                Confirmar
            </button>
        </form>
    )
}