import React, { useState } from 'react'
import ChartChangesPrice from '../../components/Efficiency/Chart/ChartChangesPrice'
import ChartEquityGrowth from '../../components/Efficiency/Chart/ChartEquityGrowth'
import ChartLiabilitiesGrowth from '../../components/Efficiency/Chart/ChartLiabilitiesGrowth'
import ChartLiquidityGrowth from '../../components/Efficiency/Chart/ChartLiquidityGrowth'
import TableChangesPrice from '../../components/Efficiency/Table/TableChangesPrice'
import TableEquityGrowth from '../../components/Efficiency/Table/TableEquityGrowth'
import TableLiabilitiesGrowth from '../../components/Efficiency/Table/TableLiabilitiesGrowth'
import TableLiquidityGrowth from '../../components/Efficiency/Table/TableLiquidityGrowth'
import '../../utils/checkBox.css'
const apiUrl = process.env.REACT_APP_BASE_URL;

const Efficiency = () => {
  const [exchange, setExchange] = useState("all")
  const [timeFrame, setTimeFrame] = useState("2ky")
  const [order, setOrder] = useState("quarter")
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

  const onOrderChange = e => {
    setOrder(e.target.value)
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
                  <label className="material-checkbox py-3 dark:text-white text-black">
                    <input type="checkbox" name="exchange" value="all" id="all" checked={exchange === "all"} onChange={onExchangeChange} />
                    <span className="checkmark"></span>
                    <span className='text-sm'>Toàn thị trường</span>
                  </label>
                  <label className="material-checkbox py-3 dark:text-white text-black">
                    <input type="checkbox" name="exchange" value="hose" id="hose" checked={exchange === "hose"} onChange={onExchangeChange} />
                    <span className="checkmark"></span>
                    <span className='text-sm'>HOSE</span>
                  </label>
                  <label className="material-checkbox py-3 dark:text-white text-black">
                    <input type="checkbox" name="exchange" value="hnx" id="hnx" checked={exchange === "hnx"} onChange={onExchangeChange} />
                    <span className="checkmark"></span>
                    <span className='text-sm'>HNX</span>
                  </label>
                  <label className="material-checkbox py-3 dark:text-white text-black">
                    <input type="checkbox" name="exchange" value="upcom" id="upcom" checked={exchange === "upcom"} onChange={onExchangeChange} />
                    <span className="checkmark"></span>
                    <span className='text-sm'>UPCOM</span>
                  </label>
                </div>
              </div>

              <div>
                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                  <span className='dark:text-white text-black font-semibold'>Ngành nghề (LV2)</span>
                </div>
                <label className="material-checkbox py-3 dark:text-white text-black">
                  <input type="checkbox" name="industry" value="baoHiem" id="baoHiem" checked={industry.includes("baoHiem")} onChange={handleIndustryChange} />
                  <span className="checkmark"></span>
                  <span className='text-sm'>Bảo hiểm</span>
                </label>
                <label className="material-checkbox py-3 dark:text-white text-black">
                  <input type="checkbox" name="industry" value="batDongSan" id="batDongSan" checked={industry.includes("batDongSan")} onChange={handleIndustryChange} />
                  <span className="checkmark"></span>
                  <span className='text-sm'>Bất động sản</span>
                  <img className='relative w-[50px] h-[30px] top-[-11px]' src={`${apiUrl}/resources/icons/hot.png`} />
                </label>
                <label className="material-checkbox py-3 dark:text-white text-black">
                  <input type="checkbox" name="industry" value="congNghe" id="congNghe" checked={industry.includes("congNghe")} onChange={handleIndustryChange} />
                  <span className="checkmark"></span>
                  <span className='text-sm'>Công nghệ</span>
                </label>
                <label className="material-checkbox py-3 dark:text-white text-black">
                  <input type="checkbox" name="industry" value="dauKhi" id="dauKhi" checked={industry.includes("dauKhi")} onChange={handleIndustryChange} />
                  <span className="checkmark"></span>
                  <span className='text-sm'>Dầu khí</span>
                </label>
                <label className="material-checkbox py-3 dark:text-white text-black">
                  <input type="checkbox" name="industry" value="banLe" id="banLe" checked={industry.includes("banLe")} onChange={handleIndustryChange} />
                  <span className="checkmark"></span>
                  <span className='text-sm'>Dịch vụ bán lẻ</span>
                </label>
                <label className="material-checkbox py-3 dark:text-white text-black">
                  <input type="checkbox" name="industry" value="tienIch" id="tienIch" checked={industry.includes("tienIch")} onChange={handleIndustryChange} />
                  <span className="checkmark"></span>
                  <span className='text-sm'>Dịch vụ tiện ích</span>
                </label>
                <label className="material-checkbox py-3 dark:text-white text-black">
                  <input type="checkbox" name="industry" value="taiChinh" id="taiChinh" checked={industry.includes("taiChinh")} onChange={handleIndustryChange} />
                  <span className="checkmark"></span>
                  <span className='text-sm'>Dịch vụ tài chính</span>
                  <img className='relative w-[50px] h-[30px] top-[-11px]' src={`${apiUrl}/resources/icons/hot.png`} />
                </label>
                <label className="material-checkbox py-3 dark:text-white text-black">
                  <input type="checkbox" name="industry" value="doGiaDung" id="doGiaDung" checked={industry.includes("doGiaDung")} onChange={handleIndustryChange} />
                  <span className="checkmark"></span>
                  <span className='text-sm'>Đồ dùng cá nhân và đồ gia dụng</span>
                </label>
                <label className="material-checkbox py-3 dark:text-white text-black">
                  <input type="checkbox" name="industry" value="duLich" id="duLich" checked={industry.includes("duLich")} onChange={handleIndustryChange} />
                  <span className="checkmark"></span>
                  <span className='text-sm'>Du lịch & Giải trí</span>
                </label>
                <label className="material-checkbox py-3 dark:text-white text-black">
                  <input type="checkbox" name="industry" value="yTe" id="yTe" checked={industry.includes("yTe")} onChange={handleIndustryChange} />
                  <span className="checkmark"></span>
                  <span className='text-sm'>Y tế</span>
                </label>
              </div>

              <div>
                <br></br>
                <label className="material-checkbox py-3 dark:text-white text-black">
                  <input type="checkbox" name="industry" value="hangHoa" id="hangHoa" checked={industry.includes("hangHoa")} onChange={handleIndustryChange} />
                  <span className="checkmark"></span>
                  <span className='text-sm'>Hàng hóa và dịch vụ công nghiệp</span>
                </label>
                <label className="material-checkbox py-3 dark:text-white text-black">
                  <input type="checkbox" name="industry" value="hoaChat" id="hoaChat" checked={industry.includes("hoaChat")} onChange={handleIndustryChange} />
                  <span className="checkmark"></span>
                  <span className='text-sm'>Hóa chất</span>
                </label>
                <label className="material-checkbox py-3 dark:text-white text-black">
                  <input type="checkbox" name="industry" value="nganHang" id="nganHang" checked={industry.includes("nganHang")} onChange={handleIndustryChange} />
                  <span className="checkmark"></span>
                  <span className='text-sm'>Ngân hàng</span>
                  <img className='relative w-[50px] h-[30px] top-[-11px]' src={`${apiUrl}/resources/icons/hot.png`} />
                </label>
                <label className="material-checkbox py-3 dark:text-white text-black">
                  <input type="checkbox" name="industry" value="oto" id="oto" checked={industry.includes("oto")} onChange={handleIndustryChange} />
                  <span className="checkmark"></span>
                  <span className='text-sm'>Ôtô & linh kiện phụ tùng</span>
                </label>
                <label className="material-checkbox py-3 dark:text-white text-black">
                  <input type="checkbox" name="industry" value="truyenThong" id="truyenThong" checked={industry.includes("truyenThong")} onChange={handleIndustryChange} />
                  <span className="checkmark"></span>
                  <span className='text-sm'>Phương tiện truyền thông</span>
                </label>
                <label className="material-checkbox py-3 dark:text-white text-black">
                  <input type="checkbox" name="industry" value="taiNguyen" id="taiNguyen" checked={industry.includes("taiNguyen")} onChange={handleIndustryChange} />
                  <span className="checkmark"></span>
                  <span className='text-sm'>Tài nguyên</span>
                  <img className='relative w-[50px] h-[30px] top-[-11px]' src={`${apiUrl}/resources/icons/hot.png`} />
                </label>
                <label className="material-checkbox py-3 dark:text-white text-black">
                  <input type="checkbox" name="industry" value="thucPham" id="thucPham" checked={industry.includes("thucPham")} onChange={handleIndustryChange} />
                  <span className="checkmark"></span>
                  <span className='text-sm'>Thực phẩm & Đồ uống</span>
                </label>
                <label className="material-checkbox py-3 dark:text-white text-black">
                  <input type="checkbox" name="industry" value="vienThong" id="vienThong" checked={industry.includes("vienThong")} onChange={handleIndustryChange} />
                  <span className="checkmark"></span>
                  <span className='text-sm'>Viễn thông</span>
                </label>
                <label className="material-checkbox py-3 dark:text-white text-black">
                  <input type="checkbox" name="industry" value="xayDung" id="xayDung" checked={industry.includes("xayDung")} onChange={handleIndustryChange} />
                  <span className="checkmark"></span>
                  <span className='text-sm'>Xây dựng & Vật liệu</span>
                </label>
              </div>

              <div>
                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                  <span className='dark:text-white text-black font-semibold'>Khung thời gian</span>
                </div>
                <div>
                  <label className="material-checkbox py-3 dark:text-white text-black">
                    <input type="checkbox" name="timeFrame" value="2ky" id="2ky" checked={timeFrame === "2ky"} onChange={onTimeFrameChange} />
                    <span className="checkmark"></span>
                    <span className='text-sm'>2 kỳ gần nhất</span>
                  </label>
                  <label className="material-checkbox py-3 dark:text-white text-black">
                    <input type="checkbox" name="timeFrame" value="4ky" id="4ky" checked={timeFrame === "4ky"} onChange={onTimeFrameChange} />
                    <span className="checkmark"></span>
                    <span className='text-sm'>4 kỳ gần nhất</span>
                  </label>
                  <label className="material-checkbox py-3 dark:text-white text-black">
                    <input type="checkbox" name="timeFrame" value="8ky" id="8ky" checked={timeFrame === "8ky"} onChange={onTimeFrameChange} />
                    <span className="checkmark"></span>
                    <span className='text-sm'>8 kỳ gần nhất</span>
                  </label>
                  <label className="material-checkbox py-3 dark:text-white text-black">
                    <input type="checkbox" name="timeFrame" value="12ky" id="12ky" checked={timeFrame === "12ky"} onChange={onTimeFrameChange} />
                    <span className="checkmark"></span>
                    <span className='text-sm'>12 kỳ gần nhất</span>
                  </label>
                  <label className="material-checkbox py-3 dark:text-white text-black">
                    <input type="checkbox" name="timeFrame" value="20ky" id="20ky" checked={timeFrame === "20ky"} onChange={onTimeFrameChange} />
                    <span className="checkmark"></span>
                    <span className='text-sm'>20 kỳ gần nhất</span>
                  </label>
                </div>

                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                  <span className='dark:text-white text-black font-semibold'>Quy chuẩn dữ liệu tài chính</span>
                </div>
                <div>
                  <label className="material-checkbox py-3 dark:text-white text-black">
                    <input type="checkbox" name="order" value="quarter" id="quarter" checked={order === "quarter"} onChange={onOrderChange} />
                    <span className="checkmark"></span>
                    Tài chính theo quý
                  </label>
                  <label className="material-checkbox py-3 dark:text-white text-black">
                    <input type="checkbox" name="order" value="year" id="year" checked={order === "year"} onChange={onOrderChange} />
                    <span className="checkmark"></span>
                    Tài chính theo năm
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-[35%]'>
          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold'>Các chỉ số đánh giá hiệu suất là gì?</span>
            </div>
            <div className='ml-5'>
              <ul className='text-justify dark:text-white text-black mt-2'>
                <li>Chỉ báo ROC (The Rate of Change) hay còn gọi là tỷ lệ thay đổi, là công cụ dựa vào giá nhằm đo lường tốc độ biến thiên giá cả trong hai thời điểm khác nhau. Chỉ báo này đồng thời được tính toán thông qua việc so sánh sự biến đổi giá tại giai đoạn đó.</li>
                <li className='mt-[2px]'>EBITDA được viết tắt theo cụm từ Earning Before Interest, Taxes, Depreciation and Amortization, có nghĩa là lợi nhuận trước thuế, khấu hao và lãi vay. Đây là thuật ngữ dùng để lợi nhuận trước thuế của một doanh nghiệp, tổ chức nào đó. Phần lợi nhuận này vẫn bao gồm thuế, các khoản vay và chưa trừ khấu hao.</li>
                <li className='mt-px'>Tính thanh khoản, một khái niệm trong tài chính, chỉ mức độ mà một tài sản bất kì có thể được mua hoặc bán trên thị trường mà không làm ảnh hưởng nhiều đến giá thị trường của tài sản đó. Một tài sản có tính thanh khoản cao nếu nó có thể được bán nhanh chóng mà giá bán không giảm đáng kể , thường được đặc trưng bởi số lượng giao dịch lớn.</li>
                <li className='mt-[2px]'>EPS hay còn được gọi là Earning Per Share, chỉ số tài chính này là tỷ suất thu nhập dựa trên cổ phần. Như vậy chỉ số EPS sẽ cho thấy phần lợi nhuận thu được dựa vào một cổ phiếu. Trên mỗi khoản đầu tư từ ban đầu, EPS chính là phần lợi nhuận thu được vì vậy mà nó còn được xem là chỉ số giúp xác định khả năng của một công ty hoặc dự án đầu tư sinh lợi. EPS cũng chính là lợi nhuận mà công ty phân bổ dành cho một cổ phiếu bình thường và đang được lưu hành tại thị trường.</li>
                <li className='mt-px'>Cổ tức là khoản lợi nhuận ròng được trả cho mỗi cổ phần bằng tiền mặt hoặc bằng tài sản khác từ nguồn lợi nhuận còn lại của công ty cổ phần sau khi đã thực hiện nghĩa vụ tài chính. </li>
              </ul>
            </div>
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
              <ChartChangesPrice exchange={exchange} industryQuery={industryQuery} />
            </div>
            <hr />
            <TableChangesPrice exchange={exchange} industryQuery={industryQuery} />
          </div>
          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold'>Tăng trưởng thanh khoản của các ngành (%)</span>
            </div>
            <div className='h-[300px]'>
              <ChartLiquidityGrowth exchange={exchange} industryQuery={industryQuery} order={order} timeFrame={timeFrame} />
            </div>
            <hr />
            <TableLiquidityGrowth exchange={exchange} industryQuery={industryQuery} />
          </div>
          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold'>Tăng trưởng vốn chủ sở hữu của các ngành (%)</span>
            </div>
            <div className='h-[300px]'>
              <ChartEquityGrowth exchange={exchange} industryQuery={industryQuery} />
            </div>
            <hr />
            <TableEquityGrowth exchange={exchange} industryQuery={industryQuery} />
          </div>
          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold'>Tăng trưởng nợ phải trả của các ngành (%)</span>
            </div>
            <div className='h-[300px]'>
              <ChartLiabilitiesGrowth exchange={exchange} industryQuery={industryQuery} />
            </div>
            <hr />
            <div>
              <TableLiabilitiesGrowth exchange={exchange} industryQuery={industryQuery} />
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