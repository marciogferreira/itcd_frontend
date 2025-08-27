import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";


type DataProps = {
    list: any[],
    fields: any[],
    titleBtnEdit: string,
    enableBtnEdit: boolean,
    handleEdit: (item: any) => void,
    enableBtnDelete: boolean,
    handleDelete: (item: any) => void,
    handleCustomEdit?: (item: any) => void,
    fieldsHtml?: any,
    enableBtnNew: boolean,
    handleNew: () => void
}

export default function Grid(props: DataProps) {
    
    const FieldsHtml = props.fieldsHtml;

    return (
        <Table className="table-auto border-separate  border-spacing-2">
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                    {props.fields.map((item, index) => (
                        <td key={index} >
                            <strong>{item.label}</strong>
                        </td>
                    ))}
                    {!props.enableBtnEdit &&
                        <td style={{ width: '15%' }}>
                            <strong>Ações</strong>
                        </td>
                    }
                </TableRow>
            </TableHeader>
            <TableBody>
                {props.list && props.list.map((item) => (
                    <TableRow key={item.id} className="bg-gray-100 even:bg-white">
                        {props.fieldsHtml && <FieldsHtml {...props} item={item}  />}
                        {!props.fieldsHtml && 
                            <>
                                {props.fields.map(i => (
                                    <TableCell className={ i.classBody || ''}>{item[i.name]}</TableCell>
                                ))}
                            </>
                        }
                        {!props.enableBtnEdit && !props.enableBtnEdit &&
                            <td style={{ width: '12%' }} className="p-1">
                                {!props.enableBtnEdit && 
                                    <button 
                                        className="bg-gray-200 text-blue-900 p-2 rounded-md"
                                        onClick={() => {
                                        if(props.handleCustomEdit) {
                                            props.handleCustomEdit(item)
                                        } else {
                                            props.handleEdit(item)
                                        }
                                    }}>
                                        Editar
                                    </button>
                                }
                                &nbsp;
                                {!props.enableBtnDelete && 
                                    <button className="bg-gray-200 text-red-700 p-2 rounded-md" onClick={() => props.handleDelete(item)}>
                                        Excluir
                                    </button>
                                }
                            </td>
                        }
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}


