import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataForeignMacro } from '../../thunk';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import moment from 'moment';
import Loading from '../../../Chart/utils/Loading';
import 'swiper/css';
import 'swiper/css/navigation';

const ForeignMacro = () => {
    const dispatch = useDispatch();
    const { dataForeignMacro } = useSelector((state) => state.newsCenter);
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const blogNewsRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true)
        }, 500)
    }, [])

    useEffect(() => {
        dispatch(fetchDataForeignMacro(1, 100));
    }, [dispatch]);

    useEffect(() => {
        if (dataForeignMacro) {
            setLoading(false);
            setData(dataForeignMacro)
        }
    }, [dataForeignMacro]);

    useEffect(() => {
        if (data) {
            adjustBlogNewsSize();
            window.addEventListener("resize", adjustBlogNewsSize);
        }

        return () => {
            window.removeEventListener("resize", adjustBlogNewsSize);
        };
    }, [data]);

    const adjustBlogNewsSize = () => {
        const blogNewsElement = blogNewsRef.current;
        if (blogNewsElement && blogNewsElement !== null) {
            const childCount = blogNewsElement.childElementCount;
            const firstChild = blogNewsElement.firstElementChild;
            const childWidth = firstChild ? firstChild.offsetWidth : 0;
            const newWidth = childCount * childWidth;
            blogNewsElement.style.width = `${newWidth}px`;

            const windowWidth = window.innerWidth;
            const animationDuration = newWidth / windowWidth;
            blogNewsElement.style.animationDuration = `${animationDuration * 23}s`;
        }
    };

    return (
        <div className="container mx-auto md:w-[90%] lg:w-[90%] xl:w-[90%] 2xl:w-full pt-2">
            {isLoading ? (
                <>
                    <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                        <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                            <span className='dark:text-white text-black font-semibold uppercase'>Thế giới</span>
                        </div>
                        <div className="grid grid-cols-5 gap-2 m-2">
                            <div className="lg:col-span-3 md:col-span-full sm:col-span-full xs:col-span-full xxs:col-span-full">
                                <div className='mb-2'>
                                    <Swiper
                                        slidesPerView={1}
                                        navigation={true}
                                        modules={[Autoplay, Navigation]}
                                        centeredSlides={true}
                                        autoplay={{
                                            delay: 3500,
                                            disableOnInteraction: false,
                                        }}
                                    >
                                        {Array.isArray(data) && data.slice(0, 5).map((item, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <a href={item.href} className='no-underline' target="_blank" rel="noopener noreferrer">
                                                        <div>
                                                            <img src={item.img} alt={item.title} className='bg-cover bg-center sm:h-[400px] xxs:h-[300px] w-full' />
                                                            <h3 className='dark:text-white text-black my-2'>{item.title}</h3>
                                                            <p className='dark:text-white text-black text-[0.9rem]'>{item.sub_title}</p>
                                                        </div>
                                                    </a>
                                                </SwiperSlide>
                                            )
                                        })}
                                    </Swiper>
                                </div>
                                <div className='grid md:grid-cols-2 sm:grid-cols-none'>
                                    {Array.isArray(data) && data.slice(5, 7).map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <a href={item.href} className='no-underline' target="_blank" rel="noopener noreferrer">
                                                    <div className='flex'>
                                                        <img src={item.img} alt={item.title} className='bg-cover bg-center w-[150px] h-[100px]' />
                                                        <div className='relative mx-1 w-full'>
                                                            <div className='font-semibold line-clamp-2 px-2 text-[0.8rem] dark:text-white text-black text-justify items-center justify-center mt-1.5'>
                                                                {item.title}
                                                            </div>
                                                            <div className='text-[#FFD300] text-[0.8rem] text-right absolute bottom-0 right-0'>
                                                                {moment(item.date).format('DD.MM.YYYY')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="lg:col-span-2 md:col-span-full sm:col-span-full xs:col-span-full xxs:col-span-full">
                                <div className='h-[587px] overflow-auto'>
                                    {!loading ? (Array.isArray(data) &&
                                        data.slice(7, 53).map((item, index) => (
                                            <div key={index} className='mr-2 mb-3 dark:hover:bg-gray-800 hover:bg-gray-300' >
                                                <a href={item.href} className='no-underline' target="_blank" rel="noopener noreferrer">
                                                    <div className='flex'>
                                                        <img src={item.img} alt={item.title} className='bg-cover bg-center w-[150px] h-[100px]' />
                                                        <div className='relative w-full'>
                                                            <div className='font-semibold line-clamp-2 px-2 text-[0.8rem] dark:text-white text-black text-justify items-center justify-center mt-1.5'>
                                                                {item.title}
                                                            </div>
                                                            <div className='text-[#FFD300] text-[0.8rem] text-right absolute bottom-0 right-0'>
                                                                {moment(item.date).format('DD.MM.YYYY')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        ))) : (<div className='h-[800px] flex items-center justify-center'><Loading /></div>)}
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="dark:bg-black bg-white p-2 overflow-x-hidden">
                            <div ref={blogNewsRef} className={`animate-marquee blog-news h-full flex flex-nowrap`}>
                                <div className="flex">
                                    {Array.isArray(data) && data.slice(53).map((item, index) => {
                                        return (
                                            <a key={index} className="card no-underline text-white" href={item.href} target="_blank" rel="noopener noreferrer">
                                                <div className="card-body flex w-[350px] h-[90px] m-1">
                                                    <div className="card-img">
                                                        <img src={item.img} alt={item.title} className='bg-cover bg-center w-[150px] h-[95px]' />
                                                    </div>
                                                    <div className="h-full flex flex-col justify-around ml-1">
                                                        <div className="card-text">
                                                            <p className="line-clamp-2 text-[0.75rem] font-semibold dark:text-white text-black items-center justify-center">{item.title}</p>
                                                            <p className="line-clamp-2 text-[0.7rem] dark:text-white text-black items-center justify-center mt-1.5">{item.sub_title}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className='h-[300px] flex items-center justify-center'><Loading /></div>
            )}
        </div>
    )
}

export default ForeignMacro