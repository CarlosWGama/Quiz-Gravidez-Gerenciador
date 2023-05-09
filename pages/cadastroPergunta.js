import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./../styles/cadastroPerguntas.module.css";
import { useRouter } from "next/router";
import CadastroResposta from "./cadastroResposta/[id]";
import { db, auth } from '@/config/firebase';
import { setDoc, getDocs, doc, getDoc, collection } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { async } from "@firebase/util";

export default function CadastroPergunta() {

  const [titulo, setTitulo] = useState("");
  const [alternativa1, setAlternativa1] = useState("");
  const [alternativa2, setAlternativa2] = useState("");
  const [alternativa3, setAlternativa3] = useState("");
  const [alternativa4, setAlternativa4] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // aqui você verifica se o id existe. Se ele existir você tem que atualizar com update. SE não existir, você usa a lógica de cadastro abaixo
    //if(pergunta.id){
      // UPDATE VEM AQUI
    //}else{
      //Busca o contador
      let contador = router.query.pergunta; 
      if (!contador) {
        const docConfig = doc(db, 'config', 'contador');
        const dados = await getDoc(docConfig);
        contador = dados.data().contador;
        contador++;

        //Atualiza o contador
        setDoc(docConfig, { contador })

      }

      //Cria a pergunta
      const docPergunta = doc(db, "perguntas", ""+contador);

      setDoc(docPergunta, {
        titulo,
      });

      const docAlternativas = doc(db, "perguntas",  ""+contador, "alternativas", "valores")
      setDoc(docAlternativas, {
        alternativa1, alternativa2, alternativa3, alternativa4
      })

     

      router.push(`/cadastroResposta/${contador}`);
    //}
  };

  useEffect(() => {
      getPergunta();
  }, [])

  async function getPergunta(){
      //Existe pergunta
      // console.clear();
      if (router.query.pergunta)  {
         const perguntaID = router.query.pergunta;
      
          let docRef = doc(db, "perguntas", perguntaID);
          let docSnap = await getDoc(docRef);
          const pergunta = docSnap.data()
          
          let colecaoAlternativas = await getDocs(collection(db, "perguntas/"+perguntaID+"/alternativas"));
          let documentosAlternativas = colecaoAlternativas.docs;
          documentosAlternativas.forEach((doc) => {
            let alternativas = doc.data();
            setAlternativa1(alternativas.alternativa1);
            setAlternativa2(alternativas.alternativa2);
            setAlternativa3(alternativas.alternativa3);
            setAlternativa4(alternativas.alternativa4);
          });
          setTitulo(pergunta.titulo);
          
      }
      // alert(router.query.pergunta)
      // if (router.query.pergunta) {
      //   const snapshot = await getDocs(collection(db, "perguntas"));
      //   alert(JSON.stringify(snapshot))
      // }
  }

  return (
    <div class="page">
      <form
        onSubmit={handleSubmit}
        method="POST"
        style={{}}
        className={styles.formCadastroPergunta}
      >
        <h1>Insira os dados da pergunta</h1>
        <p>Preencha os dados abaixo</p>
        <label for="titulo">Título</label>
        <input
          type="titulo"
          placeholder="Digite o titulo da pergunta!"
          autofocus="true"
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
        />
        <label for="alternativas">Primeira Alternativa </label>
        <input
          type="alternativas"
          placeholder="Digite a alternativa da pergunta"
          value={alternativa1}
          onChange={(event) => setAlternativa1(event.target.value)}
        />
        <label for="alternativas">Segunda Alternativa </label>
        <input
          type="alternativas"
          placeholder="Digite a alternativa da pergunta"
          value={alternativa2}
          onChange={(event) => setAlternativa2(event.target.value)}
        />
        <label for="alternativas">Terceira Alternativa</label>
        <input
          type="alternativas"
          placeholder="Digite a alternativa da pergunta"
          value={alternativa3}
          onChange={(event) => setAlternativa3(event.target.value)}
        />
        <label for="alternativas">Quarta Alternativa</label>
        <input
          type="alternativas"
          placeholder="Digite a alternativa da pergunta"
          value={alternativa4}
          onChange={(event) => setAlternativa4(event.target.value)}
        />
        <input type="submit" value="Proximo" class="btn" />
      </form>
    </div>
  );
}
