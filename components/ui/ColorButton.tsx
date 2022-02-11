import { useState } from "react"

const ColorButton = (props: any) => {

    //const [clicked, setClicked] = useState(false)

    return (
        <div className={props.active ? `p-1 border-solid border-[3px] rounded-full border-[#636262]`: `p-1 border-solid border-[3px] rounded-full border-transparent`} onClick={props.onClick}>
            <div className={`w-[36px] h-[36px] rounded-full`} style={{backgroundColor: props.color}}>

            </div>
        </div>
    )
}

export default ColorButton