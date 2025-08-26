import {
  Table,
  TableBody,
//   TableCell,
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
        <Table className="table-auto md:table-fixed border-collapse">
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
                    <TableRow key={item.id}>
                        {props.fieldsHtml && <FieldsHtml {...props} item={item}  />}
                        {!props.fieldsHtml && 
                            <>
                                {props.fields.map(i => (
                                    <td className={ i.classBody || ''}>{item[i.name]}</td>
                                ))}
                            </>
                        }
                        {!props.enableBtnEdit && !props.enableBtnEdit &&
                            <td style={{ width: '12%' }}>
                                {!props.enableBtnEdit && 
                                    <button onClick={() => {
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
                                    <button  onClick={() => props.handleDelete(item)}>
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


