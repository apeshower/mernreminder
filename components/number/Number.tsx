import classes from './Number.module.css'

const Number = (props: any) => {
    return (
        <h2 className='mt-2'>{props.number}</h2>
    )
}

export default Number