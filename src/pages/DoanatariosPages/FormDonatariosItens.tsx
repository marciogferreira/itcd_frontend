import { ErrorMessage, Field, Formik } from "formik";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import { Button } from "react-bootstrap";
import Api from "../../config/Api";
import Message from "../../config/Message";
import * as Yup from 'yup'

type DataDonatarioItens = {
    donatario_id: number;
    equipamento: string;
    quantidade: number | string;
    observacao: string;
}

export default function FormDonatariosItens({ donatario_id, loadData }: any) {

    async function handleSave(values: DataDonatarioItens, form: any) {
        try {
            await Api.post('donatarios-itens', values);
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
                    donatario_id: donatario_id,
                    equipamento: '',
                    quantidade: '',
                    observacao: ''
                }}
                validationSchema={validacaoSchema}
                onSubmit={(values: DataDonatarioItens, form: any) => {
                    handleSave(values, form);
                }}
            >
                {({ handleSubmit }) => (
                    <>
                    <div className="grid md:grid-cols-4 gap-4">
                        <Field type="hidden" id="donatario_id" name="donatario_id" />
                        <div className='mb-3'>
                            <Label>Equipamento</Label>
                            <Input type="text" id="equipamento" name="equipamento" />
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

