import ColorButton from "./ColorButton";
import { useState } from "react";

const ColorPicker = (props: any) => {

    const values = [
        { id: 1, color: "#ff3e29" },
        { id: 2, color: "#ff932e" },
        { id: 3, color: "#ffdb3b" },
        { id: 4, color: "#32f062" },
        { id: 5, color: "#4d7fff" },
        { id: 6, color: "#f0cf7d" }
      ];
    const [activeId, setActiveId] = useState<any>();
    const [color, setColor] = useState<any>()

    const onSelectHandler = (id: any) => {
        setActiveId(id)
        //console.log(activeId)
    }

    return (
        <div className={`rounded-[15px] p-2 bg-[#3a3a3a] flex justify-between mt-4 px-2`}>
            {values.map((val) => (
                <ColorButton
                    id={val.id}
                    key={val.id}
                    color={val.color}
                    onClick={() => {
                        setActiveId(val.id);
                        props.selectedColor(val.color);
                    }}
                    selectedColor={val.color}
                    active={activeId === val.id}
                />
            ))}
                
            {/* <ColorButton
                id='1'
                color='#ff3e29'
                onSelectHandler={onSelectHandler}
                isActive={isActive}
            />   
            <ColorButton
                id='2'
                color='#ff932e'
                onSelectHandler={onSelectHandler}
                isActive={isActive}
            />   
            <ColorButton
                id='3'
                color='#ffdb3b'
                onSelectHandler={onSelectHandler}
                isActive={isActive}
            />   
            <ColorButton
                id='4'
                color='#32f062'
                onSelectHandler={onSelectHandler}
                isActive={isActive}
            />   
            <ColorButton
                id='5'
                color='#4d7fff'
                onSelectHandler={onSelectHandler}
                isActive={isActive}
            />  
            <ColorButton
                id='6'
                color='#f0cf7d'
                onSelectHandler={onSelectHandler}
                isActive={isActive}
            /> */}
        </div>
    )
}

export default ColorPicker;