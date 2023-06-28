import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Loading from '../../../Chart/utils/Loading';
import ExportAndImportTransfer from '../../components/RetailImportAndExport/ExportAndImportTransfer';
import ExportValue from '../../components/RetailImportAndExport/ExportValue';
import ImportValue from '../../components/RetailImportAndExport/ImportValue';
import RetailSalesGrowth from '../../components/RetailImportAndExport/RetailSalesGrowth';
import RetailValue from '../../components/RetailImportAndExport/RetailValue';
import TotalImportExport from '../../components/RetailImportAndExport/TotalImportExport';

const RetailImportAndExport = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 700)
  }, [])

  useEffect(() => {

  }, [dispatch]);

  return (
    <div className="container mx-auto mt-2 md:w-[90%] lg:w-[90%] xl:w-full">
      {isLoading ? (
        <>
          <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
            <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-5'>
              <div>
                <RetailValue />
              </div>
              <div>
                <RetailSalesGrowth />
              </div>
            </div>
            <hr />
            <div>
              <div className='h-[300px]'></div>
            </div>
          </div>
          <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
            <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-5'>
              <div>
                <ExportAndImportTransfer />
              </div>
              <div>
                <TotalImportExport />
              </div>
            </div>
            <hr />
            <div>
              <div className='h-[300px]'></div>
            </div>
          </div>
          <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
            <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-5'>
              <div>
                <ExportValue />
              </div>
              <div>
                <ImportValue />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className='h-[100px] mb-[70px] translate-y-[20px]'><Loading /></div>
      )}
    </div>
  )
}

export default RetailImportAndExport