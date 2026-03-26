'use client'
import BigBox from '@/components/BigBox'
import MiddleBox from '@/components/MiddleBox'
import 'animate.css'
import birel from '@/services/birel'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import Loading from './loading'

/* ===============================
   TYPES
================================ */
type DataType = any

/* ===============================
   COMPONENTE REUTILIZÁVEL
================================ */
const DepartamentoSection = ({
  data,
  departamento,
  bgColor,
  rounded
}: {
  data: DataType
  departamento: number
  bgColor: string
  rounded: string
}) => {

  if (!data) {
    return (
      <div className={`flex items-center justify-center ${bgColor} ${rounded}`}>
        <span className="text-white text-xl animate-pulse">Carregando...</span>
      </div>
    )
  }

  return (
    <div className={`flex flex-col gap-2 ${bgColor} p-2 ${rounded} h-full`}>
      <BigBox
        meta={data.MetaDia}
        vendas={data.VendaDia}
        faltavender={data.DiferencaDia}
        performance={data.PerformanceDia}
        departamento={departamento}
        tipo={`Dia ${data.Dia}`}
      />

      <div className='grid grid-cols-2 gap-2 h-[41.5%]'>
        <MiddleBox
          dualchart
          acumuladames={data.MetaAcumuladames}
          meta={data.MetaMes}
          vendas={data.VendaMes}
          faltavender={data.DiferencaMes}
          performance={data.PerformanceMes}
          departamento={departamento}
          tipo={`Mês ${data.Mes}`}
        />

        <MiddleBox
          meta={data.MetaAcumuladaAno}
          vendas={data.VendaAno}
          faltavender={data.DiferencaAno}
          performance={data.PerformanceAno}
          departamento={departamento}
          tipo={`Anual ${data.Ano}`}
        />
      </div>
    </div>
  )
}

/* ===============================
   PAGE
================================ */
const Home = () => {

  const { loading, setLoading } = useAuthContext();

  const [dataTvLoja, setDataTvLoja] = useState<DataType>(null)
  const [dataTvNatur, setDataTvNatur] = useState<DataType>(null)

  const fetchData = async (departamento: number) => {
    try {
      setLoading(true)
      const res = await birel.post('(APPTV_ANALISE_DEPTO)', {
        departamento
      })
      return res.data.bi091.bidata[0]
    } catch (error) {
      console.log(`Erro ao buscar departamento ${departamento}`, error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const loadData = async () => {
    const [loja, natur] = await Promise.all([
      fetchData(1),
      fetchData(5)
    ])

    setDataTvLoja(loja)
    setDataTvNatur(natur)
  }

  useEffect(() => {
    loadData()

    // 🔄 AUTO REFRESH (ANTI-STANDBY)
    const interval = setInterval(() => {
      loadData()
    }, 60000) // 60s (ajuste se quiser)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
  return <Loading />
}

  return (
    <div className='grid grid-cols-2 px-2 animate__animated animate__fadeIn min-h-[calc(100vh-82px)]'>

      <DepartamentoSection
        data={dataTvLoja}
        departamento={1}
        bgColor="bg-[#1a9cd9]"
        rounded="rounded-l-md"
      />

      <DepartamentoSection
        data={dataTvNatur}
        departamento={5}
        bgColor="bg-[#f9b233]"
        rounded="rounded-r-md"
      />

    </div>
  )
}

export default Home