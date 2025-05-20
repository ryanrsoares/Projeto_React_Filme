import { useEffect, useState } from "react";

import api from "../../Services/services";

//importar o sweet alert:
import Swal from 'sweetalert2';

// importação de componentes:
import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Lista from "../../components/lista/Lista";

// function() => {} - função

// () => {} - arrow function ou função anonima 
//             função      dependência
// useEffect (() =>  {},        []      )

// useEffect() hooks 

// hooks: Effect(efeito a partir de umam alteração de estado)
//      :efeito colateral
// função:o efeito que querem que aconteça 
// dependência: vazio(o efeito acontece na primeira vez que a tela é "montada" ou ou quando for recarregada, com como dependecia (toda vez que o state sogre alteração o efeito acontecerá))

const CadastroGenero = () => {

    //nome do genero 
    const [genero, setGenero] = useState("");
    const [listaGenero, setListaGenero] = useState([]);

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

    // useEffect(() =>{
    //     alertar("success" , "Lista modificada com sucesso")
    // },[]);

    async function cadastrarGenero(e) {
        e.preventDefault();
        //verificar se o input está vindo vazio
        if (genero.trim() != "") {
            //try => tentar(o esperado)
            //catch => lança a exceção
            try {
                //cadastrar um gênero: post
                await api.post("genero", { nome: genero });
                alertar("success", "Cadastro realizado com sucesso!")
                setGenero("");
            } catch (error) {
                alertar("error", "Erro! Entre em contato com o suporte!")
                console.log(error);
            }
        } else {
            alertar("error", "Erro! Preencha o campo")
        }
    }

    //síncrono => Acontece simutâneamente
    //assincrono => Esperar algo/resposta para ir para outro bloco de código. 
    async function listarGenero(){
        try {
            //await -> Aguarde ter uma resp da solicitação
           const resposta = await api.get("genero");
            console.log(resposta.data);
            // console.log(resposta.data[3].idGenero);
            // console.log(resposta.data[3].nome);
           setListaGenero(resposta.data);
        } catch (error) {
            console.log(error);
        }  
    }

    // async function excluirGenero(id){
    //     console.log(id);
        
    //     try {
    //         api.delete(`genero/${idGenero.idGenero}`)
    //     } catch (error) {
    //         console.log(error);
            
    //     }
    // }

    async function deletaGenero(idGenero) {
        
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Você tem certeza?",
            text: "Não será possivel reverter!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, delete isso!",
            cancelButtonText: "Não, cancele!",
            reverseButtons: true
        }).then(async(result) => {
            if (result.isConfirmed) {
                try {
                    //conectar a api
                    //solicitar a exclusao do genero
                    //interpolacao X concatenacao
                    //`genero/${idGenero}`
                    await api.delete(`genero/${idGenero}`)
                    listarGenero();
                }
                catch (error) {
                    console.log(error)
                }
                swalWithBootstrapButtons.fire({
                    title: "Deletado!",
                    text: "Seu genêro foram deletados.",
                    icon: "success"
                });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado!",
                    text: "Seu gênero não foi excluido",
                    icon: "error"
                });
            }
        });
    }
    
    //funcao de excluir o genero ;)
    
    //teste: validar o genero
    //useEffect(<function>, <dependency>)
    // useEffect(() => {
    //     console.log(genero);
    // },[genero]);
    //fim do teste

    // Assim que a página renderizar, o método listarGenero() será chamado
    useEffect(() => {
        listarGenero();
    }, [])
    

    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro de Gênero"
                    visibilidade="none"
                    placeholder="gênero"

                    //Atribuindo a função:
                    funcCadastro={cadastrarGenero}
                    //Atribuindo o valor ao input:
                    valorInput={genero}
                    //Atribuindo a função que atualiza o meu genero:
                    setValorInput={setGenero}
                />
                <Lista
                    tituloLista="Lista de Gêneros"
                    visibilidade="none"

                    //atribuir para lista, o meu estado atual:
                    lista = {listaGenero}
                    deletar={deletaGenero}

                    
                />
            </main>
            <Footer />
        </>
    )
}

export default CadastroGenero;