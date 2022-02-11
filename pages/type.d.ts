interface ITodo {
    _id: string
    title: string
    list_id: string
    description: string
    datePicked: string
    timePicked: string
    status: boolean
    completed: boolean
    createdAt?: string
    updatedAt?: string
}
  
interface TodoProps {
    todo: ITodo
    props: any
}
  
type ApiDataType = {
    message: string
    status: string
    todos: ITodo[]
    todo?: ITodo
    lists: IList[]
    list?: IList
    data: []
}

interface IList {
    _id: string
    title: string
    color: string
    status: boolean
    createdAt?: string
    updatedAt?: string
}

interface ListProps {
    list: IList
}