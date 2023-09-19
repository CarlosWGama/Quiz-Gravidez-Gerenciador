import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { auth } from '@/config/firebase'
import { onAuthStateChanged } from 'firebase/auth';

function Navegacao() {

    const router = useRouter();
    // ====================================================
    const handleSair = () => {
        auth.signOut();
        router.replace('/');
    }
    // ============
    const handleChangePage = async (pagina) => {
        router.push(pagina)
    }
    // ============
    useEffect(() => {
        //Não pode acessar página sem permissão
        onAuthStateChanged(auth, usuario => {
            console.log(usuario)
            if (!usuario)
                router.replace('/');
        })
        
    }, [])


    // =====================================================
    return (
        <div style={styles.container}>
            <p style={styles.btn} onClick={() => handleChangePage('/perguntas')}>GERENCIAMENTO PERGUNTAS</p>
            <p style={styles.btn} onClick={() => handleChangePage('/formularios')}>FORMULÁRIOS</p>
            <p style={styles.btn} onClick={handleSair}>SAIR</p>
        </div>
    )
}

const styles = {
    container: {
        position: 'fixed', 
        top: 0, 
        width: '100%', 
        display: 'flex',
        justifyContent: 'flex-end', 
        background: 'white'
    },
    btn: {
        marginRight: 20,
        fontWeight: 'bold',
        cursor: 'pointer'
    }

};

export default React.memo(Navegacao )
