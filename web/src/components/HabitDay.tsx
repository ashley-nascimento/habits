import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import clsx from 'clsx'

interface HabitDayProps {
    completed: number
    amount: number
}

export function HabitDay({
    completed,
    amount
  } : HabitDayProps){

    const completedPercentage = Math.round((completed / amount) * 100)



    return(
        <Popover.Root>
            <Popover.Trigger 
                className={clsx("w-10 h-10  border-2  rounded-lg", {
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
                    <span className='font-semibold text-zinc-400'>terça-feira</span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'>17/01</span>

                    <ProgressBar progress={completedPercentage}/>
                    <Popover.Arrow height={8} width={16} className="fill-zinc-900 " />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}