// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app = new Framework7({
    root: '#app', // App root element
    id: 'io.framework7.spgemobile', // App bundle ID
    name: 'SPGE Mobile', // App name
    theme: 'auto', // Automatic theme detection
    // App root data
    data: function () {
        return {
            BASE_URL: 'http://192.168.0.28:8080/spge/webresources/usuario/',
            user: {},
            eventos: {},
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

$$('#formLogin').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        url: app.data.BASE_URL + "validar",
        type: 'GET',
        data: {
            email: $('#email').val(),
            senha: $('#senha').val()
        },
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function (data) {
            if (data === null) {
                app.dialog.alert("Os dados inseridos não foram encontrados.");
            } else {
                app.data.user = JSON.parse(JSON.stringify(data));
                if (app.data.user.estudante === 'S') {
                    app.data.user.estudante = true;
                } else {
                    app.data.user.estudante = false;
                }

                $.ajax({
                    url: app.data.BASE_URL + "eventos",
                    type: 'GET',
                    data: {
                        idUsuario: app.data.user.idUsuario
                    },
                    contentType: 'application/json',
                    dataType: 'jsonp',
                    success: function (data) {
                        app.data.eventos = JSON.parse(JSON.stringify(data));
                        app.data.eventos.forEach(function (evento) {
                            if (evento.evento.idUsuario === app.data.user.idUsuario) {
                                evento.evento.idUsuario = true;
                            } else {
                                //ajax
                                evento.evento.idUsuario = false;
                            }
                        });
                        var eventosView = app.views.create('#view-eventos', {
                            url: '/eventos/'
                        });
                        var perfilView = app.views.create('#view-perfil', {
                            url: '/perfil/'
                        });

                        document.getElementById("tabbar").style.visibility = "visible";
                        app.router.navigate('/eventos/');
                    },
                    error: function (request, textStatus, errorThrown) {
                        alert(errorThrown + ' Status: ' + textStatus);
                    }
                });
            }
        },
        error: function (request, textStatus, errorThrown) {
            alert(errorThrown + ' Status: ' + textStatus);
        }
    });
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

function logout() {
    window.location.reload();
}