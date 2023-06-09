
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Pagination } from "swiper";
import { useEffect, useState } from "react";

function PopularClasses() {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/classes")
            .then(res => res.json())
            .then(data => {
                const popularClass = data.sort((a, b) => b.totalEnrollment - a.totalEnrollment).slice(0, 6);
                setClasses(popularClass)
            })
    }, [])

    return (
        <div className='py-16 container'>
            <h1 className="text-center text-slate-900 text-4xl font-bold my-4">Popular Classes</h1>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper h-[300px] my-12"
            >
                {
                    classes.map(item => <SwiperSlide className="relative rounded-xl overflow-hidden">
                        <img src={item.image} className="h-full w-full" alt="" />
                        <div className="bg-[rgba(0,0,0,0.6)] h-full w-full absolute top-0 left-0 flex justify-center items-center">
                            <p className="text-white font-bold text-xl">{item?.className}</p>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    )
}

export default PopularClasses
