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
            convidados: {},
            eventosSearch: {}
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
    $.ajax({
        url: app.data.BASE_URL + "search",
        type: 'GET',
        data: {
            input: input
        },
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function (data) {
            app.data.eventosSearch = JSON.parse(JSON.stringify(data));
            var encontrou = false;
            app.data.eventosSearch.forEach(function (evento) {
                app.$("#searchresults").empty().html(resultadoPesquisa(evento));
                encontrou = true;
            });
            if (!encontrou) {
                app.dialog.alert("Sem resultados.");
            }
        },
        error: function (request, textStatus, errorThrown) {
            alert(errorThrown + ' Status: ' + textStatus);
        }
    });
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

function cadastraAviso(idEvento) {
    if ($('#assuntoAviso').val() == '' || $('#descrAviso').val() == '') {
        app.dialog.alert("ATENÇÃO: o aviso não foi cadastrado pois estava incompleto.");
    } else {
        $.ajax({
            url: app.data.BASE_URL + "aviso",
            type: 'GET',
            data: {
                idEvento: idEvento,
                assunto: $('#assuntoAviso').val(),
                descricao: $('#descrAviso').val()
            },
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (data) {
                app.dialog.alert("Aviso cadastrado com sucesso!");
            },
            error: function (request, textStatus, errorThrown) {
                alert(errorThrown + ' Status: ' + textStatus);
            }
        });
    }
}

function cadastraConvidado(idEvento) {
    if ($('#nomeConvidado').val() == '' || $('#emailConvidado').val() == '' || $('#cpfConvidado').val() == '') {
        app.dialog.alert("ATENÇÃO: o convidado não foi cadastrado pois estava incompleto.");
    } else {
        $.ajax({
            url: app.data.BASE_URL + "novoConvidado",
            type: 'GET',
            data: {
                idEvento: idEvento,
                nome: $('#nomeConvidado').val(),
                email: $('#emailConvidado').val(),
                cpf: $('#cpfConvidado').val()
            },
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (data) {
                if (JSON.stringify(data) == 'false') {
                    app.dialog.alert("ATENÇÃO: o convidado não foi cadastrado pois o email e/ou cpf já existem.");
                } else {
                    app.dialog.alert("Convidado cadastrado com sucesso!");
                    listaConvidados(idEvento)
                }
            },
            error: function (request, textStatus, errorThrown) {
                alert(errorThrown + ' Status: ' + textStatus);
            }
        });
    }
}

function atualizaUsuario(idUsuario) {
    if ($('#checkBox').prop('checked')) {
        if ($('#numMatricula').val() == '' || $('#curso').val() == '' || $('#instituicao').val() == '') {
            app.dialog.alert("Preencha os dados de estudante antes de salvar.");
        } else {
            //ajax para atualizar os dados cadastrais do usuário
            $.ajax({
                url: app.data.BASE_URL + "atualizar",
                type: 'GET',
                data: {
                    idUsuario: idUsuario,
                    nome: $('#nomeUsuario').val(),
                    rg: $('#rgUsuario').val(),
                    telefone: $('#telefoneUsuario').val(),
                    endereco: $('#enderecoUsuario').val(),
                    estudante: 'S',
                    numMatricula: $('#numMatricula').val(),
                    curso: $('#curso').val(),
                    instituicao: $('#instituicao').val()
                },
                contentType: 'application/json',
                dataType: 'jsonp',
                success: function (data) {
                    app.dialog.alert("Dados atualizados com sucesso!");
                },
                error: function (request, textStatus, errorThrown) {
                    alert(errorThrown + ' Status: ' + textStatus);
                }
            });
        }
    } else {
        $('#numMatricula').val('');
        $('#curso').val('');
        $('#instituicao').val('');
        $.ajax({
            url: app.data.BASE_URL + "atualizar",
            type: 'GET',
            data: {
                idUsuario: idUsuario,
                nome: $('#nomeUsuario').val(),
                rg: $('#rgUsuario').val(),
                telefone: $('#telefoneUsuario').val(),
                endereco: $('#enderecoUsuario').val(),
                estudante: 'N',
                numMatricula: '',
                curso: '',
                instituicao: ''
            },
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (data) {
                app.dialog.alert("Dados atualizados com sucesso!");
            },
            error: function (request, textStatus, errorThrown) {
                alert(errorThrown + ' Status: ' + textStatus);
            }
        });
    }
}

function scanQR() {
    cordova.plugins.barcodeScanner.scan(
            function (result) {
                if (!result.cancelled)
                {
                    if (result.format === "QR_CODE")
                    {
                        navigator.notification.prompt("Please enter name of data", function (input) {
                            var name = input.input1;
                            var value = result.text;

                            var data = localStorage.getItem("LocalData");
                            console.log(data);
                            data = JSON.parse(data);
                            data[data.length] = [name, value];

                            localStorage.setItem("LocalData", JSON.stringify(data));

                            alert("Done");
                        });
                    }
                }
            },
            function (error) {
                alert("Scanning failed: " + error);
            }
    );
}

function montaTabela() {
    $("table#allTable tbody").empty();

    var data = localStorage.getItem("LocalData");
    console.log(data);
    data = JSON.parse(data);

    var html = "";

    for (var count = 0; count < data.length; count++)
    {
        html = html + "<tr><td>" + data[count][0] + "</td><td><a href='javascript:openURL(\"" + data[count][1] + "\")'>" + data[count][1] + "</a></td></tr>";
    }

    $("table#allTable tbody").append(html).closest("table#allTable").table("refresh").trigger("create");
}

function openURL(url) {
    window.open(url, '_blank', 'location=yes');
}

function logout() {
    window.location.reload();
}