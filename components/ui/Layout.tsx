import classes from './Layout.module.css'


const Layout = (props: any) => {
    return (
        <div className='w-[800px] m-auto relative pt-[300px]'>
            {props.children}
        </div>
    )
}

export default Layout