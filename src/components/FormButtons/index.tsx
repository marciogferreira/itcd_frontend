
export default function FormButtons(props: any) {
    return (
        <div style={{  padding: '20px'}}>
            <div style={{ float: 'right' }}>
                {!props.enableBtnCancel && 
                    <button className="flex w-full items-center justify-center gap-2 rounded-md border  border-gray-200 bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto" onClick={props.handleCancel}>{props.titleBtnCancel || 'Cancelar'}</button>
                }
                &nbsp;
                {!props.enableBtnSave && 
                    <button className="flex w-full items-center justify-center gap-2 rounded-md border border-green-600 bg-green-600  px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto" disabled={props.isSubmitting} onClick={props.handleSave}>{props.titleBtnSave || 'Salvar'}</button>
                }
            </div>
        </div>
    );
}