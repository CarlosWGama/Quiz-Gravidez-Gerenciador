import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./../styles/segundaTela.module.css";
import { useRouter } from "next/navigation";
import { db } from "@/config/firebase";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

export default function SegundaTela() {
  const [perguntas, setPerguntas] = useState([]);
  const router = useRouter();
  // const router = useRouter();

  useEffect(() => {
    getFirestoreData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push("/cadastroPergunta");
  };

  const getFirestoreData = async () => {
    const snapshot = await getDocs(collection(db, "perguntas"));
    const retorno = [];
    snapshot.forEach((doc) => {
      const dados = { ...doc.data(), id: doc.id };
      retorno.push(dados);
    });
    console.log(retorno);
    setPerguntas(retorno);
  };

  const deletarPergunta = async (id) => {
    try {
      await deleteDoc(doc(db, `perguntas/${id}/alternativas`, 'valores'));
      await deleteDoc(doc(db, "perguntas", id));
      getFirestoreData();
    } catch (erro) {
      alert(erro);
    }
  };

  const editarPergunta = async (id) => {
    router.push("/cadastroPergunta?pergunta="+id);
    //localStorage.setItem("pergunta", id);
    
  };

  return (
    <div class="page">
      <form
        onSubmit={handleSubmit}
        method="POST"
        style={{ alignItems: "center" }}
        className={styles.formCadastroPergunta}
      >

        <div className={styles.divTabela}>
          <section className={styles.header}>
            <h1 style={{}}>Perguntas</h1>
            <input type="submit" value="Cadastrar nova pergunta" class="btn3" />
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
                <th>Titulo</th>
                <th>Editar/Excluir</th>
              </tr>
            </thead>
            <tbody>
              {perguntas.map((valor, index) => (
                <tr key={index} className={styles.tabelaTr}>
                  <td>{valor.id}</td>
                  <td>{valor.titulo}</td>
                  <td>
                    {" "}
                    <input type="button" value="Editar" class="btn2" onClick={() => editarPergunta(valor.id)} />
                    <input
                      type="button"
                      value="Excluir"
                      class="btn2"
                      onClick={() => deletarPergunta(valor.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
}
