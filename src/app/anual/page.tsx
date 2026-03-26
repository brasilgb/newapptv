'use client'
import BigBox from '@/components/BigBox';
import MiddleBox from '@/components/MiddleBox';
import birel from '@/services/birel';
import React, { useEffect, useState } from 'react'
import 'animate.css';
import { useAuthContext } from '@/contexts/AuthContext';
import Loading from '../loading';

type DeptoData = {
  id: number
  color: string
  data: any;
  rounded: string;
}

const DepartmentColumn = ({ data, color, id, rounded }: DeptoData) => {

  if (!data) return null

  return (
    <div className={`flex flex-col gap-2 p-2 ${rounded} h-full`} style={{ backgroundColor: color }}>

      {/* BIG */}
      <BigBox
        meta={data?.MetaAcumuladaAno}
        vendas={data?.VendaAno}
        faltavender={data?.DiferencaAno}
        performance={data?.PerformanceAno}
        departamento={id}
        tipo={`Ano ${data?.Ano}`}
      />

      {/* MIDDLE */}
      <div className='grid grid-cols-2 gap-2 flex-1'>

        <MiddleBox
          meta={data?.MetaDia}
          vendas={data?.VendaDia}
          faltavender={data?.DiferencaDia}
          performance={data?.PerformanceDia}
          departamento={id}
          tipo={`Dia ${data?.Dia}`}
        />

        <MiddleBox
          dualchart
          acumuladames={data?.MetaAcumuladames}
          meta={data?.MetaMes}
          vendas={data?.VendaMes}
          faltavender={data?.DiferencaMes}
          performance={data?.PerformanceMes}
          departamento={id}
          tipo={`Mês ${data?.Mes}`}
        />

      </div>

    </div>
  )
}

const AnaliseAnual = () => {

  const { loading, setLoading } = useAuthContext();

  const [data, setData] = useState<any>({
    loja: null,
    natur: null
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [lojaRes, naturRes] = await Promise.all([
          birel.post('(APPTV_ANALISE_DEPTO)', { departamento: 1 }),
          birel.post('(APPTV_ANALISE_DEPTO)', { departamento: 5 }),
        ])

        setData({
          loja: lojaRes.data.bi091.bidata[0],
          natur: naturRes.data.bi091.bidata[0],
        })

      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className='grid grid-cols-2 px-2 animate__animated animate__fadeIn min-h-[calc(100vh-82px)]'>

      <DepartmentColumn
        id={1}
        data={data.loja}
        color="#1a9cd9"
        rounded="rounded-l-md"
      />

      <DepartmentColumn
        id={5}
        data={data.natur}
        color="#f9b233"
        rounded="rounded-r-md"
      />

    </div>
  )
}

export default AnaliseAnual