export default function LoadingScreen() {
    
    return (
        <div 
            className="" 
            style={{ 
                display: 'block',
                backgroundColor: 'rgba(0,0,0,0.5)', 
                position: 'fixed', 
                zIndex: "200000", 
                width: '100%',
                height: '100vh',
                justifyContent: "center",
                alignItems: 'center'
            }}>
                <div 
                    className="content"
                    style={{
                        textAlign: 'center',
                        color: '#FFF',
                        marginTop: '20%'
                    }}>
                        Por favor, aguarde...
                </div>
        </div>
    );
}