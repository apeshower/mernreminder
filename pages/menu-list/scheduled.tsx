import Layout from "../../components/ui/Layout"
import Card from '../../components/ui/Card'
import BackButton from "../../components/ui/BackButton"
import NewReminder from "../../components/ui/NewReminder"
import Add from '../../public/add.png'
import { useState, useEffect } from "react"
import { getLists, getTodos, completeTodo, addTodo } from "../api/API"
import IconBox from "../../components/ui/IconBox"
import Icon from "../../public/bullet-list.png"
import classes from './menulistId.module.css'
import moment from "moment"
import NewReminderForm from "../../components/ui/NewReminderForm"
import Overlay from "../../components/ui/Overlay"


const MenuDetailPage = () => {
    const [lists, setLists] = useState<IList[]>([])
    const [todos, setTodos] = useState<ITodo[]>([])
    const [clicked, setClicked] = useState(false)
    const [remove, setRemove] = useState('')
    const [ticked, setTicked] = useState('');
    const [showModal, setShowModal] = useState(false)

    const checkToggleHandler = (todo: ITodo) => {


        console.log(todo._id)
        setTicked(todo._id)
        completeTodo(todo)
        setClicked(!clicked)
        setTimeout(
            function() {
                setRemove(todo._id)
            }, 2000
        )
        //setRemove(true)
    }

    const TodayDate = moment(new Date()).format('MMMM Do YYYY')
    console.log(TodayDate)

    const getDateMatch = (date: any) => {
        if(date === undefined) {
            const getDate = ''
            return getDate
        
        } else {
            const getDate = moment(new Date(date)).format('MMMM Do YYYY')
        return getDate
        }
    }

    const getDateTime = (date: any, time: any) => {
        if(date === undefined) {
            const dateTime = ''
            return dateTime
        } else if (time === undefined) {
            const dateTime = ''
            return dateTime
        }
         else {

            const getDate = new Date(date)
            const formatDate = moment(getDate).format('MMMM Do YYYY')
            const getTime = new Date(time)
            const formatTime = moment(getTime).format('LT')
            const dateTime = formatDate + " " + formatTime
            return dateTime
        }
        
    }

    useEffect(() => {
        fetchLists()
        fetchTodos()
    }, [])

    const fetchLists = (): void => {
    getLists()
    .then(({ data: { lists } }: IList[] | any) => setLists(lists))
    .catch((err: Error) => console.log(err))
    }
    const fetchTodos = (): void => {
    getTodos()
    .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
    .catch((err: Error) => console.log(err))
    }

    const onRemoveReminderHandler = () => {
        setShowModal(false)
    }

    const onRemoveListHandler = () => {
        setShowModal(false)
    }

    const onAddReminderHandler = () => {
        setShowModal(true);
    }

    const handleSaveTodo = (event: React.FormEvent, formData: ITodo): void => {
        addTodo(formData)
        .then(({ status, data }) => {
         if (status !== 201) {
           alert ('Error! Todo not saved')
         }
         setTodos(data.todos)
         console.log('todos data', data.todos)
       })
       .catch((err) => console.log(err))
    }
    return (
        <div className="relative">
        
        {showModal && 
            <Overlay
                onRemoveReminderHandler={onRemoveReminderHandler}
                onRemoveListHandler={onRemoveListHandler}
                position='absolute'
        />}
        
        <Layout>
            
            {showModal && 
                    
                    <NewReminderForm
                    onRemoveReminderHandler={onRemoveReminderHandler}
                    saveTodo={handleSaveTodo}/> 
            }
            <BackButton/>
            <Card>
                {lists.map((item) => {
                    return (
                        <div key={item._id} className="mb-4">
                            <div className="flex mb-4">
                                <IconBox
                                    color={item.color}
                                    imagepath={Icon}
                                />
                                <div className="my-auto ml-2">
                                    {item.title}
                                </div>
                            </div>
                            {todos.map((todo) => {
                                return(
                                    <div key={todo._id}>
                                        {item._id === todo.list_id && remove !== todo._id && getDateMatch(todo.datePicked) !== TodayDate && todo.datePicked !== ' '  ? 
                                            <div className='flex mb-4 w-[100%] pl-2'>
                                                <div className={ticked === todo._id ? `${classes.circle} ${classes.active}` : `${classes.circle}`} onClick={() => checkToggleHandler(todo)}></div>
                                                <div className={`border-solid border-[#5e5e5e] border-b grow  pb-4 ml-8`}>
                                                    <h2 className='my-auto'>{todo.title}</h2>
                                                    <div>
                                                        <h3>{todo.description}</h3>
                                                        {todo.datePicked !== " " || todo.timePicked !== " " ? <p>{getDateTime(todo.datePicked, todo.timePicked)}</p> : <div></div>}
                                                    </div>
                                                </div>
                                            </div>
                                        : ''}
                                    </div>
                                    
                                )
                            })}
                        </div>    
                    )
                })

                }
            </Card>
            <div className='h-[1rem]' />
            <NewReminder 
                imagepath={Add}
                color='#3170FF'
                onAddReminderHandler={onAddReminderHandler}
            />
        </Layout>
        </div>
    )
}

export default MenuDetailPage