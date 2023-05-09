import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Router from 'next/router'
import React,{useState} from 'react'
import { auth } from '@/config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Home() {

  const [ login, setLogin ] = useState('')
  const [ senha, setSenha ] = useState('')
  const [ erro, setErro ] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErro(null);
    new Promise(resolve => setTimeout(resolve, 1000));   

    // if (login == 'teste@gmail.com' && senha == '123456')
    // else
    // setErro("Email ou senha incorretos")
    
    signInWithEmailAndPassword (auth, login, senha)
      .then(usuarioLogado =>{
        Router.push("/cadastroPergunta") 
      })
      .catch(erro => {
        console.log(erro)
          setErro('Email ou senha incorretos!')
      })
  }

  return (
    <div class="page">
    <form onSubmit={handleSubmit} method="POST" class="formLogin">
        <h1>Login</h1>
        <p>Digite os seus dados de acesso no campo abaixo.</p>
        <label for="email">E-mail</label>
        <input value={login } onChange={(event) => setLogin(event.target.value)} type="email" placeholder="Digite seu e-mail" autofocus="true" />
        <label for="password">Senha</label>
        <input value={senha} onChange={(event) => setSenha(event.target.value)} type="password" placeholder="Digite seu e-mail" />
        <input type="submit" value="Acessar" class="btn" />
    </form>
    </div>
  )
}
