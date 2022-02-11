import React from "react";
import Modal from "./Modal";
import classes from './NewListForm.module.css'
import Image from "next/image";
import Icon from '../../public/bullet-list.png'
import { useRef, useState } from "react";
import ColorButton from "./ColorButton";
import ColorPicker from "./ColorPicker";

type Props = { 
    saveList: (event: React.FormEvent, formData: IList | any) => void
    onRemoveListHandler: () => void
}
const NewListForm: React.FC<Props> = ({ saveList, onRemoveListHandler }, props:any) => {

    const [formData, setFormData] = useState<IList | {}>()
    const [colorData, setColorData] = useState('#4d7fff')
    const titleInputRef = useRef<HTMLInputElement>(null)

    const handleForm = (e: React.FormEvent<any>): void => {
        const enteredTitle = titleInputRef.current!.value;
        
        setFormData({
        ...formData,
        title: enteredTitle,
        color: colorData
        })

        console.log('Hello Guys', formData)
    }

    // const onSubmitHandler = (e: React.FormEvent) => {

    //     const enteredTitle = titleInputRef.current!.value;

    //     if (enteredTitle.trim().length === 0) {
    //         return;
    //     }
    //     setFormData({
    //         ...formData,
    //         title: enteredTitle,
    //         color: colorData
    //     })
    //     saveList(e, formData)
    // }


    // const [isActive, setIsActive] = useState(false)

    

    // const titleInputRef = useRef<HTMLInputElement>(null);

    
    const selectedColor = (childComp: any) => {
        setColorData(childComp)
        console.log(colorData)
    }

    // const onSubmitHandler = async (event: React.FormEvent) => {
    //     event.preventDefault();
    //     const enteredTitle = titleInputRef.current!.value;

    //     if (enteredTitle.trim().length === 0) {
    //         return;
    //     }

    //     const response = await fetch('https://fir-reminder-c5fd2-default-rtdb.firebaseio.com/lists.json', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             title: enteredTitle,
    //             color: colorData,
    //         }),
    //         headers: {'Content-Type' : 'application/json'}
    //     })

    //     const data = await response.json();
    //     console.log(data)
    //     // console.log(enteredTitle, enteredText)
    //     props.onRemoveListHandler(false)
        
    // }

    

    // return (
    //     <Modal>
    //         <form className={classes.form} onSubmit={onSubmitHandler} >
    //             <div className={classes.header}>
    //                 <button className={classes.btncancel} onClick={props.onRemoveListHandler}>Cancel</button>
    //                 <h2>New List</h2>
    //                 <button className={classes.btnadd} type='submit'>Add</button>
    //             </div>
    //             <div className={classes.main}>
    //                 <div className={`${classes.titleform} w-[365px]`}>
    //                     <div className={`${classes.imagebox} w-[48px] h-[48px] p-3 mx-auto mb-4 rounded-full`} style={{backgroundColor: colorData}}>
    //                         <Image 
    //                             src={Icon}
    //                             alt='button'
    //                         />
    //                     </div>
    //                     <input className={classes.inputtitle}
    //                         type='text'
    //                         placeholder='Title'
    //                         ref={titleInputRef}
    //                     />
    //                 </div> 
    //                 <ColorPicker
    //                     selectedColor={selectedColor}
    //                 />
    //             </div>
    //         </form>
    //     </Modal>

    //onSubmit={(e) => saveList(e, formData)}
    //onSubmit={onSubmitHandler}
    // )

    return (
        <Modal>
            <form className={`${classes.form} Form`} onSubmit={(e) => saveList(e, formData)}>
                <div className={classes.header}>
                    <button className={classes.btncancel} onClick={onRemoveListHandler}>Cancel</button>
                    <h2>New List</h2>
                    {/* <button className={classes.btnadd}>Add</button> */}
                    <button className={classes.btnadd} type="submit">Add Todo</button>
                </div>
                <div className={classes.main}>
                    <div className={`${classes.titleform} w-[365px]`}>
                        <div className={`${classes.imagebox} w-[48px] h-[48px] p-3 mx-auto mb-4 rounded-full`} style={{backgroundColor: colorData}}>
                            <Image 
                                src={Icon}
                                alt='button'
                            />
                        </div>
                        <input className={classes.inputtitle}
                            onChange={handleForm} 
                            ref={titleInputRef}
                            type='text' 
                            id='title' 
                        />
                    </div> 
                    <ColorPicker
                        selectedColor={selectedColor}
                    />
                </div>
            </form>
        </Modal>
    )
}

export default NewListForm;