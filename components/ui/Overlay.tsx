import classes from './Overlay.module.css'

// position: fixed;
//     width: 100vw;
//     height: 100vh;
//     background: rgba(0,0,0,0.5);
type Props = { 
    
    onRemoveReminderHandler: () => void
}

const Overlay = (props: any) => {

    const onRemoveReminderHandler = () => {
        props.onRemoveReminderHandler(false)
        props.onRemoveListHandler(false)

    }
    return (
        <div className={`${props.position} z-10  h-[100%] w-[100%] bg-[rgba(0,0,0,0.5)]`} onClick={onRemoveReminderHandler}>

        </div>
    )
}

export default Overlay