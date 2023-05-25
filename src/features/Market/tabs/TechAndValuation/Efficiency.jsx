import React, { useState } from 'react'
import ChartIndustryChangesPrice from '../../components/Efficiency/Chart/ChartIndustryChangesPrice'
import ChartIndustryEquityGrowth from '../../components/Efficiency/Chart/ChartIndustryEquityGrowth'
import ChartIndustryLiabilitiesGrowth from '../../components/Efficiency/Chart/ChartIndustryLiabilitiesGrowth'
import ChartIndustryLiquidityGrowth from '../../components/Efficiency/Chart/ChartIndustryLiquidityGrowth'
import TableIndustryChangesPrice from '../../components/Efficiency/Table/TableIndustryChangesPrice'
import TableIndustryEquityGrowth from '../../components/Efficiency/Table/TableIndustryEquityGrowth'
import TableIndustryLiabilitiesGrowth from '../../components/Efficiency/Table/TableIndustryLiabilitiesGrowth'
import TableIndustryLiquidityGrowth from '../../components/Efficiency/Table/TableIndustryLiquidityGrowth'

const Efficiency = () => {
  const [exchange, setExchange] = useState("all")
  const [timeFrame, setTimeFrame] = useState("2ky")
  const [type, setType] = useState("quarter")
  const [industry, setIndustry] = useState(['baoHiem', 'batDongSan', 'congNghe', 'dauKhi', 'banLe', 'taiChinh', 'tienIch', 'doGiaDung', 'duLich', 'yTe', 'hangHoa', 'hoaChat', 'nganHang', 'oto', 'truyenThong', 'taiNguyen', 'thucPham', 'vienThong', 'xayDung'])

  const handleIndustryChange = e => {
    const { value, checked } = e.target

    if (checked) {
      setIndustry(prev => [...prev, value])
    } else {
      setIndustry(prev => prev.filter(industry => industry !== value))
    }
  }

  const industryQuery = industry.join(',')

  const onExchangeChange = e => {
    setExchange(e.target.value)
  }

  const onTimeFrameChange = e => {
    setTimeFrame(e.target.value)
  }

  const onTypeChange = e => {
    setType(e.target.value)
  }

  return (
    <div className='container mx-auto mt-2'>
      <div className='flex'>
        <div className='w-[65%]'>
          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
            <div className='grid grid-cols-4 gap-5'>
              <div>
                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                  <span className='dark:text-white text-black font-semibold'>Sàn giao dịch</span>
                </div>
                <div>
                  <div className='py-3'>
                    <input type="checkbox" name="exchange" value="all" id="all" checked={exchange === "all"} onChange={onExchangeChange} />
                    <label className='pl-3' htmlFor="all">Toàn thị trường</label>
                  </div>
                  <div className='py-3'>
                    <input type="checkbox" name="exchange" value="hose" id="hose" checked={exchange === "hose"} onChange={onExchangeChange} />
                    <label className='pl-3' htmlFor="hose">HOSE</label>
                  </div>
                  <div className='py-3'>
                    <input type="checkbox" name="exchange" value="hnx" id="hnx" checked={exchange === "hnx"} onChange={onExchangeChange} />
                    <label className='pl-3' htmlFor="hnx">HNX</label>
                  </div>
                  <div className='py-3'>
                    <input type="checkbox" name="exchange" value="upcom" id="upcom" checked={exchange === "upcom"} onChange={onExchangeChange} />
                    <label className='pl-3' htmlFor="upcom">UPCOM</label>
                  </div>
                </div>
              </div>

              <div>
                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                  <span className='dark:text-white text-black font-semibold'>Ngành nghề (LV2)</span>
                </div>
                <div className='py-3'>
                  <input type="checkbox" name="industry" value="baoHiem" id="baoHiem" checked={industry.includes("baoHiem")} onChange={handleIndustryChange} />
                  <label className='pl-3' htmlFor="baoHiem">Bảo hiểm</label>
                </div>
                <div className='py-3'>
                  <input type="checkbox" name="industry" value="batDongSan" id="batDongSan" checked={industry.includes("batDongSan")} onChange={handleIndustryChange} />
                  <label className='pl-3' htmlFor="batDongSan">Bất động sản</label>
                </div>
                <div className='py-3'>
                  <input type="checkbox" name="industry" value="congNghe" id="congNghe" checked={industry.includes("congNghe")} onChange={handleIndustryChange} />
                  <label className='pl-3' htmlFor="congNghe">Công nghệ</label>
                </div>
                <div className='py-3'>
                  <input type="checkbox" name="industry" value="dauKhi" id="dauKhi" checked={industry.includes("dauKhi")} onChange={handleIndustryChange} />
                  <label className='pl-3' htmlFor="dauKhi">Dầu khí</label>
                </div>
                <div className='py-3'>
                  <input type="checkbox" name="industry" value="banLe" id="banLe" checked={industry.includes("banLe")} onChange={handleIndustryChange} />
                  <label className='pl-3' htmlFor="banLe">Dịch vụ bán lẻ</label>
                </div>
                <div className='py-3'>
                  <input type="checkbox" name="industry" value="tienIch" id="tienIch" checked={industry.includes("tienIch")} onChange={handleIndustryChange} />
                  <label className='pl-3' htmlFor="tienIch">Dịch vụ tiện ích</label>
                </div>
                <div className='py-3'>
                  <input type="checkbox" name="industry" value="taiChinh" id="taiChinh" checked={industry.includes("taiChinh")} onChange={handleIndustryChange} />
                  <label className='pl-3' htmlFor="taiChinh">Dịch vụ tài chính</label>
                </div>
                <div className='py-3'>
                  <input type="checkbox" name="industry" value="doGiaDung" id="doGiaDung" checked={industry.includes("doGiaDung")} onChange={handleIndustryChange} />
                  <label className='pl-3' htmlFor="doGiaDung">Đồ dùng cá nhân và đồ gia dụng</label>
                </div>
                <div className='py-3'>
                  <input type="checkbox" name="industry" value="duLich" id="duLich" checked={industry.includes("duLich")} onChange={handleIndustryChange} />
                  <label className='pl-3' htmlFor="duLich">Du lịch & Giải trí</label>
                </div>
                <div className='py-3'>
                  <input type="checkbox" name="industry" value="yTe" id="yTe" checked={industry.includes("yTe")} onChange={handleIndustryChange} />
                  <label className='pl-3' htmlFor="yTe">Y tế</label>
                </div>
              </div>

              <div>
                <br></br>
                <div className='py-3'>
                  <input type="checkbox" name="industry" value="hangHoa" id="hangHoa" checked={industry.includes("hangHoa")} onChange={handleIndustryChange} />
                  <label className='pl-3' htmlFor="hangHoa">Hàng hóa và dịch vụ công nghiệp</label>
                </div>
                <div className='py-3'>
                  <input type="checkbox" name="industry" value="hoaChat" id="hoaChat" checked={industry.includes("hoaChat")} onChange={handleIndustryChange} />
                  <label className='pl-3' htmlFor="hoaChat">Hóa chất</label>
                </div>
                <div className='py-3'>
                  <input type="checkbox" name="industry" value="nganHang" id="nganHang" checked={industry.includes("nganHang")} onChange={handleIndustryChange} />
                  <label className='pl-3' htmlFor="nganHang">Ngân hàng</label>
                </div>
                <div className='py-3'>
                  <input type="checkbox" name="industry" value="oto" id="oto" checked={industry.includes("oto")} onChange={handleIndustryChange} />
                  <label className='pl-3' htmlFor="oto">Ôtô & linh kiện phụ tùng </label>
                </div>
                <div className='py-3'>
                  <input type="checkbox" name="industry" value="truyenThong" id="truyenThong" checked={industry.includes("truyenThong")} onChange={handleIndustryChange} />
                  <label className='pl-3' htmlFor="truyenThong">Phương tiện truyền thông</label>
                </div>
                <div className='py-3'>
                  <input type="checkbox" name="industry" value="taiNguyen" id="taiNguyen" checked={industry.includes("taiNguyen")} onChange={handleIndustryChange} />
                  <label className='pl-3' htmlFor="taiNguyen">Tài nguyên</label>
                </div>
                <div className='py-3'>
                  <input type="checkbox" name="industry" value="thucPham" id="thucPham" checked={industry.includes("thucPham")} onChange={handleIndustryChange} />
                  <label className='pl-3' htmlFor="thucPham">Thực phẩm & Đồ uống</label>
                </div>
                <div className='py-3'>
                  <input type="checkbox" name="industry" value="vienThong" id="vienThong" checked={industry.includes("vienThong")} onChange={handleIndustryChange} />
                  <label className='pl-3' htmlFor="vienThong">Viễn thông</label>
                </div>
                <div className='py-3'>
                  <input type="checkbox" name="industry" value="xayDung" id="xayDung" checked={industry.includes("xayDung")} onChange={handleIndustryChange} />
                  <label className='pl-3' htmlFor="xayDung">Xây dựng & Vật liệu</label>
                </div>
              </div>

              <div>
                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                  <span className='dark:text-white text-black font-semibold'>Khung thời gian</span>
                </div>
                <div>
                  <div className='py-3'>
                    <input type="checkbox" name="timeFrame" value="2ky" id="2ky" checked={timeFrame === "2ky"} onChange={onTimeFrameChange} />
                    <label className='pl-3' htmlFor="2ky">2 kỳ gần nhất</label>
                  </div>
                  <div className='py-3'>
                    <input type="checkbox" name="timeFrame" value="4ky" id="4ky" checked={timeFrame === "4ky"} onChange={onTimeFrameChange} />
                    <label className='pl-3' htmlFor="4ky">4 kỳ gần nhất</label>
                  </div>
                  <div className='py-3'>
                    <input type="checkbox" name="timeFrame" value="8ky" id="8ky" checked={timeFrame === "8ky"} onChange={onTimeFrameChange} />
                    <label className='pl-3' htmlFor="8ky">8 kỳ gần nhất</label>
                  </div>
                  <div className='py-3'>
                    <input type="checkbox" name="timeFrame" value="12ky" id="12ky" checked={timeFrame === "12ky"} onChange={onTimeFrameChange} />
                    <label className='pl-3' htmlFor="12ky">12 kỳ gần nhất</label>
                  </div>
                  <div className='py-3'>
                    <input type="checkbox" name="timeFrame" value="25ky" id="25ky" checked={timeFrame === "25ky"} onChange={onTimeFrameChange} />
                    <label className='pl-3' htmlFor="25ky">25 kỳ gần nhất</label>
                  </div>
                </div>

                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                  <span className='dark:text-white text-black font-semibold'>Quy chuẩn dữ liệu tài chính</span>
                </div>
                <div>
                  <div className='py-3'>
                    <input type="checkbox" name="type" value="quarter" id="quarter" checked={type === "quarter"} onChange={onTypeChange} />
                    <label className='pl-3' htmlFor="quarter">Tài chính theo quý</label>
                  </div>
                  <div className='py-3'>
                    <input type="checkbox" name="type" value="year" id="year" checked={type === "year"} onChange={onTypeChange} />
                    <label className='pl-3' htmlFor="year">Tài chính theo năm</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-[35%]'>
          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
          </div>
        </div>
      </div>

      <div>
        <div className='grid grid-cols-2'>
          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold'>Thay đổi giá của các ngành (%)</span>
            </div>
            <div className='h-[300px]'>
              <ChartIndustryChangesPrice exchange={exchange} industryQuery={industryQuery} />
            </div>
            <hr />
            <TableIndustryChangesPrice exchange={exchange} industryQuery={industryQuery} />
          </div>
          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold'>Tăng trưởng thanh khoản của các ngành (%)</span>
            </div>
            <div className='h-[300px]'>
              <ChartIndustryLiquidityGrowth exchange={exchange} industryQuery={industryQuery} />
            </div>
            <hr />
            <TableIndustryLiquidityGrowth exchange={exchange} industryQuery={industryQuery} />
          </div>
          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold'>Tăng trưởng vốn chủ sở hữu của các ngành (%)</span>
            </div>
            <div className='h-[300px]'>
              <ChartIndustryEquityGrowth exchange={exchange} industryQuery={industryQuery} />
            </div>
            <hr />
            <TableIndustryEquityGrowth exchange={exchange} industryQuery={industryQuery} />
          </div>
          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold'>Tăng trưởng nợ phải trả của các ngành (%)</span>
            </div>
            <div className='h-[300px]'>
              <ChartIndustryLiabilitiesGrowth exchange={exchange} industryQuery={industryQuery} />
            </div>
            <hr />
            <div>
              <TableIndustryLiabilitiesGrowth exchange={exchange} industryQuery={industryQuery} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
        <div className='grid grid-cols-2 gap-5'>
          <div>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold'>Tăng trưởng doanh thu thuần của các ngành qua từng kỳ (%)</span>
            </div>
            <div className='h-[300px]'></div>
          </div>
          <div>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold'>Tăng trưởng lợi nhuân gộp các ngành qua từng kỳ (%)</span>
            </div>
            <div className='h-[300px]'></div>
          </div>
        </div>
      </div>
      <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
        <div className='grid grid-cols-2 gap-5'>
          <div>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold'>Tăng trưởng lợi nhuận gộp của các ngành qua từng kỳ (%)</span>
            </div>
            <div className='h-[300px]'></div>
          </div>
          <div>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold'>Tăng trưởng lợi nhuận hoạt động các ngành qua từng kỳ (%)</span>
            </div>
            <div className='h-[300px]'></div>
          </div>
        </div>
      </div>
      <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
        <div className='grid grid-cols-2 gap-5'>
          <div>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold'>Tăng trưởng cổ tức tiền mặt của các ngành qua từng kỳ (%)</span>
            </div>
            <div className='h-[300px]'></div>
          </div>
          <div>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold'>Tăng trưởng EPS các ngành qua từng kỳ (%)</span>
            </div>
            <div className='h-[300px]'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Efficiency