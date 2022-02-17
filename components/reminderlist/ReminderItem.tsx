import classes from './ReminderItem.module.css'
import Image from 'next/image'
import Icon from '../../public/bullet-list.png'
import Arrow from '../../public/next.png'
import IconBox from '../ui/IconBox'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { countTodo } from '../../pages/api/API'
import { checkPrime } from 'crypto'
import CheckListItem from './CheckListItem'
import Spinner from '../ui/Spinner'

const ReminderItem = (props: any) => {

    const [checklistAmount, setChecklistAmount] = useState<number>(0);

    useEffect(() => {
        fetchCount(props.id)
      }, [props.id])

    const fetchCount = async (id: string) => {
        const response: number = await countTodo(id)     
        setChecklistAmount(response)
    }

    return (
        <Link href={`/reminders/${props.id}`} passHref>
            <div className='flex mb-4 cursor-pointer'>
                <IconBox
                    color={props.color}
                    imagepath={Icon}
                />
                <div className='flex ml-6 justify-between grow'>
                    <h3 className='font-normal my-auto'>{props.title}</h3>
                    {props.isLoading ? 
                    <Spinner 
                        size='1rem'
                        margin= 'auto 0'
                    />:
                    <h3 className='font-normal my-auto'>{!props.totalTodosCount ? '0' : props.totalTodosCount}</h3>
                    }
                </div>
                <div className='my-auto ml-4 w-[18px] h-[17px]'>
                    <Image
                        src={Arrow}
                        alt='arrow'
                    />
                </div>  
            </div>
        </Link>
    )
}

export default ReminderItem;