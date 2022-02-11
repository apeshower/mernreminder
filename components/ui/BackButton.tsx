import Image from "next/image"
import LeftArrow from '../../public/left-arrow.png'
import { useRouter } from "next/router"

const BackButton = () => {
    const router = useRouter();
    return (
        <div className='flex ml-8 mb-4 cursor-pointer' onClick={() => router.back()}>
            <div className='w-[24px] h-[24px]'>
                <Image
                    src={LeftArrow}
                    alt='left-arrow'
                />
            </div>
            <h2 className='my-auto ml-2 text-[#3170FF]'>Lists</h2>
        </div>
 )
}

export default BackButton