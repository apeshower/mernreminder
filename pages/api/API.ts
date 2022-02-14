import axios, {AxiosResponse} from "axios";

const baseUrl: string = "https://reminderdb.herokuapp.com"

export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todos: AxiosResponse<ApiDataType> = await axios.get(
            baseUrl + "/todos"
        )
        return todos
    } catch(error: any) {
        throw new Error(error)
    }
}

export const getTodoInList = async (_id: any): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const getTodoInLists: AxiosResponse = await axios.get(
            baseUrl + `/list/${_id}`
        )
        return getTodoInLists
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getAllData = async (): Promise<AxiosResponse<ApiDataType>> => {
    try {
        console.log('getting all data')
        const allData: AxiosResponse = await axios.get(
            baseUrl + `/alldata`
        )
        console.log('already got all the data',allData)

        return allData
    } catch (error: any) {
        throw new Error(error)
    }
}

export const addTodo = async (formData: ITodo): Promise<AxiosResponse<ApiDataType>> => {
    try {
        console.log('Add Executed')

        if(!formData.datePicked) {
            formData.datePicked = ' '
        } else {

        }
        if(!formData.list_id) {
            formData.list_id = '61fa12d79db2c104c85699e8'
        } else {

        }
        if(!formData.timePicked) {
            formData.timePicked = ' '
        } else {
            
        }
        const todo: Omit<ITodo, "_id"> = {
            title: formData.title,
            list_id: formData.list_id,
            description: formData.description,
            datePicked: formData.datePicked,
            timePicked: formData.timePicked,
            completed: false,
            status: false
        }
        console.log('Adding data todo', todo)
        const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
            baseUrl + "/add-todo",
            todo
        )
        console.log('added todo')
        return saveTodo
    } catch(error: any) {
        throw new Error(error)
    }
}

export const updateTodo = async (todo: ITodo): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todoUpdate: Pick<ITodo, "status"> = {
            status: true
        }
        const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
            `${baseUrl}/edit-todo/${todo._id}`,
            todoUpdate
        )
        return updatedTodo
    } catch(error: any) {
        throw new Error(error)
    }
    
}

export const completeTodo = async (todo: ITodo): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todoComplete: Pick<ITodo, "completed"> = {
            completed: true
        }
        const completedTodo: AxiosResponse<ApiDataType> = await axios.put(
            `${baseUrl}/complete-todo/${todo._id}`,
            todoComplete
        )
        return completedTodo
    } catch(error: any) {
        throw new Error(error)
    }
    
}

export const countTodo = async (_id: string): Promise<number> => {
    try {
        const counturl = `${baseUrl}/count/${_id}`
        const countTodo: AxiosResponse = await axios.get(
            `${baseUrl}/count/${_id}`
        )
        //console.log('length', countTodo.data.todos.length)
        if(countTodo.data.todos.length < 1) {
            const getCount: number = 0
            return getCount
        } else {
            const getCount: number = countTodo.data.todos[0].amount
            //console.log('get count', getCount)
            return getCount
        }
    } catch (error: any) {
        throw new Error(error)
    }
}

export const deleteTodo = async ( _id: string): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
            `${baseUrl}/delete-todo/${_id}`
        )
        return deletedTodo
    } catch (error: any){
        throw new Error(error)
    }
}

export const getLists = async (): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const lists: AxiosResponse<ApiDataType> = await axios.get(
            baseUrl + "/lists"
        )
        return lists
    } catch(error: any) {
        throw new Error(error)
    }
}

export const addList = async (formData: IList): Promise<AxiosResponse<ApiDataType>> => {
    try {
        console.log('Add Executed')
        const todo: Omit<IList, "_id"> = {
            title: formData.title,
            color: formData.color,
            status: false
        }
        console.log(todo)
        const saveList: AxiosResponse<ApiDataType> = await axios.post(
            baseUrl + "/add-list",
            todo
        )
        console.log(saveList)
        return saveList
    } catch(error: any) {
        throw new Error(error)
    }
}

export const updateList = async (list: IList): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const listUpdate: Pick<IList, "status"> = {
            status: true
        }
        const updatedList: AxiosResponse<ApiDataType> = await axios.put(
            `${baseUrl}/edit-list/${list._id}`,
            listUpdate
        )
        return updatedList
    } catch(error: any) {
        throw new Error(error)
    }
    
}

export const deleteList = async ( _id: string): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const deletedList: AxiosResponse<ApiDataType> = await axios.delete(
            `${baseUrl}/delete-list/${_id}`
        )
        return deletedList
    } catch (error: any){
        throw new Error(error)
    }
}
