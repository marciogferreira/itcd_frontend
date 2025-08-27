import * as yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';
import FormButtons from '../FormButtons';

function Form(props: any){
    return (
        <Formik
            enableReinitialize
            initialValues={props.emptyObject}
            validationSchema={yup.object().shape({...props.validation(yup)})}
            onSubmit={props.handleSubmit}
        >
            {(objects) => (
                <form>
                  
                    <props.FormWrapper 
                        ErrorMessage={ErrorMessage} 
                        Field={Field} 
                        view={props.view} 
                        loadFile={props.loadFile}
                        {...objects}
                        {...props}
                        handleSubmitForm={objects.handleSubmit}
                        handleCancelForm={objects.handleReset}
                    />
                    <br />
                    
                    {!props.enableBtns && <FormButtons 
                        enableBtnSave={false} 
                        enableBtnCancel={false} 
                        titleBtnSave={''} 
                        titleBtnCancel={''} 
                        {...props}
                        isSubmitting={objects.isSubmitting}
                        handleSave={objects.handleSubmit}                    
                    />}
                </form>
            )}
        </Formik>
    );
}

export default Form;