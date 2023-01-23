import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import clsx from 'clsx'
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import dayjs from 'dayjs';

interface HabitDayProps {
    completed?: number
    amount?: number
    date: Date
}

export function HabitDay({
    completed = 0,
    amount = 0,
    date
  } : HabitDayProps){

    const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0

    const dayOfWeek = dayjs(date).format('dddd')
    const dayAndMonth = dayjs(date).format('DD/MM')

    return(
        <Popover.Root>
            <Popover.Trigger 
                className={clsx("w-10 h-10  border-2   rounded-lg", {
                    'bg-zinc-900 border-zinc-800' : completedPercentage === 0,
                    'bg-fuchsia-900 border-fuchsia-800' : completedPercentage > 0 && completedPercentage < 20,
                    'bg-fuchsia-800 border-fuchsia-700' : completedPercentage >= 20 && completedPercentage < 40,
                    'bg-fuchsia-700 border-fuchsia-600' : completedPercentage >= 40 && completedPercentage < 60,
                    'bg-fuchsia-600 border-fuchsia-500' : completedPercentage >= 60 && completedPercentage < 80,
                    'bg-fuchsia-500 border-fuchsia-400' : completedPercentage >= 80,
                })}
            
            />

            <Popover.Portal>
                <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
                    <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>

                    <ProgressBar progress={completedPercentage}/>

                    <div className='mt-6 flex flex-col gap-3'>
                        <Checkbox.Root className='flex items-center gap-3 group'>
                            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-emerald-500 group-data-[state=checked]:border-emerald-500'>
                                <Checkbox.Indicator>
                                    <Check size={20} className='text-white'/>
                                </Checkbox.Indicator>
                            </div>
                            <span className='font-semibold text-white text-xl leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                                Beber 2L de água
                            </span>
                        </Checkbox.Root>
                    </div>
                    <Popover.Arrow height={8} width={16} className="fill-zinc-900 " />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>



    )
}