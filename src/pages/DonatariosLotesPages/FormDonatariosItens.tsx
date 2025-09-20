import { ErrorMessage, Field, Formik } from "formik";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import { Button } from "react-bootstrap";
import Api from "../../config/Api";
import Message from "../../config/Message";
import SelectInputs from "../../components/form/form-elements/SelectInputs";
import { useOptions } from "../../hooks/useApi";

type DataDonatarioItens = {
    donatario_ordem_id: number;
    equipamento: string;
    quantidade: number | string;
    observacao: string;
}

export default function FormDonatariosItens({ donatario_ordem_id, loadData }: any) {

    const { data: tiposEquipamentos } = useOptions('tipos-equipamentos');
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

    return (
        <>
            <Formik
                initialValues={{
                    donatario_ordem_id: donatario_ordem_id,
                    equipamento: '',
                    quantidade: '',
                    observacao: ''
                }}
                onSubmit={(values: DataDonatarioItens, form: any) => {
                    handleSave(values, form);
                }}
            >
                {({ handleSubmit }) => (
                    <>
                    <div className="grid md:grid-cols-4 gap-4">
                        <Field type="hidden" id="donatario_id" name="donatario_id" />
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

