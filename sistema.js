//Neste arquivo, os comentários sempre se referem às instruções escritas imediatamente abaixo.
// Importação de funcoes necessarias e classes de outros arquivos

import readlineSync from "readline-sync"

import Cliente from "./clientes.js";
import Funcionario from "./funcionarios.js";
import Quarto from "./quartos.js";
import Reserva from "./reservas.js";

//A classe sistema é a classe principal. Esta utilizará das outras como ferramentas.

class Sistema {
    constructor() {
        this.funcionarios = [];
        this.clientes = [];
        this.reservas = [];
        this.quartos = [];
        this.usuarioLogado = null;
    }

//O programa é iniciado através do comando "node sistema.js"

    iniciar() {
        console.log("Sistema Iniciado!");
        this.menu();
    }

//Menu principal dispõe as opções iniciais.
// O usuário seleciona a opção através do número correspondente à ação que deseja executar.

    menu() {
        let opcao;
        do {
            opcao = readlineSync.question("\n--- Menu ---\n1. Login\n2. Cadastrar Cliente\n3. Cadastrar funcionario\n0. Sair\nEscolha uma opcao: ");
            if(opcao == "1"){
                this.login()
            } else if (opcao === "2") {
                this.cadastrarCliente();
            } else if (opcao === "3") {
                this.cadastrarFuncionario();
            } else if (opcao !=="0"){
                console.log("\nOpcao invalida");
            }
        } while (opcao !== "0");
        console.log("\nSaindo...");
    }

    // Menu com opções dedicadas ao usuário cliente

    menuCliente(client) {
        let opcoesCliente;
        do {
            opcoesCliente = readlineSync.question("\n--- Area do cliente ---\n1. Ver meus dados \n2. Conferir quartos disponiveis \n3. Faca sua reserva aqui \n4. Deseja cancelar uma reserva? \n5. Conferir reserva efetivada \n0. Voltar \nEscolha uma opcao: ");
            if (opcoesCliente == "1"){
                this.verDadosCliente(client) 
            } else if (opcoesCliente == "2"){
                this.listaDeQuartos();
            } else if (opcoesCliente == "3"){
                this.fazerReserva(client);
            } else if (opcoesCliente == "4"){
                this.cancelarReserva(client);
            } else if (opcoesCliente == "5"){
                this.verReservas(client);
            } else if (opcoesCliente !=="0"){
                console.log("\nOpcao invalida");
            }
        } while (opcoesCliente !== "0");
        console.log("Saindo..."); 
        this.menu();
    }

    fazerReserva(client){
        let IDUnico = this.reservas.length + 1;
        const IDCliente = client.IDCliente;
        const status = "Pendente";
        const checkIn = readlineSync.question("Data do check in");
        const checkOut = readlineSync.question("Data do check out");

        const novaReserva = new Reserva(IDUnico, IDCliente, status,  checkIn, checkOut);
        this.reservas.push(novaReserva);
        console.log("\nReserva cadastrada com sucesso");
    }

    cancelarReserva(client){
        let lista_reservas = this.reservas.find(r => r.IDCliente === client.IDCliente);
        console.log(lista_reservas);
        const id = parseInt(readlineSync.question("Qual reserva deseja cancelar: "));

        let reserva_cancelada = lista_reservas.find(x => x.IDUnico === id);
        reserva_cancelada.status = "Cancelada";
        console.log("\nSua reserva foi cancelada com sucesso")
    
    }

    verReservas(client) {
        let lista_reservas = this.reservas.find(r => r.IDCliente === client.IDCliente);
        console.log(lista_reservas);
    }
    
    verDadosCliente(client){
        console.log(client);
    }

    verDadosFuncionario(funcionario) {
        console.log(funcionario)
    }

    // Menu com opções dedicadas ao usuario funcionário

    menuFuncionario(funcionario) {
        let opcoesFuncionario;
        do{
            opcoesFuncionario = readlineSync.question("\n--- Area do funcionario ---\n1. Ver meus dados \n2. Lista de reservas \n3. Lista de quartos \n4. Lista de clientes \n5. Mudar status de uma reserva \n6. Adicionar quarto \n0. Voltar \nEscolha uma opcao: ");
            if (opcoesFuncionario == "1"){
                this.verDadosFuncionario(funcionario) 
            } else if (opcoesFuncionario == "2"){
                this.listaDeReserva();
            } else if (opcoesFuncionario == "3"){
                this.listaDeQuartos();
            } else if (opcoesFuncionario == "4"){
                this.listaDeClientes();
            } else if (opcoesFuncionario == "5"){
                this.mudarStatus();
            } else if (opcoesFuncionario == "6"){
                this.adicionarQuarto();
            } else if (opcoesFuncionario !=="0"){
                console.log("\nOpcao invalida");
            }
        } while (opcoesFuncionario !== "0");
        console.log("\nSaindo..."); 
        this.menu();
    }

