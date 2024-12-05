'use client'
import BigBox from '@/components/BigBox'
import MiddleBox from '@/components/MiddleBox'
import 'animate.css';
import birel from '@/services/birel'
import React, { useEffect, useState } from 'react'

const Home = () => {

  const [dataTv, setDataTv] = useState<any>([]);

  useEffect(() => {
    const getDataTv = async () => {
      await birel.get('(APPTV_ANALISE_LOJAS)')
        .then((res) => {
          setDataTv(res.data.bi091.bidata[0]);
        }).catch((err) => {
          console.log(err);
        })
    };
    getDataTv();
  }, []);

  return (
    <>
      <div className='grid grid-cols-2 px-2 animate__animated animate__fadeIn min-h-[calc(100vh-82px)]'>
        <div className='flex flex-col gap-2 bg-[#1a9cd9] p-2 rounded-l-md h-[100%]'>
          <BigBox meta={dataTv?.MetaDia} vendas={dataTv?.VendaDia} faltavender={dataTv?.DiferencaDia} performance={dataTv?.PerformanceDia} departamento={1} tipo={`Dia ${dataTv?.Dia}`}/>
          <div className='grid grid-cols-2 gap-2 h-[41.5%]'>
            <MiddleBox meta={dataTv?.MetaMes} vendas={dataTv?.VendaMes} faltavender={dataTv?.DiferencaMes} performance={dataTv?.PerformanceMes} departamento={1} tipo={`Mês ${dataTv?.Mes}`}/>
            <MiddleBox meta={dataTv?.MetaAcumuladaAno} vendas={dataTv?.VendaAno} faltavender={dataTv?.DiferencaAno} performance={dataTv?.PerformanceAno} departamento={1} tipo={`Anual ${dataTv?.Ano}`}/>
          </div>
        </div>

        <div className='flex flex-col gap-2 bg-[#f9b233] p-2 rounded-r-md h-[100%]'>
          <BigBox meta={dataTv?.MetaDia} vendas={dataTv?.VendaDia} faltavender={dataTv?.DiferencaDia} performance={dataTv?.PerformanceDia} departamento={5} tipo={`Dia ${dataTv?.Dia}`}/>
          <div className='grid grid-cols-2 gap-2 h-[41.5%]'>
            <MiddleBox meta={dataTv?.MetaMes} vendas={dataTv?.VendaMes} faltavender={dataTv?.DiferencaMes} performance={dataTv?.PerformanceMes} departamento={5} tipo={`Mês ${dataTv?.Mes}`}/>
            <MiddleBox meta={dataTv?.MetaAcumuladaAno} vendas={dataTv?.VendaAno} faltavender={dataTv?.DiferencaAno} performance={dataTv?.PerformanceAno} departamento={5} tipo={`Anual ${dataTv?.Ano}`}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home