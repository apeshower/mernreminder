import classes from './Spinner.module.css'

const Spinner = (props: any) => {
    return (
        <div className={classes.spinner} style={{width: `${props.size}`, height: `${props.size}`, margin: `${props.margin}`}}></div>
    )
}

export default Spinner