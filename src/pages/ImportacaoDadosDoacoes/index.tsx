import ComponentCard from "../../components/common/ComponentCard";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from 'yup'
import Api from "../../config/Api";
import Message from "../../config/Message";

export default function ImportacaoDadosDoacoes() {
    
    return (
        <ComponentCard desc="" title="" contentLeft={() => null}>
             <Formik
                initialValues={{ file: null }}
                validationSchema={Yup.object({
                file: Yup.mixed()
                    .required("O arquivo CSV é obrigatório")
                    .test("fileType", "O arquivo deve ser CSV", (value: any) => {
                        console.log("vcalue", value)
                    return value && value.type === "text/csv" || value.type === 'application/vnd.ms-excel';
                    }),
                })}
                onSubmit={async (values: any, { setSubmitting, resetForm }) => {
                const formData = new FormData();
                formData.append("file", values.file);
    
                try {
                    await Api.post("/importar-donatarios-csv", formData);
                    Message.success("Importação Realizada com Sucesso.");
                    resetForm();
                } catch (error) {
                    console.error("Erro ao enviar CSV:", error);
                    Message.error("Erro ao enviar arquivo");
                } finally {
                    setSubmitting(false);
                }
                }}
            >
                {({ setFieldValue, isSubmitting, values }) => (
                <Form
                    className="bg-white shadow-md rounded-2xl w-full max-w-md"
                    encType="multipart/form-data"
                >
                    <h2 className="text-xl font-bold mb-6 text-gray-800">
                        Upload de Arquivo CSV - Doações
                    </h2>
    
                    <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Selecione um arquivo CSV
                    </label>
    
                    <input
                        type="file"
                        name="file"
                        accept=".csv"
                        onChange={(event: any) => {
                        setFieldValue("file", event.currentTarget.files[0]);
                        }}
                        className="block w-full text-sm text-gray-600 
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100"
                    />
    
                    <ErrorMessage
                        name="file"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                    />
    
                    {values.file && (
                        <p className="text-green-600 text-sm mt-2">
                        Arquivo selecionado: {values.file.name}
                        </p>
                    )}
                    </div>
    
                    <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
                    >
                    {isSubmitting ? "Enviando..." : "Enviar CSV"}
                    </button>
                </Form>
                )}
            </Formik>
        </ComponentCard>


    )
}