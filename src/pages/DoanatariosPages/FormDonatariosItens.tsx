import { ErrorMessage, Field, Formik } from "formik";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import { Button } from "react-bootstrap";
import Api from "../../config/Api";
import Message from "../../config/Message";

type DataDonatarioItens = {
    donatario_id: number;
    equipamento: string;
    quantidade: number | string;
    observacao: string;
}

export default function FormDonatariosItens({ donatario_id }: any) {

    async function handleSave(values: DataDonatarioItens) {
        try {
            await Api.post('donatarios-itens', values);
            Message.success("Item Salvo com Sucesso.")
        } catch(e) {

        } finally {
            
        }
    }

    return (
        <>
            <Formik
                initialValues={{
                    donatario_id: donatario_id,
                    equipamento: '',
                    quantidade: '',
                    observacao: ''
                }}
                onSubmit={(values: DataDonatarioItens) => {
                    handleSave(values);
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
                            <Label>Observação</Label>
                            <Input type="text" id="observacao" name="observacao" />
                            <span className="error">
                                <ErrorMessage name="observacao" component="span" />
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

