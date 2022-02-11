import { useState, useEffect } from "react"
import CheckListItem from "../../components/reminderlist/CheckListItem"
import Card from "../../components/ui/Card"
import Layout from "../../components/ui/Layout"
import NewReminder from "../../components/ui/NewReminder"
import AddOrange from '../../public/addorange.png'
import Image from "next/image"
import LeftArrow from '../../public/left-arrow.png'
import { useRouter } from "next/router"
import BackButton from "../../components/ui/BackButton"
import NewCheckListItem from "../../components/reminderlist/NewCheckListItem"
import Overlay from "../../components/ui/Overlay"
import Modal from "../../components/ui/Modal"
import { getTodoInList, updateTodo } from "../api/API"



const ReminderDetailPage = ( _props: any) => {
    const [value, setValue] = useState();
    const [removeItem, setRemoveItem] = useState(false)
    const router = useRouter();
    const pageId = useRouter().query.reminderId
    const [checklistItem, setChecklistItem] = useState([])
    const [showNewChecklist, setShowNewChecklist] = useState(false)
    const [todoInList, setTodoInList] = useState<ITodo[]>([])
    

    const handleUpdateTodo = (todo: ITodo): void => {
        updateTodo(todo)
        .then(({ status, data }) => {
            if (status !== 200) {
              throw new Error('Error! Todo not updated')
            }
            setTodoInList(data.todos)
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchTodoInList(pageId)
    }, [pageId, showNewChecklist])
   
    
    // const fetchDataHandler = async() => {
    //     const response = await fetch(`https://fir-reminder-c5fd2-default-rtdb.firebaseio.com/test/${pageId}/checklist.json`)
    //     const data = await response.json()
    //     console.log(data)

    //     const checklistData = [] as any;

    //     for (const key in data) {
    //         checklistData.push({
    //             id: key,
    //             title: data[key].title,
    //             description: data[key].description
    //         })
    //     }
    //     setChecklistItem(checklistData)
    // }

    const onRemoveChecklistHandler = () => {
        setRemoveItem(true)
    }

    const addNewChecklistHandler = () => {
        setShowNewChecklist(true)
    }

    const onSubmitHandler = () => {
        setShowNewChecklist(false)
    }
    // useEffect(() => {
    //     async function Fetchdata() {
    //     const response = await fetch(
    //         `https://fir-reminder-c5fd2-default-rtdb.firebaseio.com/test/${pageId}/checklist.json`
    //     )
    //     const data = await response.json()
    //     console.log(data)

    //     const checklistData = [] as any;

    //     for (const key in data) {
    //         checklistData.push({
    //             id: key,
    //             title: data[key].title,
    //             description: data[key].description
    //         })
    //     }
    //     setChecklistItem(checklistData)
    //     }
    //     Fetchdata();
    // }, [pageId])
    // useEffect(
    //     fetchDataHandler()
    // ,[])
    
        //console.log(checkItem)
 

    
    
    const fetchTodoInList = (_id: any): void => {
        getTodoInList(_id)
        .then(({ data: { todos } }: ITodo[] | any) => setTodoInList(todos))
        .catch((err: Error) => console.log(err))
    }
    return (
        <Layout>
            <BackButton/>
            <Card>
                <h1 style={{color: 'rgb(255, 158, 13)', marginBottom: '2rem'}}>Reminders</h1>
                {todoInList.map((item: ITodo) => {
                    return (
                        <div key={item._id}>
                            {item.completed == false ?
                            <CheckListItem
                                id={item._id}
                                title={item.title}
                                description={item.description}
                                datePicked={item.datePicked}
                                timePicked={item.timePicked}
                                todo={item}
                                onRemoveChecklistHandler={onRemoveChecklistHandler}
                            />
                            : <div></div>}
                        </div>
                    )
                })}
                
            </Card>
            {showNewChecklist && 
                <div className='mt-8'>
                    <Card>
                        <NewCheckListItem
                            id={pageId}
                            onSubmitHandler={onSubmitHandler}
                        />
                    </Card>
                </div>
            }
            
            <div style={{height: '2rem'}}></div>
            <NewReminder
                imagepath={AddOrange}
                color='rgb(255, 158, 13)'
                onAddReminderHandler={addNewChecklistHandler}
            />
            
            
        </Layout>
    )
}

export default ReminderDetailPage