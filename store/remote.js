const bodyParser = require('body-parser');
const request = require('request');

function createRemoteDB(host, port) {
    const URL = 'http://' + host + ':' + port;

    function list(table) {
        return request('GET', table);
    }

    function get(table, id) {
        return request('GET', table, id);
    }

    //function upsert(table, data)

    //function query(table, query, join)

    function req(method, table, data) {
        let url = URL + '/' + table;
        body = '';

        return new Promise((resolve, reject) => {
            request({
                method,
                headers: {
                    'content-type': 'application/json',
                },
                url,
                body,
            }, (err, req, body) => {
                if (err) {
                    console.error('Error con la base de datos remota', err);
                    return reject(err.message);
                }

                const resp = JSON.parse(body);

                return resolve(resp.body);
            })
        })
    }

    return {
        list,
        get,
    }
}

module.exports = createRemoteDB;