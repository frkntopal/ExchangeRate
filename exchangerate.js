const api_key = 'e16aa43cef5403b9bfa66374';
const url = 'https://v6.exchangerate-api.com/v6/' + api_key;

const ui = new UI();


fetch(url + "/codes")
    .then(res => res.json())
    .then(data => {
        const items = data.supported_codes;
        let options;
        for (let item of items) {
            options += `<option value=${item[0]}>${item[1]}</option>`
        }
        ui.list_one.innerHTML = options;
        ui.list_two.innerHTML = options;
    })