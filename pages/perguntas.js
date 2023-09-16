import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./../styles/segundaTela.module.css";
import { useRouter } from "next/navigation";
import { db } from "@/config/firebase";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, query, orderBy } from "firebase/firestore";

export default function SegundaTela() {
  const [perguntas, setPerguntas] = useState([]);
  const router = useRouter();

  // =========================================================
  const buscarPerguntas = async () => {
    const snapshot = await getDocs(query(collection(db, "perguntas"), orderBy('data-cadastro')));
    const retorno = [];

    snapshot.forEach((doc) => {
      const dados = { ...doc.data(), id: doc.id };
      retorno.push(dados);
    });
    console.log(retorno);
    setPerguntas(retorno);
  };
  // =================
  const deletarPergunta = async (id) => {
    try {
      if (confirm('Você realmente deseja deletar essa pergunta?')) {
        await deleteDoc(doc(db, `perguntas/${id}/alternativas`, 'valores'));
        await deleteDoc(doc(db, "perguntas", id));
        buscarPerguntas();
      }
    } catch (erro) {
      alert(erro);
    }
  };
  // =================
  const editarPergunta = async (id) => {
    router.push("/cadastrar-pergunta?pergunta="+id);    
  };
  // ================
  useEffect(() => {
    buscarPerguntas();
  }, []);
  // ======================================================================
  return (
    <div class="page">
      <div className={styles.formCadastroPergunta}>

        <div className={styles.divTabela}>
          <section className={styles.header}>
            <h1 style={{}}>Perguntas</h1>
            <input type="button" value="Cadastrar nova pergunta" class="btn3" onClick={() => router.push('/cadastrar-pergunta')}/>
          </section>
          <table
            style={{
              marginTop: 20,
              justifyContent: "center",
              overflowY: "scroll",
            }}
            className={styles.tabela}
          >
            <thead>
              <tr>
                <th>Numero</th>
                <th style={{width:'80%'}}>Titulo</th>
                <th>Editar/Excluir</th>
              </tr>
            </thead>
            <tbody>
              {perguntas.map((valor, index) => (
                <tr key={index} className={styles.tabelaTr}>
                  <td>{index+1}</td>
                  <td>{valor.titulo}</td>
                  <td>
                    {" "}
                    <input type="button" value="Editar" class="btn2" onClick={() => editarPergunta(valor.id)} />
                    <input type="button" value="Excluir" class="btn2" onClick={() => deletarPergunta(valor.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
