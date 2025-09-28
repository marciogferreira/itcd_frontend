import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useAuth } from "../../context/AuthContext";
import { ErrorMessage, Formik } from "formik";
import * as Yup from 'yup'
import Api from "../../config/Api";
import Message from "../../config/Message";
export default function UserInfoCard() {
  const { user } = useAuth()
  const { isOpen, closeModal } = useModal();
  const handleSave = async(values: any, form: any) => {
    // Handle save logic here
    try {
      await Api.put(`/reset-password/${user.id}`, values);
      Message.success("Sua senha foi atualizada!")
      form.resetForm()
    } catch(e) {
      
    } finally {

    }
  };

  const validationSchema = Yup.object().shape({
    senha_atual: Yup.string().required('Senha atual é obrigatória').min(6, 'A senha deve ter ao menos 6 caracteres'),
    senha_nova: Yup.string().required('Nova senha é obrigatória').min(6, 'A senha deve ter ao menos 6 caracteres'),
    senha_nova_confirma: Yup.string().required('Confirme a nova senha').oneOf([Yup.ref('senha_nova')], 'As senhas não coincidem'),
  })

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Dados de Usuário
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Nome
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user.name || ''}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  {user.email.length === 11 ? 'CPF' : 'E-mail'}
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user && user.email}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Perfil
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user.role == 1 ? 'Admin' : 'Aluno'}
                </p>
              </div>

              
            </div>
          </div>

        </div>
        
        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
          <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Edit Personal Information
              </h4>
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                Update your details to keep your profile up-to-date.
              </p>
            </div>
            <form className="flex flex-col">
              <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                <div>
                  <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                    Social Links
                  </h5>

                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                    <div>
                      <Label>Facebook</Label>
                      <Input
                        type="text"
                        value="https://www.facebook.com/PimjoHQ"
                      />
                    </div>

                    <div>
                      <Label>X.com</Label>
                      <Input type="text" value="https://x.com/PimjoHQ" />
                    </div>

                    <div>
                      <Label>Linkedin</Label>
                      <Input
                        type="text"
                        value="https://www.linkedin.com/company/pimjo"
                      />
                    </div>

                    <div>
                      <Label>Instagram</Label>
                      <Input type="text" value="https://instagram.com/PimjoHQ" />
                    </div>
                  </div>
                </div>
                <div className="mt-7">
                  <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                    Personal Information
                  </h5>

                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                    <div className="col-span-2 lg:col-span-1">
                      <Label>First Name</Label>
                      <Input type="text" value="Musharof" />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                      <Label>Last Name</Label>
                      <Input type="text" value="Chowdhury" />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                      <Label>Email Address</Label>
                      <Input type="text" value="randomuser@pimjo.com" />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                      <Label>Phone</Label>
                      <Input type="text" value="+09 363 398 46" />
                    </div>

                    <div className="col-span-2">
                      <Label>Bio</Label>
                      <Input type="text" value="Team Manager" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <Button size="sm" variant="outline" onClick={closeModal}>
                  Close
                </Button>
                <Button size="sm" onClick={() => {}}>
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>

      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="w-full">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Alterar Senha
            </h4>

            <Formik
              initialValues={{
                senha_atual: '',
                senha_nova: '',
                senha_nova_confirma: ''
              }}
              validationSchema={validationSchema}
              onSubmit={handleSave}
            >
              {({ handleSubmit }) => (
                <>
                  
                  <div className="gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                    
                    <div className="md:w-[50%]">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Senha Atual
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                          <Input type="password" id="senha_atual" name="senha_atual" />
                          <span className="error">
                            <ErrorMessage name="senha_atual" component="span" />
                          </span>
                      </p>
                    </div>
                    <br />

                    <div className="md:flex justify-between gap-4">
                      <div className="md:w-[50%]">
                        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                          Nova Senha
                        </p>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            <Input type="password" id="senha_nova" name="senha_nova" />
                            <span className="error">
                              <ErrorMessage name="senha_nova" component="span" />
                            </span>
                        </p>
                      </div>
                      <br />

                      <div className="md:w-[50%]">
                        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                          Confirmar Nova Senha
                        </p>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            <Input type="password" id="senha_nova_confirma" name="senha_nova_confirma" />
                            <span className="error">
                              <ErrorMessage name="senha_nova_confirma" component="span" />
                            </span>
                        </p>
                      </div>
                      <br />
                    </div>
                    
                    <div className="w-full flex justify-end">
                      <button 
                        className="float-right flex w-full items-center justify-center gap-2 rounded-md border text-white border-green-600 bg-green-600 px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                        onClick={() => handleSubmit()} >
                        Alterar Dados
                      </button>
                    </div>

                  </div>
                </>
              )}
            </Formik>
          </div>

          {/* <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                fill=""
              />
            </svg>
            Edit
          </button> */}
        </div>
        
        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
          <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Edit Personal Information
              </h4>
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                Update your details to keep your profile up-to-date.
              </p>
            </div>
            <form className="flex flex-col">
              <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                <div>
                  <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                    Social Links
                  </h5>

                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                    <div>
                      <Label>Facebook</Label>
                      <Input
                        type="text"
                        value="https://www.facebook.com/PimjoHQ"
                      />
                    </div>

                    <div>
                      <Label>X.com</Label>
                      <Input type="text" value="https://x.com/PimjoHQ" />
                    </div>

                    <div>
                      <Label>Linkedin</Label>
                      <Input
                        type="text"
                        value="https://www.linkedin.com/company/pimjo"
                      />
                    </div>

                    <div>
                      <Label>Instagram</Label>
                      <Input type="text" value="https://instagram.com/PimjoHQ" />
                    </div>
                  </div>
                </div>
                <div className="mt-7">
                  <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                    Personal Information
                  </h5>

                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                    <div className="col-span-2 lg:col-span-1">
                      <Label>First Name</Label>
                      <Input type="text" value="Musharof" />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                      <Label>Last Name</Label>
                      <Input type="text" value="Chowdhury" />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                      <Label>Email Address</Label>
                      <Input type="text" value="randomuser@pimjo.com" />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                      <Label>Phone</Label>
                      <Input type="text" value="+09 363 398 46" />
                    </div>

                    <div className="col-span-2">
                      <Label>Bio</Label>
                      <Input type="text" value="Team Manager" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <Button size="sm" variant="outline" onClick={closeModal}>
                  Close
                </Button>
                <Button size="sm" onClick={() => {}}>
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
}
