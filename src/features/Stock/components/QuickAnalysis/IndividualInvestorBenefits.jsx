import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataIndividualInvestorBenefits } from '../../thunk';
import { BsInfoCircleFill } from "react-icons/bs";
import { Popover } from 'antd';

const contentIndividualInvestorBenefits = (
    <div>
        <span className='text-black font-medium rounded-lg text-sm bg-white p-2 '>
            Quyền lợi NĐT cá nhân
        </span>
    </div>
);

const IndividualInvestorBenefits = ({ queryApi }) => {
    const dispatch = useDispatch()
    const { dataIndividualInvestorBenefits } = useSelector(state => state.stock)

    useEffect(() => {
        dispatch(fetchDataIndividualInvestorBenefits(queryApi.stock));
    }, [dispatch, queryApi]);

    return (
        <div>
            <div className='border-solid dark:border-white border-b-[1px] border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold w-[45%] flex justify-between'>Quyền lợi NĐT cá nhân
                    <Popover content={contentIndividualInvestorBenefits} >
                        <span className='dark:text-white text-black'><BsInfoCircleFill /></span>
                    </Popover>
                </span>
            </div>
        </div>
    )
}

export default IndividualInvestorBenefits