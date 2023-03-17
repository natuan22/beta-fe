import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "antd";
import Marquee from "react-fast-marquee";
import Moment from "react-moment";

const News = () => {
    const dataNews = useSelector((state) => state.chart.dataNews);
    const [speed, setSpeed] = useState();

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= '1920')
                setSpeed(4)
            else if (window.innerWidth >= '1536')
                setSpeed(3.5)
            else if (window.innerWidth >= '1280')
                setSpeed(3)
            else if (window.innerWidth >= '1024')
                setSpeed(2.5)
            else if (window.innerWidth >= '768')
                setSpeed(2)
            else if (window.innerWidth >= '640')
                setSpeed(1.5)
            else if (window.innerWidth >= '425')
                setSpeed(1)
            else if (window.innerWidth >= '375')
                setSpeed(0.5)
        }
        handleResize()

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div className="bg-black">
                <Marquee speed={speed} pauseOnHover="true" gradientColor="[0,0,0]">
                    <div className="blog-news flex h-[130px]">
                        {dataNews.data?.map((item, index) => {
                            return (
                                <Card bodyStyle={{ paddingTop: "15px", paddingBottom: '10px', paddingLeft: '0px', paddingRight: '10px' }} key={index} bordered={false} className='w-[355px] h-[90px] bg-black'>
                                    <div className="flex items-center">
                                        <a href={item.Href} target="_blank" rel="noopener noreferrer">
                                            <img src={item.Img} alt={item.Title} width={120} height={95} />
                                        </a>
                                        <div className="ml-1">
                                            <a href={item.Href} target="_blank" rel="noopener noreferrer">
                                                <p className="line-clamp-2 text-[0.75rem] font-semibold text-white items-center justify-center">
                                                    {item.Title}
                                                </p>
                                            </a>
                                            <a href={item.Href} target="_blank" rel="noopener noreferrer">
                                                <p className="line-clamp-2 text-[0.7rem] text-white items-center justify-center">
                                                    {item.SubTitle}
                                                </p>
                                            </a>
                                            <span className="text-[0.65rem] text-white items-center justify-center">
                                                <Moment format="DD/MM/YYYY - HH:mm ">{item.Date}</Moment>
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                </Marquee>
            </div >
        </>
    )
}

export default News;