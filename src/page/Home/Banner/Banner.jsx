import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import banner1 from '../../../assets/images/banner1.jpg'
import banner2 from '../../../assets/images/banner2.jpg'
import banner3 from '../../../assets/images/banner3.jpg'


function Banner() {
    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide className="relative h-[700px]">
                    <img src={banner1} alt="banner image" className="w-full h-[700px]" />
                    <div className="absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.7)]"></div>
                    <div className=" w-[90%] lg:w-[40%] mx-auto text-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-white z-10">
                        <h1 className=" text-2xl lg:text-5xl font-bold mb-4">Join Our Exciting Summer Sports Camp</h1>
                        <p className="text-gray-300">Experience the thrill of sports and make new friends in our engaging and fun-filled summer sports camp. Choose from a variety of sports academies and learn from expert instructors.</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="relative h-[700px]">
                    <img src={banner2} alt="banner image" className="w-full h-[700px]" />
                    <div className="absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.7)]"></div>
                    <div className=" w-[90%] lg:w-[40%] mx-auto text-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-white z-10">
                        <h1 className=" text-2xl lg:text-5xl font-bold mb-4">Take Your Skills to the Next Level</h1>
                        <p className="text-gray-300">Enhance your skills in your favorite sport and receive professional coaching from experienced instructors. Our summer sports academies provide a supportive and challenging environment for athletes of all levels.</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="relative h-[700px]">
                    <img src={banner3} alt="banner image" className="w-full h-[700px]" />
                    <div className="absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.7)]"></div>
                    <div className=" w-[90%] lg:w-[40%] mx-auto text-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-white z-10">
                        <h1 className=" text-2xl lg:text-5xl font-bold mb-4">Join the Winning Team</h1>
                        <p className="text-gray-300">Get ready to compete and showcase your talent in our sports camp. Train with skilled coaches, improve your technique, and participate in friendly competitions. Join us to be a part of the winning team!</p>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Banner
