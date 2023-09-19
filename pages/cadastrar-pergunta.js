import styles from "./../styles/cadastroPerguntas.module.css";
import { useRouter } from "next/router";
import { db, auth } from '@/config/firebase';
import { setDoc, getDocs, doc, getDoc, collection } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import Navegacao from "./_navegacao";

export default function CadastroPergunta() {


  const router = useRouter();
  const [ pergunta, setPergunta ] = useState({
    titulo: '', perguntaImage: '', alternativa1: '', alternativa2: '', alternativa3: '', alternativa4: '',
    alternativaCorreta: "1", resposta: '', respostaImagem: '' 
  });

  // ====================================
  const getDataAtual = () => {
    let dataAtual = new Date();
    return dataAtual.toISOString().slice(0, 19).replace('T', ' ');
  }
  // ============
  async function getPergunta(){
    if (router.query.pergunta)  {
       const perguntaID = router.query.pergunta;
    
        let docRef = doc(db, "perguntas", perguntaID);
        let docSnap = await getDoc(docRef);
        setPergunta(docSnap.data())
    }
  }
  // =============
  const onSubmit = async (pergunta) => {

    let documento = doc(collection(db, 'perguntas'));

    if (router.query.pergunta) { 
      //Edição de Pergunta
      pergunta['id'] = router.query.pergunta;
      documento = doc(db, 'perguntas', router.query.pergunta);
    } else { 
      //Cadastro de Pergutna
      pergunta['data-cadastro'] = getDataAtual();
      pergunta['id'] = documento.id;
    }
    
    setDoc(documento, pergunta);
    router.push('/perguntas');
  };
  // =============
  useEffect(() => {
      getPergunta();
  }, [])

 

  return (
    <div class="page">
      <Navegacao/>
      <Formik
         enableReinitialize
        initialValues={pergunta}
        onSubmit={onSubmit}
      >
        {({values, handleChange, handleBlur, handleSubmit, isValid}) => (
          <form
            onSubmit={handleSubmit}
            method="POST"
            className={styles.formCadastroPergunta}
          >
            <h1>Insira os dados da pergunta</h1>
            <p>Informações da Pergunta</p>
            {/* TITULO */}
            <label>Título</label>
            <Field type="text" placeholder="Digite o titulo da pergunta!" autofocus="true" name="titulo" required />
 
            {/* Imagem  da Pergunta */}
            <label>URL para uma Imagem</label>
            <Field type="url" name="perguntaImage" placeholder="Digite uma URL da imagem desejada" />
            
            {/* ALTERNATIVA 1 */}
            <label>Primeira Alternativa </label>
            <Field type="text" placeholder="Digite a primeira alternativa da pergunta" name="alternativa1" required/>
            <div className={styles.alternativaCorreta}>
              <Field type="radio" value="1" name="alternativaCorreta" /> Alternativa Correta?
            </div>

            {/* ALTERNATIVA 2 */}
            <label>Segunda Alternativa </label>
            <Field type="text" placeholder="Digite a segunda alternativa da pergunta" name="alternativa2" required/>
            <div className={styles.alternativaCorreta}>
              <Field type="radio" value="2" name="alternativaCorreta"  /> Alternativa Correta?
            </div>

            {/* ALTERNATIVA 3 */}
            <label>Terceira Alternativa </label>
            <Field type="text" placeholder="Digite a terceira alternativa da pergunta" name="alternativa3" />
            <div className={styles.alternativaCorreta}>
              <Field type="radio" value="3" name="alternativaCorreta" /> Alternativa Correta?
            </div>

            {/* ALTERNATIVA 4 */}
            <label>Quarta Alternativa </label>
            <Field type="text" placeholder="Digite a 4 alternativa da pergunta" name="alternativa4" />
            <div className={styles.alternativaCorreta}>
              <Field type="radio" value="4" name="alternativaCorreta" /> Alternativa Correta?
            </div>

            {/* ============================ */}
            <hr/>
            <p>Dados das Respostas</p>

            {/* Imagem  da Resposta */}
            <label>URL para uma Imagem da resposta</label>
            <Field type="url" name="respostaImagem" placeholder="Digite uma URL da imagem desejada"  />
            
            {/* EXPLICAÇÃO */}
            <label>Explicação da resposta </label>
            <Field type="text" placeholder="Digite a explicação da resposta" name="resposta" required/>
            
            {/* ENVIAR */}
            <input type="submit" value="Salvar" class="btn" />
            <input type="button" value="Cancelar" class="btn" onClick={() => router.back()}/>

          </form>
        )}
      </Formik>
    </div>
  );
}
