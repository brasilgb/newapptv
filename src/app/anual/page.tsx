'use client'
import BigBox from '@/components/BigBox';
import MiddleBox from '@/components/MiddleBox';
import birel from '@/services/birel';
import React, { useEffect, useState } from 'react'
import 'animate.css';

type Props = {}

const AnaliseAnual = (props: Props) => {
  const [dataTvLoja, setDataTvLoja] = useState<any>([]);
  const [dataTvNatur, setDataTvNatur] = useState<any>([]);

  useEffect(() => {
    const getDataTv = async () => {
      await birel.post('(APPTV_ANALISE_DEPTO)',{
        departamento: 1
      })
        .then((res) => {
          setDataTvLoja(res.data.bi091.bidata[0]);
        }).catch((err) => {
          console.log(err);
        })
    };
    getDataTv();
  }, []);

  useEffect(() => {
    const getDataTv = async () => {
      await birel.post('(APPTV_ANALISE_DEPTO)',{
        departamento: 5
      })
        .then((res) => {
          setDataTvNatur(res.data.bi091.bidata[0]);
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
          <BigBox meta={dataTvLoja?.MetaAcumuladaAno} vendas={dataTvLoja?.VendaAno} faltavender={dataTvLoja?.DiferencaAno} performance={dataTvLoja?.PerformanceAno} departamento={1} tipo={`Ano ${dataTvLoja?.Ano}`} />
          <div className='grid grid-cols-2 gap-2 h-[41.5%]'>
            <MiddleBox meta={dataTvLoja?.MetaDia} vendas={dataTvLoja?.VendaDia} faltavender={dataTvLoja?.DiferencaDia} performance={dataTvLoja?.PerformanceDia} departamento={1} tipo={`Dia ${dataTvLoja?.Dia}`} />
            <MiddleBox dualchart acumuladames={dataTvLoja?.MetaAcumuladames} meta={dataTvLoja?.MetaMes} vendas={dataTvLoja?.VendaMes} faltavender={dataTvLoja?.DiferencaMes} performance={dataTvLoja?.PerformanceMes} departamento={1} tipo={`Mês ${dataTvLoja?.Mes}`} />
          </div>
        </div>

        <div className='flex flex-col gap-2 bg-[#f9b233] p-2 rounded-r-md h-[100%]'>
          <BigBox meta={dataTvNatur?.MetaAcumuladaAno} vendas={dataTvNatur?.VendaAno} faltavender={dataTvNatur?.DiferencaAno} performance={dataTvNatur?.PerformanceAno} departamento={5} tipo={`Anual ${dataTvNatur?.Ano}`} />
          <div className='grid grid-cols-2 gap-2 h-[41.5%]'>
            <MiddleBox meta={dataTvNatur?.MetaDia} vendas={dataTvNatur?.VendaDia} faltavender={dataTvNatur?.DiferencaDia} performance={dataTvNatur?.PerformanceDia} departamento={5} tipo={`Dia ${dataTvNatur?.Dia}`} />
            <MiddleBox dualchart acumuladames={dataTvNatur?.MetaAcumuladames} meta={dataTvNatur?.MetaMes} vendas={dataTvNatur?.VendaMes} faltavender={dataTvNatur?.DiferencaMes} performance={dataTvNatur?.PerformanceMes} departamento={5} tipo={`Mês ${dataTvNatur?.Mes}`} />
          </div>
        </div>
      </div>
    </>
  )
}

export default AnaliseAnual;