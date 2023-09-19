import styles from "./../styles/cadastroPerguntas.module.css";
import { useRouter } from "next/router";
import { db, auth } from '@/config/firebase';
import { setDoc, getDocs, doc, getDoc, collection } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import Navegacao from './_navegacao';

export default function CadastroPergunta() {


  const router = useRouter();
  const [ formularios, setFormulario ] = useState({usuario: '', tecnico: ''});
  const [ editado, setEditado ] = useState(false);

  // ============
  async function getFormularios(){       
      let docRef = doc(db, "formularios", 'unico');
      let docSnap = await getDoc(docRef);
      if (docSnap.exists())
        setFormulario(docSnap.data())
  }
  // =============
  const onSubmit = async (formularios) => {
    setEditado(false);
    let documento = doc(db, "formularios", 'unico');
    await setDoc(documento, formularios);
    setEditado(true);
  };
  // =============
  useEffect(() => {
      getFormularios();
  }, [])
  // ==============================================================
  return (
    <div class="page">
      <Navegacao />
      <Formik
        enableReinitialize
        initialValues={formularios}
        onSubmit={onSubmit}
      >
        {({handleSubmit, isValid}) => (
          <form
            onSubmit={handleSubmit}
            method="POST"
            className={styles.formCadastroPergunta}
          >
            { editado && <p style={{color: 'green'}}>FORMULÁRIOS SALVOS!</p>}
            <h1>Insira os link para os formulários</h1>
            {/* FORMULARIO USUÁRIO COMUM */}
            <label>Formulário Usuário Comum</label>
            <Field type="url" placeholder="Digite o link para o formulário do usuário comum" autofocus="true" name="usuario" required />
          
            {/* FORMULARIO TÉCNICO */}
            <label>Formulário Técnico</label>
            <Field type="url" placeholder="Digite o link para o formulário do técnico" autofocus="true" name="tecnico" required />

            
            {/* ENVIAR */}
            <input type="submit" value="Salvar" class="btn" />
            <input type="button" value="Cancelar" class="btn" onClick={() => router.back()}/>

          </form>
        )}
      </Formik>
    </div>
  );
}
