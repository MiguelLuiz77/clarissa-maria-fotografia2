# Clarissa Maria Fotografia

Site estático inicial criado a partir da spec visual do projeto “Site Clarissa”.

## Abrir

Abra `index.html` em um navegador. Para uma prévia local com recursos completos, use qualquer servidor estático na pasta do site, por exemplo:

```powershell
cd "outputs/site-clarissa"
node -e "const http=require('http'),fs=require('fs'),path=require('path');const root=process.cwd();const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.jpg':'image/jpeg'};http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p==='/')p='/index.html';let f=path.join(root,p);fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);return r.end('Not found')}r.writeHead(200,{'Content-Type':types[path.extname(f)]||'application/octet-stream'});r.end(d)})}).listen(4173,()=>console.log('http://127.0.0.1:4173'))"
```

## Acervo usado

O site usa somente as fotografias e imagens de identidade enviadas pelo cliente:

- `assets/ensaio-casal-novo.jpg` — Ensaio de casal
- `assets/casamento.jpg`
- `assets/ensaio-gestante.jpg`
- `assets/smash-the-cake.jpg`
- `assets/ensaios-individuais.jpg`
- `assets/ensaio-newborn.jpg`
- `assets/ensaio-familia.jpg`
- `assets/ensaio-formandos.jpg`
- `assets/fotografa-clarissa.jpg`

Não há imagens de banco, imagens geradas ou imagens da referência no pacote. A foto da fotógrafa aparece exclusivamente na seção “Sobre”. O logo “Clarear Wedding” foi removido da interface do site.

## Galerias

Cada card da seção “Mais tipos de ensaio” abre uma galeria própria com setas, miniaturas, contador e fechamento pelo botão, clique fora ou tecla `Esc`:

- Ensaio de casal — 4 fotos
- Casamento — 4 fotos
- Ensaio de gestante — 4 fotos
- Smash the cake — 5 fotos
- Ensaios individuais — 4 fotos
- Ensaio newborn — 4 fotos
- Ensaio de família — 4 fotos
- Ensaio de formandos — 4 fotos

As galerias usam somente as fotos enviadas pelo cliente. As imagens adicionais ficam na pasta `assets/` com nomes agrupados por ensaio.

## Contato

O botão de agendamento abre o WhatsApp `+55 12 98117-4527` com uma mensagem inicial para marcar o ensaio.

O botão “Instagram da fotógrafa” aponta diretamente para [@clarear_wedding](https://www.instagram.com/clarear_wedding?stkn=MWtoZW1kbWw0cG1udw==).
