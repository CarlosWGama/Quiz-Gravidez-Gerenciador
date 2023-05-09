import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./../../styles/cadastroPerguntas.module.css";
import { useState } from "react";
import { useRouter } from 'next/router';
import { db, auth } from '@/config/firebase';
import { updateDoc, doc, getDoc } from "@firebase/firestore";

export default function CadastroResposta() {
  const [resposta_correta, setRespostaCorreta] = useState("");
  const [explicacao, setExplicacao] = useState("");
  const [imagem_url, setImagemUrl] = useState("");

  const router = useRouter();
  const perguntaID = router.query.id;


  const handleSubmit = async (event) => {
    event.preventDefault();

    updateDoc(doc(db, "perguntas", perguntaID), {
      "correta": {
        explicacao, resposta_correta, imagem_url
      }
    })


    router.push("/segundaTela");
  };

  return (
    <div class="page">
      <form
        onSubmit={handleSubmit}
        method="POST"
        style={{}}
        className={styles.formCadastroPergunta}
      >
        <h1>Cadastro da Resposta</h1>
        <p>Insira os dados da resposta nos espaços abaixo</p>
        <label for="respostaCorreta">Resposta Correta</label>
        <input
          type="respostaCorreta"
          placeholder="Digite a resposta"
          value={resposta_correta}
          onChange={(event) => setRespostaCorreta(event.target.value)}
        />
        <label for="explicacao">Explicação</label>
        <input
          type="explicacao"
          placeholder="Digite a explicação"
          value={explicacao}
          onChange={(event) => setExplicacao(event.target.value)}
        />
        <label for="imageUrl">Url da Imagem</label>
        <input
          type="imageUrl"
          placeholder="Digite a Url da imagem"
          value={imagem_url}
          onChange={(event) => setImagemUrl(event.target.value)}
        />
        <input type="submit" value="Cadastrar" class="btn" />
      </form>
    </div>
  );
}
