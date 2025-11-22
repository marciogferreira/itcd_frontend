import Crud from '../../components/Crud';
import { ReactElement, useEffect, useState } from 'react';
import Label from '../../components/form/Label';
import Input, { InputCustom } from '../../components/form/input/InputField';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Api from '../../config/Api';
import FormDonatariosItens from './FormDonatariosItens';
import Message from '../../config/Message';
import { useNavigate } from 'react-router';
import SelectInputs from '../../components/form/form-elements/SelectInputs';
import { useOptions } from '../../hooks/useApi';


type DataProps = {
  Field: ReactElement | any;
  ErrorMessage: ReactElement | any;
  setFieldValue: any;
  values: any;
}

const FormWrapper = ({ ErrorMessage, values }: DataProps) => {
    
    const [lista, setLista] = useState([]);
    
    const { data: donatarios } = useOptions('donatarios');
    async function getLista() {
        if(values.id) {
            const response = await Api.get(`donatarios-itens?donatario_ordem_id=${values.id}`);
            setLista(response.data.data);
        }
    }

    async function handleDeleteItem(id: number) {
        await Message.confirmation("Deseja deletar este item?", async () => {
            await Api.delete(`donatarios-itens/${id}`);
            Message.success("Item Deletado com Sucesso!")
            getLista();
        });
    }

    useEffect(() => {
        getLista()
    }, []);

    return (
        <>
            <div className='text-right'>
                {values.id && 
                    <h4>Nº do lote: {values.id.toString().padStart(4, '0')}</h4>
                }
            </div>
            <div className='row'>
                
                <div className="grid md:grid-cols-3 gap-4">

                    <div className='mb-3'>
                        <SelectInputs options={donatarios} label="Selecione o Entidade" name="donatario_id" id="donatario_id" />
                        <span className="error">
                            <ErrorMessage name="donatario_id" component="span" />
                        </span>
                    </div>
                    
                    <div className="mb-3">
                        <Label>Data</Label>
                        <Input type="date" id="data" name="data" />
                        <span className="error">
                            <ErrorMessage name="data" component="span" />
                        </span>
                    </div>

                    <div className='mb-3'>
                        <Label>Quantidade de CPUs</Label>
                        <Input type="number" id="qtde_cpu" name="qtde_cpu" />
                        <span className="error">
                            <ErrorMessage name="qtde_cpu" component="span" />
                        </span>
                    </div>
                </div>

                <hr className='mt-6'/>
                <h4>Equipamentos Doados</h4>
                <hr className='mb-6'/>
                <div className='p-4 bg-gray-100 border rounded-2xl'>
                <div className="flex">
                    <FormDonatariosItens loadData={getLista} donatario_ordem_id={values.id} />
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>Seq.</TableCell>
                            <TableCell>Equipamento</TableCell>
                            <TableCell>Quantidade</TableCell>
                            <TableCell>Observação</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {lista && lista.map((item: any, index: number) => (
                            <TableRow>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.equipamento}</TableCell>
                                <TableCell>{item.quantidade}</TableCell>
                                <TableCell>{item.observacao}</TableCell>
                                <TableCell>
                                    <button type='button'   onClick={() => handleDeleteItem(item.id)}>Excluir</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </div>
            </div>           
        </>
    );
}

export default function DonatariosLotesPages() {
    const navigate = useNavigate()
    return (
        <Crud
            BtnGrid={() => (
                <>
                    <button onClick={() => navigate('/doacoes')} className='float-right flex w-full items-center justify-center gap-2 rounded-md border text-white border-green-600 bg-green-600 px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto'>
                        Entidades
                    </button>
                </>
            )}
            title="Lotes de Doações"
            endPoint="donatarios-ordens"
            searchFieldName='search'
            desc="Cadastro de Doações"
            emptyObject={{
                donatario_id: '',
                data: '',
                qtde_cpu: 0
            }}
            FormSearch={({ params, setParams }: any) => (
                <>
                    <InputCustom
                        placeholder='Filtrar por Nome da Instituição' 
                        type="text" id="nome" name="nome" 
                        onChange={e => setParams({...params, [e.target.name]: e.target.value })}  />
                    
                    <div className="flex gap-5">
                        <div className='w-[50%]'>
                            <InputCustom 
                            placeholder='Filtrar por Lote' 
                            type="text" id="numero_lote" name="numero_lote" 
                            onChange={e => setParams({...params, [e.target.name]: e.target.value })}  />
                        </div>
                       
                    </div>
                </>
            )}
            fields={[
                { name: 'id', label: 'Id', classBody: 'min-width' },
                { name: 'numero_lote', label: 'Nº Lote' },
                { name: 'instituicao', label: 'Instituição' },
                { name: 'nome_diretor', label: 'Nome do Diretor' },
                { name: 'contato_diretor', label: 'Contato' },
                { name: 'contato_diretor', label: 'Termo de Doação' },
            ]}
              fieldsHtml={({ item }: any) => (
                <>
                    <td>{item.id}</td>
                    <td>{item.id.toString().padStart(4, '0')}</td>
                    <td>{item.donatario.instituicao}</td>
                    <td>{item.donatario.nome_diretor}</td>
                    <td>{item.donatario.contato_diretor}</td>
                     <td>
                        <a target='_blank' href={`https://api.itcd.org.br/termo-doacao/${item.id}`} 
                            className='p-2 rounded-2xl text-green-900 bg-green-300'>Gerar Termo</a>
                    </td>
                </>
            )}
           
            validation={(Yup: object | any) => {
                return {
                    donatario_id: Yup.string().required('Campo obrigatório'),
                    data: Yup.string().required('Campo obrigatório')
                };
            } }
            FormWrapper={FormWrapper} 
            columns={[]} 
            enableBtnNew={false} 
            saveContinueForm={false} 
            showActionsColumn={false} 
            showDeleteColumn={false} 
            showEditColumn={false} 
            showNewButton={false} 
            showSearch={false} 
            showPagination={false} 
            showSort={false}
            showTotal={false} 
            showViewHistory={false}
            showViewAlterStatus={false}        
        />
    );
}
