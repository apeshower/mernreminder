import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react';

const DatePickerItem = () => {
    const [startDate, setStartDate] = useState(new Date());
    const getDateData = (date: any) => {
        setStartDate(date)
    }
    return (
        <div className='text-center mt-4'>
            <DatePicker 
                selected={startDate} 
                onChange={getDateData} 
                inline
            />
        </div>
    )
}

export default DatePickerItem