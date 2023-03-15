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
                setSpeed(7)
            else if (window.innerWidth >= '1536')
                setSpeed(5)
            else if (window.innerWidth >= '1280')
                setSpeed(5)
            else if (window.innerWidth >= '1024')
                setSpeed(3)
            else if (window.innerWidth >= '768')
                setSpeed(3)
            else if (window.innerWidth >= '640')
                setSpeed(2)
            else if (window.innerWidth >= '425')
                setSpeed(1)
            else if (window.innerWidth >= '375')
                setSpeed(1)
        }
        handleResize()

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div className="bg-black">
                <Marquee speed={speed} pauseOnHover="true" gradientColor="[0,0,0]">
                    <div className="blog-news flex h-[120px]">
                        {dataNews.data?.map((item, index) => {
                            return (
                                <Card bodyStyle={{ paddingTop: "15px", paddingBottom: '5px', paddingLeft: '5px', paddingRight: '5px' }} key={index} bordered={false} className='w-[500px] h-[90px] bg-black'>
                                    <div className="flex items-center">

                                        <a href={item.Href} target="_blank" rel="noopener noreferrer">
                                            <img src={item.Img} alt={item.Title} width={175} height={95} />
                                        </a>
                                        <div className="mx-3">
                                            <a href={item.Href} target="_blank" rel="noopener noreferrer">


                                                <span className="text-xs font-semibold text-white items-center justify-center w-12">
                                                    {item.Title}
                                                </span>
                                            </a>
                                            <br />
                                            <span className="text-xs text-white items-center justify-center w-12">
                                                <Moment format="DD/MM/YYYY - HH:mm ">{item.Date}</Moment>
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                </Marquee>
            </div>
        </>
    )
}

export default News;