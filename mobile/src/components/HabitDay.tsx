
import { Dimensions, TouchableOpacity, TouchableOpacityProps } from "react-native";
import clsx from "clsx";

import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import dayjs from "dayjs";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =  (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5);

interface HabitDayProps extends TouchableOpacityProps {
    amountOfHabits?: number;
    amountCompleted?: number;
    date: Date;
}

export function HabitDay({amountOfHabits = 0, amountCompleted = 0, date, ...rest}:HabitDayProps){
    
  const amountAccomplishedPercentage = amountOfHabits > 0 ? generateProgressPercentage(amountOfHabits, amountCompleted) : 0
  const today = dayjs().startOf('day').toDate();
  const isCurrentDay = dayjs(date).isSame(today);


    return(
        <TouchableOpacity 
            className={clsx("m-1 border-2 rounded-lg", {
                'bg-zinc-900 border-zinc-800' : amountAccomplishedPercentage === 0,
                'bg-fuchsia-900 border-fuchsia-800' : amountAccomplishedPercentage > 0 && amountAccomplishedPercentage < 20,
                'bg-fuchsia-800 border-fuchsia-700' : amountAccomplishedPercentage >= 20 && amountAccomplishedPercentage < 40,
                'bg-fuchsia-700 border-fuchsia-600' : amountAccomplishedPercentage >= 40 && amountAccomplishedPercentage < 60,
                'bg-fuchsia-600 border-fuchsia-500' : amountAccomplishedPercentage >= 60 && amountAccomplishedPercentage < 80,
                'bg-fuchsia-500 border-fuchsia-400' : amountAccomplishedPercentage >= 80,
                'border-white border-4' : isCurrentDay,
            })}
            style={{ width: DAY_SIZE, height: DAY_SIZE}}
            activeOpacity={0.7}
            {...rest}
        />
    )
}