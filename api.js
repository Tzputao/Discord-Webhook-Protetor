/**********************************************************
* ODIFICADO POR: TZ | https://instagram.com/tzfofo
 *********************************************************/

const express = require('express'),
totp = require("totp-generator"),
axios = require('axios');

const webhook = "" //sua webhook
const pass32 = "K4ZVUQTSIRMDOWKRGU2WQQTZJM======" //uma chave codificada em base32, consulte https://github.com/bellstrand/totp-generator#how-to-use para mais
const port = process.env.PORT || 3000; //porta

function denied(res) {
    res.status(403);
    res.send('fuck you kid, your adopted'); //mensagem de acesso negado
}

const api = express();
api.use(express.json());
api.use(express.urlencoded({ extended: false }));
api.listen(port, () => { console.log(`Api up and running`) });

api.post('/', (req, res) => {
    if (!req.headers)  {
        denied(res);
    }
    var auth = req.headers['authorization'];
    if (auth && auth === totp(pass32)) { //verifique se a autorização é igual à nossa senha temporária de uso único
        axios.post(webhook, req.body) //envie para a nossa webhook
        .catch(function (error) {
          console.log(error);
        });
        res.send('done');
    } else {
        denied(res);
    }
});