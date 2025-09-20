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
                        <Label>Termo de Doação</Label>
                        <Input type="text" id="termo_doacao" name="termo_doacao" />
                        <span className="error">
                            <ErrorMessage name="termo_doacao" component="span" />
                        </span>
                    </div>
                </div>

                 <div className="grid md:grid-cols-3 gap-4">
                <div className="mb-3">
                    <Label>Logradouro</Label>
                    <Input type="text" id="logradouro" name="logradouro" />
                    <span className="error">
                        <ErrorMessage name="logradouro" component="span" />
                    </span>
                </div>

                <div className="mb-3">
                    <Label>Número</Label>
                    <Input type="text" id="numero" name="numero" />
                    <span className="error">
                        <ErrorMessage name="numero" component="span" />
                    </span>
                </div>

                <div className="mb-3">
                    <Label>Complemento</Label>
                    <Input type="text" id="complemento" name="complemento" />
                    <span className="error">
                        <ErrorMessage name="complemento" component="span" />
                    </span>
                </div>
                 </div>

              
               <div className="grid md:grid-cols-3 gap-4">

                <div className="mb-3">
                    <Label>Estado</Label>
                    <Input type="text" id="estado" name="estado" />
                    <span className="error">
                        <ErrorMessage name="estado" component="span" />
                    </span>
                </div>

                <div className="mb-3">
                    <Label>Cidade</Label>
                    <Input type="text" id="cidade" name="cidade" />
                    <span className="error">
                        <ErrorMessage name="cidade" component="span" />
                    </span>
                </div>

                <div className="mb-3">
                    <Label>Bairro</Label>
                    <Input type="text" id="bairro" name="bairro" />
                    <span className="error">
                        <ErrorMessage name="bairro" component="span" />
                    </span>
                </div>

               </div>

   <div className="grid md:grid-cols-3 gap-4">

                <div className="mb-3">
                    <Label>Telefone</Label>
                    <Input type="text" id="telefone" name="telefone" />
                    <span className="error">
                        <ErrorMessage name="telefone" component="span" />
                    </span>
                </div>

                <div className="mb-3">
                    <Label>CNPJ</Label>
                    <Input type="text" id="cnpj" name="cnpj" />
                    <span className="error">
                        <ErrorMessage name="cnpj" component="span" />
                    </span>
                </div>

                <div className="mb-3">
                    <Label>Email</Label>
                    <Input type="email" id="email" name="email" />
                    <span className="error">
                        <ErrorMessage name="email" component="span" />
                    </span>
                </div>
   </div>
               



               
            </div>           
        </>
    );
}

export default function DonatariosPages() {

    return (
        <Crud
            title="Entidades | Doações"
            endPoint="donatarios"
            searchFieldName='search'
            desc="Cadastro de Doações"
            emptyObject={{
                nome_diretor: '',
                contato_diretor: '',
                termo_doacao: '',
            }}
            fields={[
                { name: 'id', label: 'Id', classBody: 'min-width' },
                { name: 'nome_diretor', label: 'Nome do Diretor' },
                { name: 'contato_diretor', label: 'Contato' },
            ]}
           
            validation={(Yup: object | any) => {
                return {
                    nome_diretor: Yup.string().required('Campo obrigatório'),
                    contato_diretor: Yup.string().required('Campo obrigatório'),
                    termo_doacao: Yup.string().required('Campo obrigatório'),
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
