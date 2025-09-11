import { useState } from 'react';
import Pagination from '../Pagination';
import Form from '../form';
import Grid from '../Grid';
import useDebounce from '../useDebounce';
import Message from '../../config/Message';
import Api from '../../config/Api';
import ComponentCard from '../common/ComponentCard';
import { useQuery } from '@tanstack/react-query'
import Loading from '../Loading';
// import LoadingScreen from '../LoadingScreen';

export default function Crud(props: any) {   
   
    const [view, setView] = useState('list');
    const [data, setData] = useState(props.emptyObject);
    const [list, setList] = useState([]);
    // const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [files, setFiles] = useState(null);
    const [paramsSearch, setParamsSearch] = useState({});
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);
    const debouncedSearchParamsTerm = useDebounce(paramsSearch, 500);

    const { refetch } = useQuery({
        queryKey: ['repoData', debouncedSearchParamsTerm, page],
        queryFn: () =>
        Api.get(props.endPoint, { params: { ...paramsSearch, page: page }}).then((res) => {
            setLoading(true);
                setList(res.data.data);
                setPagination(res.data);
            setLoading(false);
            return res.data
        }),
    })
    
    async function loadData() {
        refetch()
    }
    
    async function handleSubmit (values: any) {
        let msg = 'Registro Salvo com Sucesso';
        if(props.handleSubmitCustom) {
            await props.handleSubmitCustom(values, files);
            return;
        }
        if(values.id) {
            msg = 'Registro Atualizado com Sucesso';
             await Api.put(`${props.endPoint}/${values.id}`, values);
        } else {
            const response = await Api.post(props.endPoint, values);
            setData(response.data.data)
        }

        // objects.setSubmi
        Message.success(msg);
        loadData();
        if(!props.saveContinueForm) {
            setView('list');
        } else {
            setView('edit');
        }
        // setView('list');
    }

    function handleNew() {
        setData(props.emptyObject);
        setView('new');
    }

    async function handleEdit(item: any) {
        const response = await Api.get(`${props.endPoint}/${item.id}`);
        setData({...response.data.data});
        setView('edit');
    }

    async function handleDelete(item: any) {
        await Message.confirmation("Deseja deletar este registro?", async () => {
            await Api.delete(`${props.endPoint}/${item.id}`);
            loadData();
            Message.success("Registro deletado com sucesso.");
        }); 
    }

    function handleList(item: any) {
        setView('list');
        refetch();
        console.log(item)       
    }
   
    return (
        <>
            <ComponentCard desc={props.desc} title={props.title} contentLeft={() => (
                
                <>
                    
                    {view === 'list' &&
                        <>
                            {/* <div>
                                <InputSearch 
                                    value={search} 
                                    handleText={value => setSearch(value)} 
                                    loadData={loadData}
                                />
                            </div> */}
                            {/* <div> */}
                                {!props.enableBtnNew && <button
                                    onClick={handleNew}
                                    className="float-right flex w-full items-center justify-center gap-2 rounded-md border text-white border-green-600 bg-green-600 px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
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
                                    Novo
                                </button>}
                                
                            {/* </div> */}
                        </>
                    }
                </>
            )}>
                
                {view === 'list' && 
                    <>
                        {props.FormSearch && <props.FormSearch params={paramsSearch} setParams={setParamsSearch}  />}
                        {loading && <Loading />}
                        <Grid 
                            titleBtnEdit={''} 
                            enableBtnEdit={false} 
                            enableBtnDelete={false} 
                            handleNew={function (): void {
                                throw new Error('Function not implemented.');
                            } } 
                            {...props}
                            list={list}
                            loadData={refetch}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                        <Pagination
                            data={pagination}                            
                            onChange={(page: any) => {
                                setPage(page)
                            }} 
                        />
                    </>
                }
                {view === 'new' || view === 'edit' ? 
                    <Form 
                        {...props}
                        setFiles={setFiles}
                        view={view}
                        emptyObject={data} 
                        handleSubmit={handleSubmit}
                        handleCancel={handleList}
                        handleEdit={handleEdit}
                        loadData={loadData}
                    /> : null}
            </ComponentCard>
        </>
    );

}
