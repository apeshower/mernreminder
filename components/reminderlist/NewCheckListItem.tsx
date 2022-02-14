import React, { useRef } from "react"
import Modal from "../ui/Modal"
import classes from './NewCheckListItem.module.css'
import { useForm, SubmitHandler } from "react-hook-form"
import { addTodo } from "../../pages/api/API"

type FormValues = {
    title: string,
    description: string,
    list_id: string
  };
const NewCheckListItem = (props: any) => {

    const inputTitleRef = useRef<HTMLInputElement>(null)
    const descriptionTitleRef = useRef<HTMLInputElement>(null)
    const {register, handleSubmit} = useForm<FormValues>()
    console.log(props.id)

    const onSubmit: SubmitHandler<FormValues> = (data: any, e: any)   => {
        e.preventDefault();
        props.onSubmitHandler();
        console.log(data);
        data.list_id = props.id;
        addTodo(data);
    }

    // const onSubmitHandler = async (event : React.FormEvent) => {
    //     event.preventDefault()

    //     const enteredTitle = inputTitleRef.current!.value
    //     const enteredDescription = descriptionTitleRef.current!.value

    //     if (enteredTitle.trim().length === 0) {
    //         return;
    //     }

    //     const response = await fetch(`https://fir-reminder-c5fd2-default-rtdb.firebaseio.com/test/${props.id}/checklist.json`, {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             description: enteredDescription,
    //             title: enteredTitle,
    //             id: enteredTitle
    //         }),
    //         headers: {'Content-Type' : 'application/json'}
    //     })

    //     const data = await response.json();
    // }
    return (
        
        <div className='w-auto mx-auto'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex mb-4'>
                    <div className={`${classes.circle}`}></div>
                    <div className={`grow border-solid border-[#5e5e5e] border-b py-2 ml-8`}>
                        <input {...register("title")} className={`bg-transparent border-none w-full`} placeholder='Title'/>
                        <div className='mt-1 pt-1 border-t border-[#5e5e5e]'>
                            <input {...register("description")} className={`bg-transparent border-none w-full`} placeholder='Description'/>
                        </div>
                    </div>
                </div>
                <button className='p-2 bg-[#ff9e0d] rounded-[10px]' type='submit'>Add</button>
            </form>
        </div>
    )
}

export default NewCheckListItem