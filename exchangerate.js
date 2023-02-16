const api_key = 'e16aa43cef5403b9bfa66374';
const url = 'https://v6.exchangerate-api.com/v6/' + api_key;

const ui = new UI();
let code = [];

fetch(url + "/codes")
    .then(res => res.json())
    .then(data => {
        const items = data.supported_codes;
        let options;
        for (let item of items) {
            options += `<option value=${item[0]}>${item[1]}</option>`
            code.push(item[0]);

        }
        ui.list_one.innerHTML = options;
        ui.list_two.innerHTML = options;
    })

ui.calculate.addEventListener("click", function() {
    const currency1 = ui.curreny_one.value;
    const currency2 = ui.curreny_two.value;
    const amnt = ui.amount.value;

    fetch(url + "/latest/" + currency1)
        .then(res => res.json())
        .then(data => {
            result = (data.conversion_rates[currency2] * amnt).toFixed(3);
            ui.result.innerHTML = `
            <div class="card">
                <div class="card-body text-center" style="font-size: 30px;">
                    ${amnt} ${currency1} = ${result} ${currency2}
            </div>
            `;


            let all_results = '';
            for (let other_currency of code) {
                if (other_currency !== currency1 && other_currency !== currency2) {
                    const other_result = (data.conversion_rates[other_currency] * amnt).toFixed(3);
                    all_results += `
                    <ul>
                        <li class="card border-dark">
                            <div class="text-center" style="font-size:12px;">
                                ${amnt} ${currency1} = ${other_result} ${other_currency}
                            </div>
                        </li>
                    </ul>
                    `;
                }
            }
            ui.other_result.innerHTML = all_results;

        })
})