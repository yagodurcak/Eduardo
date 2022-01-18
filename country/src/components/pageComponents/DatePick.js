import React, {useState} from 'react'
import DatePicker from "react-datepicker";

function DatePick() {


    const [startDate, setStartDate] = useState(new Date());
    return (
        <div>
                <DatePicker
            wrapperClassName="datePicker"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                />
        </div>
    )
}

export default DatePick
