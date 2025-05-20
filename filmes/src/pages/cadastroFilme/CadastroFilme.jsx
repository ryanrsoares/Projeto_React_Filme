import { useEffect, useState } from "react";
import api from "../../Services/services";
//importar o sweet alert:
import Swal from 'sweetalert2';


// importação das components
import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Lista from "../../components/lista/Lista";

const CadastroFilme = () => {

    const [listaGenero, setListaGenero] = useState([]);
    const [genero, setGenero] = useState("");    
    const [filme, setFilme] = useState("");

    function alertar(icone, mensagem) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: icone,
                title: mensagem
            });
        }

        
    //     async function cadasrtoFilme(e) {
    //         e.preventDefault();
    //         //verificar se o input está vindo vazio
    //         if (listaGenero.trim() !== "") {
    //             //try => tentar(o esperado)
    //             //catch => lança a exceção
    //             try {
    //                 //cadastrar um gênero: post
    //                 await api.post("filme", { nome: listaGenero });
    //                 alertar("success", "Filme cadastrado com sucesso!")
    //                 setListaGenero("");
    //             } catch (error) {
    //                 alertar("error", "Erro! Entre em contato com o suporte!")
    //                 console.log(error);
    //             }
    //         } else {
    //             alertar("error", "Erro! Preencha o campo")
    //         }
    //     }

        // função para trazer os generos no meu select
        async function listarGenero (){
            try {
                const resposta = await api.get("genero");
                setListaGenero(resposta.data)
            } catch (error) {
                console.log(error);
                
            }
        }
        
        async function cadastrarFilme(e) {
            e.preventDefault();
            // console.log(filme);
            // console.log(genero);
            
            if (filme.trim() != "") {
                try {
                    await api.post("filme", { titulo: filme, idGenero: genero});
                    alertar("success", "Filme cadastrado com sucesso!")
                    setFilme("");
                    setGenero("");
                } catch (error) {
                    alertar("error", "Erro! Entre em contato com o suporte!")
                    console.log(error);
                }
            } else {
                alertar("error", "Erro! Preencha o campo")
            }
        }

    useEffect(()=>{
        listarGenero();
    }, [])

    return(
        <>
            <Header/>
            <main>
                <Cadastro 
                    tituloCadastro="Cadastro de Filme"
                    placeholder = "filme"
                    lista={listaGenero}
                    funcCadastro={cadastrarFilme}
                    setValorInput={setFilme}
                    valorInput={filme}
                    setValorSelect={setGenero}
                    valorSelect={genero}
                />
                <Lista
                    tituloLista = "Lista de Filmes"
                />
            </main>
            <Footer/>
        </>
    )
}

export default CadastroFilme;