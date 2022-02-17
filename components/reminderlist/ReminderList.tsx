import ReminderItem from "./ReminderItem";
import classes from './ReminderList.module.css'
import Image from "next/image";
import Add from '../../public/add.png'
import Card from "../ui/Card";
import NewReminder from "../ui/NewReminder";
import Link from "next/link";
import NewReminderForm from "../ui/NewReminderForm";
import { useEffect, useState } from "react";
import { set } from "@firebase/database";
import Spinner from "../ui/Spinner";

const onAddReminderHandler = (props: any) => {
   // props.onAddRemindHandler();
    props.onAddRemindHandler(onAddReminderHandler)
}
const onRemoveReminderHandler = (props: any) => {
    // props.onAddRemindHandler();
    props.onRemoveRemindHandler(onAddReminderHandler)
 }


const ReminderList = (props:any) => {
    const onAddListHandler = () => {
        props.onAddListHandler(true)
    }

    const [isLoading, setIsLoading] = useState(true);

    return (
        <div>
            <h1 className='ml-8 mt-2 mb-4'>My List</h1>
            <Card>
                {props.isLoading && 
                <Spinner
                    size='3rem'
                    margin= '0 auto'
                />
                }
                {props.alldata.map((item: any) => {
                    return (
                        <ReminderItem 
                            title={item.title}
                            key={item._id}
                            id={item._id}
                            color={item.color}
                            totalTodosCount={item.totalTodosCount}
                            isLoading={props.isLoading}
                        />
                    )
                })}
            </Card>
            <div className='flex justify-between mt-8 mx-2'>
                <NewReminder 
                    imagepath={Add}
                    color='#3170FF'
                    onAddReminderHandler={props.onAddReminderHandler}
                />
                <div>
                    <h3 className='mt-0 font-normal text-[1.25rem] text-[#3170FF]' onClick={onAddListHandler}>Add List</h3>
                </div>
            </div>
        </div>
    )
}

export default ReminderList;