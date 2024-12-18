import React, { useEffect, useState } from 'react'
import DropDownMenu from './DropDownMenu'
import LinkAnalise from './LinkAnalise'
import { usePathname, useRouter } from 'next/navigation'
import birel from '@/services/birel'
type Props = {}

const Header = (props: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [atualizacao, setAtualizacao] = useState<any>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      switch (pathname) {
        case '/': return router.push("/mensal");
        case '/mensal': return router.push("/anual");
        case '/anual': return router.push("/evolucao");
        case '/evolucao': window.location.href = '/apptv';
        default: return false;
      };
    }, 15000);
    return () => clearTimeout(timeout);
  }, [pathname, router]);

  useEffect(() => {
    const getDataTv = async () => {
      await birel.post('(APPTV_ANALISE_DEPTO)',{
        departamento: 1
      })
        .then((res) => {
          setAtualizacao(res.data.bi091.bidata[0].Atualizacao);
        }).catch((err) => {
          console.log(err);
        })
    };
    getDataTv();
  }, []);
  return (
    <header className='h-12 bg-white flex items-center justify-between px-4 border-b mb-2'>
      <div className='h-12 w-28 flex gap-4 py-1'>
        <img src="/apptv/images/logo_lojas.png" alt="" />
        <img src="/apptv/images/logo_naturovos.png" alt="" />
      </div>
      <div className='flex items-center gap-8'>
        <LinkAnalise
          label="Resumo diário"
          url="/"
          active={pathname === '/' ? true : false}
        />
        <LinkAnalise
          label="Resumo Mensal"
          url="/mensal"
          active={pathname === '/mensal' ? true : false}
        />
        <LinkAnalise
          label="Resumo Anual"
          url="/anual"
          active={pathname === '/anual' ? true : false}
        />
        <LinkAnalise
          label="Evolução do Mês"
          url="/evolucao"
          active={pathname === '/evolucao' ? true : false}
        />
      </div>
      <div className='flex items-center gap-2 text-sm font-medium'>
        Última Atualização: <div className=' text-gray-500 text-base font-medium'>{atualizacao}</div>
      </div>
      <div>
        <DropDownMenu />
      </div>
    </header>
  )
}

export default Header