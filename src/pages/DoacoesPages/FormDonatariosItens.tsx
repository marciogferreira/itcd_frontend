import { ErrorMessage, Field, Formik } from "formik";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import { Button } from "react-bootstrap";
import Api from "../../config/Api";
import Message from "../../config/Message";
import { useOptions } from "../../hooks/useApi";
import SelectInputs from "../../components/form/form-elements/SelectInputs";
import * as Yup from 'yup'

type DataDoacoesItens = {
    doacao_id: number;
    equipamento: string;
    quantidade: number | string;
    observacao: string;
}

export default function FormDoacoesItens({ doacao_id, loadData }: any) {

    const { data: tiposEquipamentos } = useOptions('tipos-equipamentos');

    async function handleSave(values: DataDoacoesItens, form: any) {
        try {
            await Api.post('doacoes-itens', values);
            Message.success("Item Salvo com Sucesso.")
            form.resetForm()
            loadData()
        } catch(e) {

        } finally {
            
        }
    }


    const validacaoSchema = Yup.object().shape({
        equipamento: Yup.string().required('Campo obrigatório'),
        quantidade: Yup.string().required('Campo obrigatório'),
    });

    return (
        <>
            <Formik
                initialValues={{
                    doacao_id: doacao_id,
                    equipamento: '',
                    quantidade: '',
                    observacao: ''
                }}
                validationSchema={validacaoSchema}
                onSubmit={(values: DataDoacoesItens, form: any) => {
                    handleSave(values, form);
                }}
            >
                {({ handleSubmit }) => (
                    <>
                    <div className="grid md:grid-cols-4 gap-4">
                        <Field type="hidden" id="doacao_id" name="doacao_id" />

                        <div className='mb-3'>
                            <SelectInputs options={tiposEquipamentos} label="Tipos de Equipamentos" name="equipamento" id="equipamento" />
                            <span className="error">
                                <ErrorMessage name="equipamento" component="span" />
                            </span>
                        </div>

                        <div className='mb-3'>
                            <Label>Quantidade</Label>
                            <Input type="text" id="quantidade" name="quantidade" />
                            <span className="error">
                                <ErrorMessage name="quantidade" component="span" />
                            </span>
                        </div>

                      

                        <div className='mb-3'>
                            <br />
                            <Button onClick={() => handleSubmit()} className="bg-green-600 text-white rounded-md p-2" variant="success">Salvar</Button>
                        </div>
                    </div>
                    </>
                )}    
            </Formik>        
        </>
    )
}

