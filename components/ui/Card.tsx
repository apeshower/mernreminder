import classes from './Card.module.css';

const Card = (props: any) => {
    return (
        <div className='bg-[#242424] p-6 rounded-[25px] mx-2'>
            {props.children}
        </div>
    )
}

export default Card