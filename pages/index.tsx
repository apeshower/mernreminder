import type { NextPage } from 'next';
import Head from 'next/head'
import Image from 'next/image'
import Card from '../components/ui/Card'
import styles from '../styles/Home.module.css'
import MainMenu from '../components/mainmenu/MainMenu'
import ReminderList from '../components/reminderlist/ReminderList'
import SearchBar from '../components/searchbar/SearchBar'
import Icon from '../public/calendar.png'
import DateCal from '../public/datecalendar.png'
import Modal from '../components/ui/Modal'
import Overlay from '../components/ui/Overlay'
import NewReminderForm from '../components/ui/NewReminderForm'
import { useState, useEffect, useCallback } from 'react'
import NewListForm from '../components/ui/NewListForm'
import { getTodos, addTodo, updateTodo, deleteTodo, getLists, addList, updateList, deleteList, getAllData } from '../pages/api/API'
import Todo from '../components/TodoItem';
import moment from 'moment';


const Home: NextPage = (props: any) => {

  const [showModal, setShowModal] = useState(false);
  const [showNewList, setShowNewList] = useState(false);
  const [lists, setLists] = useState<IList[]>([]);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [allData, setAllData] = useState([]);

  const fetchAllData = async() => {
    // getAllData()
    // .then(({ data: { allData } }: {}) => setAllData(allData))
    // .catch((err: Error) => console.log(err))
    const response = await getAllData()
    const data: any = await response.data.lists
    setAllData(data)
    //console.log('All Data Response ',allData)
  }

  const momentTimeStamp = moment(new Date()).format('x')

  console.log('This is all the mother fucker data ', allData)

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

  const handleUpdateList = (list: IList): void => {
    updateList(list)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not updated")
        }
        setLists(data.lists)
      })
      .catch(err => console.log(err))
  }

  const handleSaveList = (event: React.FormEvent, formData: IList): void => {
    addList(formData)
    .then(({ status, data }) => {
     if (status !== 201) {
       alert ('Error! Todo not saved')
     }
     setLists(data.lists)
     //console.log(data.lists)
   })
   .catch((err) => console.log(err))
  }

  const handleUpdateTodo = (todo: ITodo): void => {
    updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not updated")
        }
        setTodos(data.todos)
      })
      .catch(err => console.log(err))
  }

  const TodayDate = moment(new Date()).format('MMMM Do YYYY')
    console.log(TodayDate)

    const getTodayTodoCount = (todo: any) => {
        const getData: any = todo
        const result: any = getData.filter((getData: any) => moment(new Date(getData.datePicked)).format('MMMM Do YYYY') === TodayDate)
        return result.length
    }
    const getScheduledTodoCount = (todo: any) => {
      const getData = todo
      //console.log('GetData TimeStamp',moment(getData.datePicked).format('x'))
      const result = getData.filter((getData: any) => moment(new Date(getData.datePicked)).format('x') > momentTimeStamp)
      return result.length
  }

  // const handleSaveTodo = (event: React.FormEvent, formData: ITodo): void => {
  //   addTodo(formData)
  //   .then(({ status, data }) => {
  //    if (status !== 201) {
  //      alert ('Error! Todo not saved')
  //    }
  //    setTodos(data.todos)
  //    console.log('todos data', data.todos)
  //  })
  //  .catch((err) => console.log(err))
  // }

  async function handleSaveTodo(event: React.FormEvent, formData: ITodo) {
    try {
      console.log('adding to do with form data', formData);
      await addTodo(formData);
      fetchLists();
    } catch (e) {
      console.log("Something is wrong while adding to do", e);
    }
  }

  const onAddReminderHandler = () => {
    setShowModal(true);
  }

  const onAddListHandler = () => {
    setShowNewList(true);
  }

  const onRemoveListHandler = () => {
    setShowNewList(false)
  }

  const onRemoveReminderHandler = () => {
    setShowModal(false)
  }

  const getTotalChecklistHandler = (childComp: any) => {
    getTotalChecklistHandler(childComp);
    //console.log(childComp);
  }
  useEffect(() => {
    fetchLists()
    fetchTodos()
    fetchAllData()
  }, [showModal, showNewList])
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showModal && 
      <Overlay
        onRemoveReminderHandler={onRemoveReminderHandler}
        onRemoveListHandler={onRemoveListHandler}
        position='fixed'
      />}
      {showNewList && 
      <Overlay
        onRemoveReminderHandler={onRemoveReminderHandler}
        onRemoveListHandler={onRemoveListHandler}
        position='fixed'
      />}
      <main className={styles.main}>
        <h1 className={styles.title} style={{marginBottom: '2rem'}}>
          Welcome to this Wonderful Reminder
        </h1>
        <div className={styles.grid}>
        <SearchBar
          data={todos}
        />
        </div>
        <div className={styles.grid}>
          <MainMenu 
            title='Today'
            id='today' 
            color='#0c68c7' 
            imagepath={DateCal} 
            boxwidth='50%'
            boxsize='small'
            totalAmount={getTodayTodoCount(todos)}
          />
          <MainMenu 
            title='Scheduled' 
            id='scheduled' 
            color='#ff0000' 
            imagepath={Icon} 
            boxwidth='50%'
            boxsize='small'
            totalAmount={getScheduledTodoCount(todos)}
          />
          <MainMenu 
            title='All' 
            id='all' 
            color='#6c6b6b' 
            imagepath={Icon} 
            boxwidth='100%'
            boxsize='large'
            totalAmount={todos.length}
          />
        </div>
        <div className={styles.reminder}>
          <ReminderList
            onAddReminderHandler={onAddReminderHandler}
            onAddListHandler={onAddListHandler}
            getTotalChecklistHandler={getTotalChecklistHandler}
            data={lists}
            alldata={allData}
          />
        </div>
        {showModal && 
        <NewReminderForm
          onRemoveReminderHandler={onRemoveReminderHandler}
          saveTodo={handleSaveTodo}
        /> }
        {showNewList &&
        <NewListForm
          saveList={handleSaveList}
          onRemoveListHandler={onRemoveListHandler}
        />
        }
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
