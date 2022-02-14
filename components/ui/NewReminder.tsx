import Image from "next/image"
import Add from '../../public/add.png'
import classes from './NewReminder.module.css'


const NewReminder = (props:any) => {

    // const onAddReminderHandler = () => {
    //     props.onAddReminderHandler(true)
    // }
    return (
        <div className='flex cursor-pointer mb-[3rem]' onClick={props.onAddReminderHandler}>
            <div className='w-[32px] h-[32px]' >
                <Image
                    src={props.imagepath}
                    alt='add'
                />
            </div>
            <h2 className='my-auto ml-4 font-semibold' style={{color: props.color}}>New Reminder</h2>
        </div>
    )
}

export default NewReminder