// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app = new Framework7({
    root: '#app', // App root element
    id: 'io.framework7.spgemobile', // App bundle ID
    name: 'Framework7', // App name
    theme: 'auto', // Automatic theme detection
    // App root data
    data: function () {
        return {
            user: {
                nome: 'Teste',
                email: 'teste@gmail.com',
                senha: 'teste',
                cpf: '783.754.280-00',
                rg: '11.129.490-3',
                telefone: '(41)999182918',
                endereco: 'Rua Barão do Rio Branco, 213 - Centro',
                numMatricula: 'GRR20118817',
                curso: 'Análise e Desenvolvimento de Sistemas',
                instituicao: 'Universidade Federal do Paraná'
            },
            eventos: [
                {
                    id: '1',
                    nome: 'Semana Acadêmica TADS',
                    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit volutpat velit vitae auctor. In id facilisis lacus. Donec nec quam in dui dapibus feugiat sit amet a elit.',
                    organizador: 'Willian Bontorin',
                    localizacao: 'Av Castro Alves, 13 - Centro, Curitiba, Paraná',
                    dataHoraInicio: '25/10/2018 19:00',
                    dataHoraEncerramento: '29/10/2018 22:00',
                    dataHoraEncerramentoInscricoes: '25/10/2018 12:00',
                    tipoEvento: 'Público',
                    numMaxParticipantes: '500',
                    emiteCertificado: 'Sim',
                    preco: 'Gratuito',
                    website: 'http://example.com/',
                    facebook: 'http://facebook.com/'
                },
                {
                    id: '2',
                    nome: 'Palestra com Dr. Drauzio Varella',
                    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit volutpat velit vitae auctor. In id facilisis lacus. Donec nec quam in dui dapibus feugiat sit amet a elit.',
                    organizador: 'Gabriel Schilichta',
                    localizacao: 'Rua Amazonas, 1780 - Água Verde, Curitiba, Paraná',
                    dataHoraInicio: '20/07/2018 20:00',
                    dataHoraEncerramento: '20/07/2018 22:00',
                    dataHoraEncerramentoInscricoes: '20/07/2018 18:00',
                    tipoEvento: 'Privado',
                    numMaxParticipantes: '50',
                    emiteCertificado: 'Não',
                    preco: 'R$ 35,00',
                    website: 'http://example.com/',
                    facebook: 'http://facebook.com/'
                },
                {
                    id: '3',
                    nome: 'Workshop de HTML5/CSS',
                    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit volutpat velit vitae auctor. In id facilisis lacus. Donec nec quam in dui dapibus feugiat sit amet a elit.',
                    organizador: 'Renan Moreira',
                    localizacao: 'Av João Gualberto, 2001 - Juveve, Curitiba, Paraná',
                    dataHoraInicio: '02/06/2018 10:00',
                    dataHoraEncerramento: '02/06/2018 18:00',
                    dataHoraEncerramentoInscricoes: '01/06/2018 23:59',
                    tipoEvento: 'Privado',
                    numMaxParticipantes: '30',
                    emiteCertificado: 'Sim',
                    preco: 'R$ 29,90',
                    website: 'http://example.com/',
                    facebook: 'http://facebook.com/'
                }
            ],
            convidados: [
                {
                    id: '1',
                    nome: 'Wesley Maffazzolli',
                    cpf: '095.161.329-44',
                    rg: '13.103.736-8',
                    estudante: 'S',
                    numMatricula: 'GRR20155124',
                    curso: 'Tecnologia em Análise e Desenvolvimento de Sistemas',
                    instituticao: 'UFPR',
                    status: true
                },
                {
                    id: '2',
                    nome: 'Tomás José Alves',
                    cpf: '593.643.799-00',
                    rg: '30.592.877-6',
                    estudante: 'S',
                    numMatricula: 'GRR20157324',
                    curso: 'Tecnologia em Análise e Desenvolvimento de Sistemas',
                    instituticao: 'UFPR',
                    status: false
                },
                {
                    id: '3',
                    nome: 'Lucas Falcão da TI',
                    cpf: '044.839.490-12',
                    rg: '21.402.731-4',
                    estudante: 'S',
                    numMatricula: 'GRR20152525',
                    curso: 'Tecnologia em Análise e Desenvolvimento de Sistemas',
                    instituticao: 'UFPR',
                    status: false
                },
                {
                    id: '4',
                    nome: 'Montanha',
                    cpf: '529.518.880-90',
                    rg: '29.992.605-9',
                    estudante: 'S',
                    numMatricula: 'GRR20152525',
                    curso: 'Administração',
                    instituticao: 'PUCPR',
                    status: true
                },
            ]
        };
    },
    // App root methods
    methods: {
        helloWorld: function () {
            app.dialog.alert('Hello World!');
        }
    },
    // App routes
    routes: routes
});

// Init/Create views
var loginView = app.views.create('#view-login', {
    url: '/'
});
var eventosView = app.views.create('#view-eventos', {
    url: '/eventos/'
});
var perfilView = app.views.create('#view-perfil', {
    url: '/perfil/'
});

var resultadoPesquisa = app.t7.compile(app.$('#itemlist').html());

function searchEvento(input) {
    var encontrou = false;
    app.data.eventos.forEach(function (evento) {
        if (evento.nome.toUpperCase().includes(input.toUpperCase())) {
            app.$("#searchresults").empty().html(resultadoPesquisa(evento));
            encontrou = true;
        }
    });
    if (!encontrou) {
        app.dialog.alert("Sem resultados.");
    }
}

$$('#formLogin').on('submit', function (e) {
    e.preventDefault();
    /*document.getElementById("tabbar").style.visibility = "visible";
     app.router.navigate('/eventos/');*/
    $.ajax({
        url: "http://192.168.0.182:8080/spge/webresources/usuario/validar/",
        type: 'GET',
        data: {
            idEvento: $('#email').val(),
            idConvidado: $('#senha').val()
        },
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function (data) {
            alert("Sucesso");
        },
        error: function (request, textStatus, errorThrown) {
            alert(request.status + ', Error: ' + textStatus);
        }
    });
});

var popupListaConvidados;
$(document).ready(function () {
    $$('#botaoListaConvidados').on('click', function (e) {
        console.log("Estou aqui dentro do evento de clique do botão!");
        popupListaConvidados = app.popup.create({
            content: '<div class="popup">...</div>',
            on: {
                opened: function () {
                    console.log('Popup opened')
                }
            }
        })
    });
});



function formLoginToJSON() {
    return JSON.stringify({
        "email": $('#email').val(),
        "senha": $('#senha').val()
    });
}

function logout() {
    window.location.reload();
}