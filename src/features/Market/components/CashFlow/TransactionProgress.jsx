import React from 'react'

const TransactionProgress = () => {
    return (
        <>
            <div className="border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0">
                <span className="text-white text-[0.9rem]">Diễn biến giao dịch nhóm nhà đầu tư </span>
                <select
                    className={`bg-[#151924] text-[0.9rem] text-[#0097B2] border-0`}
                >
                    <option value="0">khối ngoại</option>
                    <option value="1">...</option>
                    <option value="2">...</option>
                    <option value="3">...</option>
                </select>
                <select
                    className={`bg-[#1B496D] p-1 text-[0.9rem] text-white border-0`}
                >
                    <option value="1">Phiên gần nhất</option>
                    <option value="2">...</option>
                    <option value="3">...</option>
                    <option value="4">...</option>
                </select>
            </div>
        </>
    )
}

export default TransactionProgress