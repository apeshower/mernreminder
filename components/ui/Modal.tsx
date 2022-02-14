import Card from './Card'
import classes from './Modal.module.css'

// position: fixed;
// z-index: 1;
// margin: 15% auto;
// overflow: hidden;
const Modal = (props:any) => {
    return (
        <div className={`${classes.modal} w-[100%] sm:w-fit fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 mx-auto overflow-hidden`}>
            <Card>
                {props.children}
            </Card>
        </div>
    )
}

export default Modal