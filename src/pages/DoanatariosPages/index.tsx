import Crud from '../../components/Crud';
import { ReactElement, useEffect, useState } from 'react';
import Label from '../../components/form/Label';
import Input from '../../components/form/input/InputField';
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


type DataProps = {
  Field: ReactElement | any;
  ErrorMessage: ReactElement | any;
  setFieldValue: any;
  values: any;
}

const FormWrapper = ({ ErrorMessage, values }: DataProps) => {
    
    const [lista, setLista] = useState([]);
    
    async function getLista() {
        const response = await Api.get(`donatarios-itens?dotanario_id=${values.id}`);
        setLista(response.data.data);
    }

     async function handleDeleteItem(id: number) {
        await Message.confirmation("Deseja deletar este item?", async () => {
            await Api.delete(`donatarios-itens/${id}`);
            Message.success("Item Deletado com Sucesso!")
            getLista()
        });
        
    }

    

    useEffect(() => {
        getLista()
    }, []);

    return (
        <>
            <div className='row'>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="mb-3">
                        <Label>Nome do Diretor</Label>
                        <Input type="text" id="nome_diretor" name="nome_diretor" />
                        <span className="error">
                            <ErrorMessage name="nome_diretor" component="span" />
                        </span>
                    </div>

                    <div className="mb-3">
                        <Label>Contato do Diretor</Label>
                        <Input type="text" id="contato_diretor" name="contato_diretor" />
                        <span className="error">
                            <ErrorMessage name="contato_diretor" component="span" />
                        </span>
                    </div>

                    <div className="mb-3">
                        <Label>Quantidade</Label>
                        <Input type="number" id="quantidade" name="quantidade" />
                        <span className="error">
                            <ErrorMessage name="quantidade" component="span" />
                        </span>
                    </div>
                </div>

                <div className="mb-3">
                    <Label>Termo de Doação</Label>
                    <Input type="text" id="termo_doacao" name="termo_doacao" />
                    <span className="error">
                        <ErrorMessage name="termo_doacao" component="span" />
                    </span>
                </div>

                <div className="mb-3">
                    <Label>Data da Entrega</Label>
                    <Input type="date" id="data_entrega" name="data_entrega" />
                    <span className="error">
                        <ErrorMessage name="data_entrega" component="span" />
                    </span>
                </div>
                <hr className='mt-6'/>
                <h4>Equipamentos Doados</h4>
                <hr className='mb-6'/>
                <div className='p-4 bg-gray-100 border rounded-2xl'>
                <div className="flex">
                    <FormDonatariosItens donatario_id={values.id} />
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
                                    <button onClick={() => handleDeleteItem(item.id)}>Excluir</button>
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

export default function DonatariosPages() {
    
    return (
        <Crud
            title="Doações"
            endPoint="donatarios"
            searchFieldName='search'
            desc="Cadastro de Doações"
            emptyObject={{
                nome_diretor: '',
                contato_diretor: '',
                quantidade: '',
                termo_doacao: '',
                data_entrega: '',
            }}
            fields={[
                { name: 'id', label: 'Id', classBody: 'min-width' },
                { name: 'nome_diretor', label: 'Nome do Diretor' },
                { name: 'contato_diretor', label: 'Contato' },
                { name: 'quantidade', label: 'Quantidade' },
                { name: 'data_entrega', label: 'Data de Entrega' },
            ]}
           
            validation={(Yup: object | any) => {
                return {
                    nome_diretor: Yup.string().required('Campo obrigatório'),
                    contato_diretor: Yup.string().required('Campo obrigatório'),
                    quantidade: Yup.string().required('Campo obrigatório'),
                    termo_doacao: Yup.string().required('Campo obrigatório'),
                    data_entrega: Yup.string().required('Campo obrigatório'),
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
            showViewAlterStatus={false}        />
    );
}
