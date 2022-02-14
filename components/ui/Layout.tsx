import classes from './Layout.module.css'


const Layout = (props: any) => {
    return (
        <div className='sm:w-[100$] lg:w-[800px] m-auto relative pt-[50px] lg:pt-[300px]'>
            {props.children}
        </div>
    )
}

export default Layout