import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../Chart/utils/Loading';
import { fetchDataNews } from '../../thunk';
import '../../utils/style/verticalLine.css'

const News = ({ stock }) => {
    const dispatch = useDispatch();
    const { dataNews } = useSelector(state => state.stock)
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(20);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchDataNews(stock));
    }, [dispatch, stock]);

    useEffect(() => {
        if (dataNews) {
            setLoading(false);
            setData(Array.isArray(dataNews) && dataNews.slice(0, currentPage));
        }
    }, [dataNews, currentPage]);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleCloseIframe = () => {
        setSelectedItem(null);
    };

    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.target;
        if (scrollTop + clientHeight >= scrollHeight * 1 && dataNews.length > 0) {
            setCurrentPage((prevLimit) => prevLimit + 10);
            setData([...data, ...dataNews.slice(currentPage, currentPage + 10)])
        }
    };
    return (
        <div className='grid xl:grid-cols-2 lg:grid-cols-none'>
            <div className='h-[800px] overflow-auto ' onScroll={handleScroll}>
                {!loading ? (Array.isArray(data) &&
                    data.map((item, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => handleItemClick(item)}
                                className={`mx-2 my-2 cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-300 flex flex-col justify-center h-[59px]`}
                            >
                                <h4 className='dark:text-white text-black mb-1'>{item.title}</h4>
                            </div>
                        )
                    })) : (<div className='h-[800px] flex items-center justify-center'><Loading /></div>)}
            </div>
            <div className='verticalLine'>
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
    )
}

export default News