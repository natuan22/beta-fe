import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../Chart/utils/Loading';
import { fetchDataDomesticMacro } from '../../thunk';
import '../../utils/closeButton.css'

const MarcoNews = () => {
    const dispatch = useDispatch();
    const { dataDomesticMacro } = useSelector((state) => state.newsCenter);
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentLimit, setCurrentLimit] = useState(10);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentLimit > 1) {
            dispatch(fetchDataDomesticMacro(1, currentLimit));
        }
    }, [dispatch, currentLimit]);

    useEffect(() => {
        if (dataDomesticMacro) {
            setLoading(false);
            setData(dataDomesticMacro);
        }
    }, [dataDomesticMacro]);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleCloseIframe = () => {
        setSelectedItem(null);
    };

    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.target;
        if (scrollTop + clientHeight >= scrollHeight * 1 && dataDomesticMacro.length > 0) {
            setCurrentLimit((prevLimit) => prevLimit + 10);
        }
    };

    return (
        <div className='grid xl:grid-cols-2 lg:grid-cols-none'>
            <div className='h-[800px] overflow-auto' onScroll={handleScroll}>
                {!loading ? (Array.isArray(data) &&
                    data.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleItemClick(item)}
                            className='mx-1 my-4 cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-300'
                        >
                            <a className='md:hidden sm:block no-underline' href={item.href} target="_blank" rel="noopener noreferrer">
                                <h4 className='dark:text-white text-black mb-1'>{item.title}</h4>
                                <div className='flex'>
                                    <img src={item.img} alt={item.title} width={150} height={100} />
                                    <div className='relative'>
                                        <div className='line-clamp-2 px-2 text-[0.8rem] dark:text-white text-black text-justify items-center justify-center mt-1.5'>
                                            {item.sub_title}
                                        </div>
                                        <div className='text-[#FFD300] text-[0.8rem] text-right absolute bottom-0 right-0'>
                                            {moment(item.date).format('DD.MM.YYYY')}
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <div className='md:block sm:hidden xs:hidden xxs:hidden'>
                                <h4 className='dark:text-white text-black mb-1'>{item.title}</h4>
                                <div className='flex'>
                                    <img src={item.img} alt={item.title} width={150} height={100} />
                                    <div className='relative'>
                                        <div className='line-clamp-2 px-2 text-[0.8rem] dark:text-white text-black text-justify items-center justify-center mt-1.5'>
                                            {item.sub_title}
                                        </div>
                                        <div className='text-[#FFD300] text-[0.8rem] text-right absolute bottom-0 right-0'>
                                            {moment(item.date).format('DD.MM.YYYY')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))) : (<div className='h-[800px] flex items-center justify-center'><Loading /></div>)}
            </div>

            <div className='md:block sm:hidden xs:hidden xxs:hidden'>
                {selectedItem ? (
                    <div className='relative'>
                        <div class="close cursor-pointer md:block sm:hidden xs:hidden xxs:hidden" onClick={handleCloseIframe} />
                        <iframe
                            src={selectedItem.href}
                            title={selectedItem.title}
                            className='2xl:w-[704px] xl:w-[632px] lg:w-[890px] md:w-[660px] sm:w-[393px] xs:w-[343px] xxs:w-[290px] h-[796px]'
                        />
                    </div>
                ) : (
                    <div className='h-[800px] flex items-center justify-center dark:text-white text-black uppercase font-bold'>Chọn tin để đọc</div>
                )}
            </div>
        </div>
    );
};

export default MarcoNews;
