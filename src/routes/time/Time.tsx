import React from "react";
import {useRecoilState} from "recoil";
import {hourSelector, minuteState} from "../../atoms";

function Time(){
    const [minutes, setMinutes] = useRecoilState(minuteState);
    const [hours, setHours] = useRecoilState(hourSelector);
    const onMinutesChange = (e: React.FormEvent<HTMLInputElement>) => {
        setMinutes(+e.currentTarget.value);
    };
    const onHoursChange = (e: React.FormEvent<HTMLInputElement>) => {
        setHours(+e.currentTarget.value)
    };

    return (
        <div>
            <input type="number"
                   value={minutes || ''}
                   onChange={onMinutesChange}
                   placeholder="minutes"
            />
            <input type="number"
                   value={hours || ''}
                   onChange={onHoursChange}
                   placeholder="hours"
            />
        </div>
    )
}

export default Time;
