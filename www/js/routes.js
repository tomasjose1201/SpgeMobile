routes = [
  {
    path: '/',
    url: './index.html'
  },
  {
    path: '/eventos/',
    componentUrl: './pages/eventos.html'
  },
  {
    path: '/perfil/',
    url: './pages/perfil.html'
  },
  {
    path: '/details/:id/',
    url: './pages/details.html'
  },
  {
    path: '/qrcode/:id/',
    url: './pages/qrcode.html'
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html'
  }
];
