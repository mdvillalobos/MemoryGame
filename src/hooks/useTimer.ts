import { useEffect, useRef, useState } from "react"

const useTimer = (isGameStart: boolean) => {
    const [ timer, setTimer ] = useState(0);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if(!isGameStart) return; 

        intervalRef.current = window.setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);


        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };

      
    }, [isGameStart])

    const resetTimer = () => setTimer(0);

    const stopTimer = () => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };


    return { timer, resetTimer, stopTimer }
}

export default useTimer