import { Col } from 'react-bootstrap';
// import { Pagination as Paginate } from 'react-laravel-paginex'
// import { Pagination as Paginate } from "react-laravel-pagination";

export default function Pagination(props: any) {
    // const options = {
    //     nextButtonText: 'Próxima',
    //     prevButtonText: 'Anterior'
    // };
    console.log("Pagination", props)
    return (
        <>
            <div className='flex justify-between' style={{ padding: '5px' }}>
                <Col>
                    <button 
                        className={`${props.current <= 1 ? 'disable': ''} link  bg-gray-200 p-2 rounded-md`}
                        onClick={() => props.onChange(props.data.current_page - 1)}
                        >
                        Anterior
                    </button>
                    &nbsp;
                    <button 
                        className='bg-gray-200 p-2 rounded-md'
                        onClick={() => props.onChange(props.data.current_page + 1)}
                    >
                        Próxima
                    </button>
                </Col>
                <Col style={{ textAlign: 'right' }}>
                    <p>Monstrando {props.data.to || 0} de {props.data.total || 0} registros.</p>
                </Col>
            </div>
        </>
    );
}