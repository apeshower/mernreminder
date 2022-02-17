import Card from "../ui/Card";
import classes from './MainMenu.module.css';
import Image from "next/image";
import Icon from '../../public/calendar.png'
import IconBox from "../ui/IconBox";
import Number from "../number/Number";
import MenuTitle from "./MenuTitle";
import Link from "next/link";
import Spinner from "../ui/Spinner";

const MainMenu = (props: any) => {
    return (
        <Link href={`/menu-list/${props.id}`} passHref>
            <div style={{marginBottom: '1rem'}} className={`${props.boxsize === 'small' ? "sm:w-[100%] lg:w-[50%]" : "sm:w-[100%] lg:w-[100%]"}`}>
                <Card>
                    <div className='inline-flex w-full justify-between'>
                        <div>
                            <IconBox
                                color={props.color}
                                imagepath={props.imagepath}
                            />
                            <MenuTitle
                                title={props.title}
                            />
                        </div>
                        <div>
                            { props.isLoading ?
                                <Spinner 
                                    size='1rem'
                                    margin='auto 0'
                                /> :
                            <Number
                                number={props.totalAmount}
                            />
                            }

                        </div>   
                    </div>         
                </Card>
            </div>
        </Link>
    )
}

export default MainMenu
