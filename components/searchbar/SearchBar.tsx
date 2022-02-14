import classes from './SearchBar.module.css';
import Image from 'next/image';
import Search from '../../public/search.png'
import { useState } from 'react';
import CheckListItem from '../reminderlist/CheckListItem';
import { updateTodo } from '../../pages/api/API';


const SearchBar = (props: any) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showSearch, setShowSearch] = useState(false)

    return (
        <div className="relative md:w-[100%] lg:w-fit">
            <div className='flex md:w-[100%] xl:w-[800px] p-4 mb-8 bg-[#242424] rounded-[25px] mx-2 sm:mx-0'>
                <div className='w-[32px] mr-4 my-auto'>
                    <Image
                        src={Search}
                        alt='search'
                    />
                </div>
                <div className='w-full'>
                    <input className='bg-transparent text-[1.75rem] w-full border-0 text-[white]' type='text' placeholder='Search' onChange={(event) => {setSearchTerm(event.target.value);setShowSearch(true)}} />
                </div>
            </div>
            {
                showSearch &&
            
            <div className="absolute top-[100%] left-[0] bg-[black] w-[100%] max-h-[500px] p-[0.5rem] z-30 overflow-y-auto">
            {props.data.filter((val: any) => {
                if(searchTerm == "") {
                    setShowSearch(false)
                    return 
                } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                } else if (val.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                }

            }).map((item: ITodo) => {
                return (
                    <div key={item._id}>
                        {item.completed == false ?
                        <CheckListItem
                            id={item._id}
                            title={item.title}
                            description={item.description}
                            datePicked={item.datePicked}
                            timePicked={item.timePicked}
                            // updateTodo={handleUpdateTodo}
                            todo={item}
                            //onRemoveChecklistHandler={onRemoveChecklistHandler}
                        />
                        : <div></div>}
                    </div>
                )
            })}
            </div>
            }
        </div>
    )
}

export default SearchBar