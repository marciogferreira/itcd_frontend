
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Modal } from "../ui/modal";

export default function RelatoriosPDF({ title, endPoint, show, setShow }: any) {

    const [loading, setLoading] = useState(false);
    
    async function getData() {
        setLoading(true);
        // const response = await axios.get(`https://api.itcd.org.br/relatorios`, {
        //     headers: {
        //         responseType: 'blob'
        //     },
        //     params: {
        //         tipo: endPoint,
        //         ...params
        //     }
        // });
        // const a = document.createElement('a');
        // const url = window.URL.createObjectURL(
        //     new Blob([response], { type: 'application/pdf' })
        // );
        // a.href = url;
        // setSrc(a);
        // a.remove();
        setLoading(false);
    }

    useEffect(() => {
        if(show) {
            getData();
        }
    }, [show]);
    
    return (
        <>  
            <Modal
                 isOpen={show ? true : false} onClose={() => setShow(false)}
                aria-labelledby="example-custom-modal-styling-title"
                className="max-w-[900px] m-4"
            >
                <div className="no-scrollbar relative w-full max-w-[900px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                    {title}
                    
                    <div style={{ textAlign: 'center' }}>
                        {loading && <Spinner animation="border" variant="warning" />}
                    </div>
                    <div style={{ height: '600px' }}>
                        <iframe src={`https://api.itcd.org.br/relatorios?tipo=${endPoint}`}
                            height={"600px"}
                            width="100%"
                        frameBorder="0"></iframe>
                    </div>
                    {/* {!loading && src && 
                        <embed
                            src={src}
                            frameBorder="0"
                            width="100%"
                            height="500px"
                            type="application/pdf"
                        />
                    } */}
                </div>
            </Modal>
        </>
    );
}