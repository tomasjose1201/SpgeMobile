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
            convidados: {}
        };
    },
    // App root methods
    methods: {},
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
                                //ajax para buscar nome do organizador
                                $.ajax({
                                    url: app.data.BASE_URL + "nomeOrganizador",
                                    type: 'GET',
                                    data: {
                                        idUsuario: evento.evento.idUsuario
                                    },
                                    contentType: 'application/json',
                                    dataType: 'jsonp',
                                    success: function (data) {
                                        evento.evento.idUsuario = JSON.parse(JSON.stringify(data));
                                    },
                                    error: function (request, textStatus, errorThrown) {
                                        alert(errorThrown + ' Status: ' + textStatus);
                                    }
                                });
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

function listaConvidados(idEvento) {
    $.ajax({
        url: app.data.BASE_URL + "convidados",
        type: 'GET',
        data: {
            idEvento: idEvento
        },
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function (data) {
            app.data.convidados = JSON.parse(JSON.stringify(data));
            app.data.convidados.forEach(function (convidado) {
                if (convidado.statusPresenca === 'P') {
                    convidado.statusPresenca = true;
                } else {
                    convidado.statusPresenca = false;
                }
                $.ajax({
                    url: app.data.BASE_URL + "convidadoCpf",
                    type: 'GET',
                    data: {
                        idUsuario: convidado.convidado.idUsuario
                    },
                    contentType: 'application/json',
                    dataType: 'jsonp',
                    success: function (data) {
                        convidado.convidado.email = JSON.parse(JSON.stringify(data));
                    },
                    error: function (request, textStatus, errorThrown) {
                        alert(errorThrown + ' Status: ' + textStatus);
                    }
                });
            });
        },
        error: function (request, textStatus, errorThrown) {
            alert(errorThrown + ' Status: ' + textStatus);
        }
    });
}

function presencaConvidado(idConvidado, idEvento) {
    $.ajax({
        url: app.data.BASE_URL + "presencaConvidado",
        type: 'GET',
        data: {
            idConvidado: idConvidado,
            idEvento: idEvento,
            statusPresenca: 'P'
        },
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function (data) {
            listaConvidados(idEvento)
        },
        error: function (request, textStatus, errorThrown) {
            alert(errorThrown + ' Status: ' + textStatus);
        }
    });
}

function logout() {
    window.location.reload();
}