    listaDeReserva() {
        console.log(this.reservas);
    }

    listaDeQuartos(){
        console.log(this.quartos);
    }

    mudarStatus(){
        console.log(this.reservas);
        if (this.reservas.length === 0) {
            return console.log("\nNao ha reservas cadastradas")
        }
        const id = parseInt(readlineSync.question("\nInsira o ID da reserva que deseja modificar: "));
        let res = this.reservas.find(r => r.IDUnico === id);
        let opcao;
        do{
            opcao = readlineSync.question("\n--- Atribuir novo status à reserva ---\n1. Pendente\n2. Adiada\n3. Efetivada \n4. Cancelada \n0. Voltar ao menu anterior ");
            if (opcao == 1){
                res.status = "Pendente";
            } else if (opcao == 2){
                res.status = "Adiada";
            } else if (opcao == 3){
                res.status = "Efetivada";
            } else if (opcao == 4){
                res.status = "Cancelada";
            }
        } while (opcao !== "0");
    }

    // Metodo de login

    login(){
        const email = readlineSync.question("E-mail: ");
        const senha = readlineSync.question("Senha: ");

        let funcionario = this.funcionarios.find(user => user.email === email && user.senha === senha);
        if (funcionario) {
            console.log("\nOlá funcionário, seja bem vindo.");
            this.menuFuncionario(funcionario);
        }

        let client = this.clientes.find(user => user.email === email && user.senha === senha);
        if (client) {
            console.log("\nOlá cliente, seja bem vindo.");
            this.menuCliente(client);
        }

        console.log("\nE-mail ou senha invalidos, por favor tente novamente.");
    }

    adicionarQuarto() {
        console.log("\n--- Cadastro de Quarto ---");
        let IDQuarto = this.quartos.length + 1;
        const quantidadeDeCamas = parseInt(readlineSync.question("Quantidade de camas: "));
        const precoPorNoite = parseFloat(readlineSync.question("Preco por noite: "));
        const nome = readlineSync.question("Insira nome do quarto: ");
        const descricao = readlineSync.question("Descricao: ");
        const ocupado = 0;

        const novoQuarto = new Quarto(IDQuarto, quantidadeDeCamas, precoPorNoite,  nome, descricao, ocupado);
        this.quartos.push(novoQuarto);
        console.log("Quarto cadastrado com sucesso");
    }
    
    cadastrarCliente() {
        console.log("\n--- Cadastro de Cliente ---");
        let IDCliente = this.clientes.length + 1;
        const nome = readlineSync.question("Nome: ");
        const dataNascimento = readlineSync.question("Data de Nascimento (YYYY-MM-DD): ");
        const cpf = readlineSync.question("Insira seu CPF: ");
        const email = readlineSync.question("E-mail: ");
        const senha = readlineSync.question("Senha: ");

        const funcionario_existente = this.funcionarios.find(user => user.email === email); 
        const cliente_existente = this.clientes.find(user => user.email === email);

//condicional impede que duas contas em categorias diferentes sejam criadas usando o mesmo endereço de e-mail

        if (funcionario_existente || cliente_existente){
            return console.log("\nEste endereço de e-mail já está sendo utilizado. Deseja cadastrar outro?")
        }


        const novoCliente = new Cliente(IDCliente, dataNascimento, nome,  cpf, email, senha);
        this.clientes.push(novoCliente);
        console.log("\nCliente cadastrado com sucesso");
    }

    cadastrarFuncionario(){
        console.log("\n--- Cadastro de funcionário ---");
        let IDFuncionario = this.funcionarios.length + 1;
        const nome = readlineSync.question("Seu nome: ");
        const cpf = readlineSync.question("Insira seu CPF: ");
        const email = readlineSync.question("E-mail: ");
        const senha = readlineSync.question("Senha: ");

        const funcionario_existente = this.funcionarios.find(user => user.email === email); 
        const cliente_existente = this.clientes.find(user => user.email === email);

//condicional impede que duas contas em categorias diferentes sejam criadas usando o mesmo endereço de e-mail

        if (funcionario_existente || cliente_existente){
            return console.log("\nEste endereço de e-mail já está sendo utilizado. Deseja cadastrar outro?")
        }

        
        const novoFuncionario = new Funcionario(IDFuncionario, nome, cpf, email, senha);
        this.funcionarios.push(novoFuncionario);
        console.log("\nFuncionário cadastrado com sucesso");

    }
    gerenciamentoDeQuartos(){
        console.log("\n--- Camas disponiveis no momento ---");
        
    }

    listaDeClientes() {
        console.log(this.clientes);
    }
}

// Iniciar sistema
const sistema = new Sistema();
sistema.iniciar();