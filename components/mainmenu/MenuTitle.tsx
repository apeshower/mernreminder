import classes from './MenuTitle.module.css'

const MenuTitle = (props: any) => {
    return (
        <h2 className={`${classes.title} mt-4 mb-2 text-[#a3a3a3]`}>{props.title}</h2>
    )
}

export default MenuTitle