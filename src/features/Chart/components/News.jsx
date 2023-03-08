import React from "react";
import { useSelector } from "react-redux";
import { Card } from "antd";
import Marquee from "react-fast-marquee";
import Moment from "react-moment";

const News = () => {
    const dataNews = useSelector((state) => state.chart.dataNews);

    return (
        <div className="bg-gray-800">
            <Marquee speed={6} pauseOnHover="true" gradientColor="[0,0,0]">
                <div className="blog-news flex" style={{ height: "150px" }}>
                    {dataNews.data?.map((item, index) => {
                        return (
                            <Card key={index} bordered={false} style={{ width: 470, height: 90, backgroundColor: "#1F2937", }}>
                                <div className="flex items-center">
                                    <a href={item.Href} target='_blank'>
                                        <img src={item.Img} alt="img blog news" width={175} height={95} />
                                    </a>
                                    <div className="ml-2">
                                        <a href={item.Href} target='_blank'>
                                            <span className="text-xs font-semibold text-white items-center justify-center w-12">
                                                {item.Title}
                                            </span>
                                        </a>
                                        <br />
                                        <span className="text-xs text-white items-center justify-center w-12">
                                            <Moment format="DD/MM/YYYY - hh:mm">{item.Date}</Moment>
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            </Marquee>
        </div>
    )
}


export default News;