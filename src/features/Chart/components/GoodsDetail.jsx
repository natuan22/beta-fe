import React from "react";
import { useSelector } from "react-redux";
import Loading from "../utils/Loading";
import { useState, useEffect } from "react";
const GoodsDetail = () => {
  const dataGoods = useSelector((state) => state.chart.dataGoodsDetail);
  console.log(dataGoods);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dataGoods[0]) {
      setLoading(!loading);
      setData(dataGoods);
    }
  }, [dataGoods]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div style={{ border: "solid 1px black", overflowY:"scroll", height:"300px" }} className="p-2 shadow-lg">
        <table className="table-auto" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th className="text-left">Hàng hóa</th>
              <th>Giá </th>
              <th> % thay đổi</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) &&
              data.map((item, index) => {
                let color = ''
                if (item.Day < "0") {
                  return color = 'text-red-500'
                } else if (item.Day === '0') {
                  return color = 'text-yellow-500'
                } else {
                   color = 'text-green-500'
                }

                return (
                  <tr key={index}>
                    {/* <td className="font-semibold">{item.name}</td>
                    {item.Day < "0" ? (
                      <td className="text-red-500 font-semibold text-center">
                        {item.price}
                      </td>
                    ) : (
                      <td className="text-green-500 font-semibold text-center">
                        {item.price}
                      </td>
                    )}
                    {item.Day < "0" ? (
                      <td className="text-red-500 font-semibold text-center">
                        {item.Day}
                      </td>
                    ) : (
                      <td className="text-green-500 font-semibold text-center">
                        {item.Day}
                      </td>
                    )} */}
                    <td>{item.name}</td>
                    <td className={`${color} `}>{item.price}</td>
                    <td className={`${color} `}>{item.Day}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default GoodsDetail;
