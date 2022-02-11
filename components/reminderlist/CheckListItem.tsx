import { useEffect, useState } from 'react'
import classes from './CheckListItem.module.css'
import { useRouter } from 'next/router'
import { completeTodo} from '../../pages/api/API'
import moment from 'moment'
import {useForm} from 'react-hook-form'

// type Props = TodoProps & {
//     completeTodo: (todo: ITodo) => void
// }

const CheckListItem = ( props: any) => {
    const {register, handleSubmit} = useForm()
    const[clicked, setClicked] = useState(false)
    const [remove, setRemove] = useState(false)
    const pageId = useRouter().query.reminderId
    //const url = `https://fir-reminder-c5fd2-default-rtdb.firebaseio.com/test/${pageId}/checklist/${props.id}.json`
    console.log('checklist id', props.title)
    const dateData = new Date(props.datePicked)
    console.log('date picked ',props.datePicked)
    const newDate = moment(dateData).format('MMMM Do YYYY')
    const timeData = new Date(props.timePicked)
    const newTime = moment(timeData).format('LT')
    const setTime = newDate + ' ' + newTime
    //console.log(setTime)

    const checkToggleHandler = () => {


        completeTodo(props)
        
        setClicked(!clicked)
        setTimeout(
            function() {
                setRemove(true)
            }, 2000
        )
        //setRemove(true)
    }

    // const fetchDataHandler = (id: any) => {
    //     const response = fetch('https://fir-reminder-c5fd2-default-rtdb.firebaseio.com/test/-Mu6C9s3x41nIzNCW4Aa/checklist.json', {

    //     })
    // }

    return (
        <div>
            {!remove && 
                <div className='flex mb-4'>
                    <div className={clicked ? `${classes.circle} ${classes.active}` : `${classes.circle}`} onClick={checkToggleHandler}></div>
                    <div className={`${classes.content} border-solid border-[#5e5e5e] border-b  pb-4 ml-8`}>
                        <h2 className='my-auto'>{props.title}</h2>
                        <div>
                            <h3>{props.description}</h3>
                            {props.datePicked !== " " || props.timePicked !== " " ? <p>{setTime}</p> : <div></div>}
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}

export default CheckListItem