import Modal from "./Modal"
import Image from "next/image"

import classes from './NewReminderForm.module.css'
import Arrow from  '../../public/next.png'
import Overlay from "./Overlay"
import React, { useEffect, useRef, useState } from "react"
import DateIcon from '../../public/calendar.png'
import DatePickerItem from "./DatePickerItem"
import { getLists } from "../../pages/api/API"
import Switch from '@mui/material/Switch'
import IOSSwitch from "./IOSSwitch"
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { TimePicker, DatePicker } from "@mui/lab"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useForm, Controller } from "react-hook-form"
import moment from "moment"
import ReminderItem from "../reminderlist/ReminderItem"
import IconBox from "./IconBox"
import Tick from '../../public/tick.png'
import Icon from '../../public/bullet-list.png'
import BackIcon from '../../public/left-arrow.png'

import type {} from '@mui/lab/themeAugmentation';
import { addTodo } from "../../pages/api/API"

const theme = createTheme({
  components: {
    MuiFormControl: {
        styleOverrides: {
          root: {
            margin: '0 auto',
            marginTop: '1rem',
            width: '100%'
          },
        },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
    MuiInputLabel: {
        styleOverrides: {
          root: {
            color: 'white',
          },
        },
    },
    MuiOutlinedInput: {
        styleOverrides: {
            notchedOutline: {
                borderColor: 'white',
            }
        }
    }
  },
});

type Props = { 
    saveTodo: (event: React.FormEvent, formData: ITodo | any) => void
    onRemoveReminderHandler: () => void
}

const NewReminderForm: React.FC<Props> = ({ saveTodo, onRemoveReminderHandler }, props: any) =>{

    const [formData, setFormData] = useState<ITodo | {}>()

    const [date, setDate] = useState();
    const [time, setTime] = useState();

    const {register, control,getValues, setValue, handleSubmit} = useForm();
    const dateValue = getValues('datePicked');
    const timeValue= getValues('timePicked');
    const formattedDate = moment(dateValue).format("MMM Do YYYY")

    const [lists, setLists] = useState<IList[]>([])
    const [ticked, setTicked] = useState('')
  
    useEffect(() => {
      fetchLists()
    }, [])
  
    const fetchLists = (): void => {
      getLists()
      .then(({ data: { lists } }: IList[] | any) => setLists(lists))
      .catch((err: Error) => console.log(err))
    }

    useEffect(() => {
        register('datePicked')
        register('timePicked')
    }, [register])
    useEffect(() => {
        setDate(dateValue || null);
        setTime(timeValue || null);
    }, [setDate, dateValue, timeValue, setTime]);
    const onSubmit = (data: any, e: any) => {
        e.preventDefault();
        data.list_id = ticked
        onRemoveReminderHandler()
        console.log(data,'date test', JSON.stringify(moment(data.datePicked).format("MMM Do YYYY")),'time test', JSON.stringify(moment(data.timePicked).format("hh:mm")))
        // addTodo(data);
        saveTodo(e, data);
    }

    // const titleInputRef = useRef<HTMLInputElement>(null);
    // const textInputRef = useRef<HTMLTextAreaElement>(null);
    const [openDetail, setOpenDetail] = useState(false)
    const [openList, setOpenList] = useState(false)
    const [tickedName, setTickedName] = useState('Reminder')
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [openTimePicker, setOpenTimePicker] = useState(false);

    // console.log('form data outside submit', formData)
    const handleForm = (e: React.FormEvent<any>) => {
        setFormData({
        ...formData,
        [e.currentTarget.id]: e.currentTarget.value,
        })
    }

    const openDetailHandler = () => {
        setOpenDetail(true);
    }
    const openListHandler = () => {
        setOpenList(true);
    }
    const openDatePickerHandler = () => {
        setOpenDatePicker(!openDatePicker);
    }
    const openTimePickerHandler = () => {
        setOpenTimePicker(!openTimePicker);
    }

    const onSubmitHandler = async (e: any) => {
        e.preventDefault();

        console.log('date', date);


        setFormData({
            ...formData,
            datePicked: date,
            timePicked: "dummy"
        })
        console.log('form data ',formData)
       saveTodo(e, formData);
    }

    // const onSubmitHandler = async (event: React.FormEvent) => {
    //     event.preventDefault();
    //     const enteredTitle = titleInputRef.current!.value;
    //     const enteredText = textInputRef.current!.value;

    //     console.log(enteredTitle, enteredText)

    //     if (enteredTitle.trim().length === 0) {
    //         return;
    //     }

    //     const response = await fetch('https://fir-reminder-c5fd2-default-rtdb.firebaseio.com/todos.json', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             description: enteredText,
    //             title: enteredTitle,
    //             listId: 'MuP74KCPZjtXMyyuc0k',
                
    //         }),
    //         headers: {'Content-Type' : 'application/json'}
    //     })

    //     const data = await response.json();
    //     console.log(data)
    //     // console.log(enteredTitle, enteredText)
    //     props.onRemoveReminderHandler(false)
        
    // }
    return (

        <Modal>
            <ThemeProvider theme={theme}>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.header}>
                        <button className={classes.btncancel} type="button" onClick={onRemoveReminderHandler}>Cancel</button>
                        <h2>New Reminder</h2>
                        <button className={classes.btnadd} type='submit'>Add</button>
                    </div>
                    <div className='relative'>
                        <div className={openDetail || openList === true ? `${classes.main} ${classes.open}` : classes.main }>
                            <div className={classes.titleform}>
                                <input className={classes.inputtitle}
                                    type='text'
                                    placeholder='Title'
                                    id='title'
                                    {...register("title", { required: true})}
                                    
                                />
                                <textarea className={classes.inputnote}
                                    placeholder='Notes'
                                    rows={3}
                                    id='description'
                                    {...register("description", { required: true})}

                                />
                            </div>
                            <div className={classes.detailform} onClick={openDetailHandler}>
                                <h2>Details</h2>
                                <div className='w-[17px] h-[17px] my-auto'>
                                <Image
                                src={Arrow}
                                alt='next'
                                />
                                </div>
                            </div> 
                            <div className={classes.detailform} onClick={openListHandler}>
                                <h2>List</h2>
                                <h2 className='grow text-right pr-2'>{tickedName}</h2>
                                <div className='w-[17px] h-[17px] my-auto'>
                                <Image
                                src={Arrow}
                                alt='next'
                                />
                                </div>
                            </div>    
                        </div>
                        <div className={openDetail === true ? `${classes.rightcontainer} ${classes.open}`: `${classes.rightcontainer}`}>
                            <div className={`${classes.secondary}border-b border-[#828282]`}>
                                <div className="flex mb-2" onClick={() => {setOpenDetail(false)}}>
                                    <div className='w-[20px] h-[20px] mr-2'>
                                        <Image 
                                            src={BackIcon}
                                            alt="backicon"
                                        />
                                    </div>
                                    <div className='my-auto'>
                                        <h2 className="mb-0 text-[#3170FF]">Back</h2>
                                    </div>
                                </div>
                                <div className={`${classes.datepicker} rounded-t-2xl`}>
                                    <div className='flex '>
                                        <div className={`bg-[#ff0000] rounded-[5px] w-[32px] h-[32px] p-[0.375rem] mr-4`}>
                                            <Image 
                                                src={DateIcon}
                                                alt='dateicon'
                                            />
                                        </div>
                                        <div className="my-auto">
                                            <h3 >Date</h3>
                                            <p></p>
                                        </div>
                                        <div className='my-auto grow text-right'>
                                            <IOSSwitch
                                                onClick={openDatePickerHandler}
                                            />
                                        </div>
                                    </div>
                                    {openDatePicker &&
                                        
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <Controller 
                                                        name="pickDate"
                                                        control={control}
                                                        render={({field}) => (
                                                            <DatePicker
                                                            {...field}
                                                            label="Pick a Date"
                                                            value={date}
                                                            onChange={
                                                                (date: any) => {
                                                                setDate(date);
                                                                setValue('datePicked', date, {shouldValidate: true, shouldDirty: true})
                                                            }
                                                            }
                                                            renderInput={(params) => 
                                                                <TextField 
                                                                    {...params} 
                                                                    sx={{
                                                                        svg: { color: 'white'},
                                                                        input: {color: 'white'}
                                                                    }}
                                                                />}
                                                            />
                                                        )}
                                                    />
                                                </LocalizationProvider>
                                                        
                                    }
                                    
                                </div>
                            </div>
                            <div className={`${classes.secondary} mb-4`}>
                                <div className={`${classes.datepicker} rounded-b-[15px] mb-4`}>
                                    <div className='flex '>
                                        <div className={`bg-[#4D7FFF] rounded-[5px] w-[32px] h-[32px] p-[0.375rem] mr-4`}>
                                            <Image 
                                                src={DateIcon}
                                                alt='dateicon'
                                            />
                                        </div>
                                        <div className="my-auto">
                                            <h3 >Time</h3>
                                        </div>
                                        <div className='my-auto grow text-right'>
                                            <IOSSwitch
                                                onClick={openTimePickerHandler}
                                            />
                                        </div>
                                    </div>
                                    {openTimePicker &&
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <Controller 
                                                name="pickTime"
                                                control={control}
                                                render={({field}) => (
                                                    <TimePicker
                                                         {...field}
                                                        label="Pick a Time"
                                                        value={time}
                                                        onChange={(time: any) => {
                                                            setTime(time)
                                                            setValue('timePicked', time, {shouldValidate: true, shouldDirty: true})
                                                        ;
                                                        }}
                                                        renderInput={(params) => 
                                                            <TextField  
                                                                {...params} 
                                                                sx={{
                                                                    svg: { color: 'white'},
                                                                    input: {color: 'white'}
                                                                }}
                                                            />}
                                                    />
                                                )}    
                                            />
                                        </LocalizationProvider>
                                    }
                                </div>
                            </div>
                            <div className={`${classes.secondary} `}>
                                <div className={`${classes.datepicker} flex  rounded-[15px]`}>
                                    <div className={`bg-[#4D7FFF] rounded-[5px] w-[32px] h-[32px] p-[0.375rem] mr-4`}>
                                        <Image 
                                            src={DateIcon}
                                            alt='dateicon'
                                        />
                                    </div>
                                    <div className="my-auto">
                                        <h3 >Location</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={openList === true ? `${classes.listcontainer} ${classes.open}`: `${classes.listcontainer}`}>
                            <div className={classes.secondary}>
                            <div className="flex mb-2" onClick={() => {setOpenList(false)}}>
                                    <div className='w-[20px] h-[20px] mr-2'>
                                        <Image 
                                            src={BackIcon}
                                            alt="backicon"
                                        />
                                    </div>
                                    <div className='my-auto'>
                                        <h2 className="mb-0 text-[#3170FF]">Back</h2>
                                    </div>
                                </div>
                                <div className={`px-4 py-2 rounded-t-2xl overflow-y-auto max-h-[400px]`}>
                                    {lists.map(item => {
                                        return (
                                            <div className='flex border-b mb-2 pb-2 border-[#828282]' 
                                                key={item._id} 
                                                onClick={() => {
                                                setTicked(item._id);
                                                setTimeout(
                                                    function() {
                                                        setOpenList(false)
                                                    }, 200
                                                )
                                                setTickedName(item.title)
                                                ;}}
                                                // active={ticked === item._id}
                                                >
                                                <div className={`${classes.listiconbox}`}>
                                                    <IconBox
                                                        color={item.color}
                                                        imagepath={Icon}
                                                    />
                                                </div>
                                                <div className='my-auto ml-4 grow'>
                                                    <h2 >{item.title}</h2>
                                                </div>
                                                {ticked === item._id && 
                                                 <div className='h-[20px] w-[20px] my-auto'>
                                                    <Image
                                                        src={Tick}
                                                        alt='tick'
                                                        // layout='fill'
                                                        // objectFit='contain'
                                                    />
                                                </div>  
                                                }  
                                               
                                            </div>
                                        )
                                    })}
                                    {openDatePicker &&
                                        
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <Controller 
                                                        name="pickDate"
                                                        control={control}
                                                        render={({field}) => (
                                                            <DatePicker
                                                            {...field}
                                                            label="Pick a Date"
                                                            value={date}
                                                            onChange={
                                                                (date) => {
                                                                setValue('datePicked', date, {shouldValidate: true, shouldDirty: true})
                                                            }
                                                            }
                                                            renderInput={(params) => 
                                                                <TextField 
                                                                    {...params} 
                                                                    sx={{
                                                                        svg: { color: 'white'},
                                                                        input: {color: 'white'}
                                                                    }}
                                                                />}
                                                            />
                                                        )}
                                                    />
                                                </LocalizationProvider>
                                                        
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </ThemeProvider>
        </Modal>
    )
}

export default NewReminderForm