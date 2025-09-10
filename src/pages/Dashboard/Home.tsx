import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
// import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
// import RecentOrders from "../../components/ecommerce/RecentOrders";
// import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import Api from "../../config/Api";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { GroupIcon } from "../../icons";

export default function Home() {

  const { user } = useAuth();
  const[turmas, setTurmas] = useState([]);
  const[totais, setTotais] = useState({
    alunos: 0,
    cursos: 0,
    turmas: 0,
    matriculas: 0,
    eventos: 0,
  })

  async function getTotais() {
    const res = await Api.get('dashboard/totais');
    setTotais(res.data.data)
  }

  async function getTurmas() {
    const res = await Api.get('matriculas', {
      params: {
        aluno_cpf: user && user.email
      }
    });
    setTurmas(res.data.data)
  }

  useEffect(() => {
    getTotais()
    getTurmas()
  }, [])

  return (
    <>
      <PageMeta
        title="ITCD - "
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        
        {user && user.role == 2 && 
          <div className="col-span-12 space-y-6 xl:col-span-7">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:gap-6">
            {turmas.map((item: any, index: number) => (
                <div key={index} className="rounded-2xl border border-gray-200 bg-white p-5 hover:bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
                  </div>

                  <div className="flex items-end justify-between mt-5">
                    <div className="w-full">
                      <div className="w-full">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                        
                        Curso: <br />
                        <h4 className="text-title-sm">
                          <strong>{item.turma.curso.nome}</strong>  <br />
                        </h4>
                        Turma: <strong>{item.turma.nome} </strong><br />
                        Descrição: <br /> 
                        {item.turma.descricao} 
                      </span>
                      </div>
                      
                      <hr />
                      <div className="flex justify-between">
                        <div>
                          <h4 className="mt-2 border p-2 rounded-2xl  text-gray-800 text-sm dark:text-white/90">
                            <a href={item.turma.curso.link} target="_blank">
                              Acessar Curso
                            </a>
                          </h4>
                        </div>
                        <div>
                          <h4 className="mt-2 border p-2 rounded-2xl text-gray-800 text-sm dark:text-white/90">
                            <a href={item.turma.curso.link} target="_blank">
                              Ver Certificado
                            </a>
                          </h4>
                        </div>
                      </div>

                    </div>
                    
                  </div>
                </div>
            
            ))}
            </div>
          </div>
        }
      
        {user && user.role == 1 && 
          <>
            <div className="col-span-12 space-y-6 xl:col-span-7">
              <EcommerceMetrics totais={totais} />
              <MonthlySalesChart />
            </div>

            <div className="col-span-12 xl:col-span-5">
              <MonthlyTarget />
            </div>
          </>
        }
        {/* <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div> */}
      </div>
    </>
  );
}
