import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Loading from '../../../Chart/utils/Loading';
import RetailSalesGrowth from '../../components/RetailImportAndExport/RetailSalesGrowth';
import RetailValue from '../../components/RetailImportAndExport/RetailValue';
import TotalRetail from '../../components/RetailImportAndExport/TotalRetail';
import ExportValue from '../../components/RetailImportAndExport/ExportValue';
import ImportValue from '../../components/RetailImportAndExport/ImportValue';
import TotalImportExport from '../../components/RetailImportAndExport/TotalImportExport';
import ExportAndImportTransfer from '../../components/RetailImportAndExport/ExportAndImportTransfer';
import { fetchDataExportValue, fetchDataImportValue, fetchDataRetailSalesGrowth, fetchDataRetailValue, fetchDataTableImportExportMarket, fetchDataTableTotalRetail, fetchDataTotalImportExport } from '../../thunk';
import ImportExportMarket from '../../components/RetailImportAndExport/ImportExportMarket';

const RetailImportAndExport = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 700)
  }, [])

  useEffect(() => {
    dispatch(fetchDataRetailValue(2))
    dispatch(fetchDataRetailSalesGrowth(1))
    dispatch(fetchDataTableTotalRetail)
    dispatch(fetchDataTotalImportExport(2))
    dispatch(fetchDataTableImportExportMarket)
    dispatch(fetchDataExportValue(2))
    dispatch(fetchDataImportValue(2))
  }, [dispatch]);

  return (
    <div className="container mx-auto mt-2 md:w-[90%] lg:w-[90%] xl:w-full">
      {isLoading ? (
        <>
          <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
            <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
              <div>
                <RetailValue />
              </div>
              <div>
                <RetailSalesGrowth />
              </div>
            </div>
            <hr />
            <div>
              <TotalRetail />
            </div>
          </div>
          <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
            <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
              <div>
                <ExportAndImportTransfer />
              </div>
              <div>
                <TotalImportExport />
              </div>
            </div>
            <hr />
            <div>
              <ImportExportMarket />
            </div>
          </div>
          <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
            <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
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
        <div className='h-[300px] flex items-center justify-center'><Loading /></div>
      )}
    </div>
  )
}

export default RetailImportAndExport