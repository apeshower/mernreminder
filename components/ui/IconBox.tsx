import classes from './IconBox.module.css'
import Image from 'next/image'

const IconBox = (props:any) => {
    return (
        <div className='w-[48px] h-[48px] rounded-full p-3' style={{backgroundColor: props.color}}> 
            <Image src={props.imagepath} alt='icon' />
        </div>
    )
}

export default IconBox