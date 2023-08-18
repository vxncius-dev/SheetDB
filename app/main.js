const copyButtons = document.querySelectorAll('.copy');
copyButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        const codeBlock = this.nextElementSibling;
        const codeText = codeBlock.textContent;
        const textarea = document.createElement('textarea');
        textarea.value = codeText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Código copiado para a área de transferência!');
    });
});

const urlSmall = document.querySelector('#url');

function copyLink() {
    const textToCopy = urlSmall.textContent;
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Link copiado para a área de transferência!');
};

const radioButtons = document.querySelectorAll('input[name="passos"]');
radioButtons.forEach(radioBtn => {
    radioBtn.addEventListener('input', () => {
        if (radioBtn.checked) {
            const targetId = radioBtn.getAttribute('id').replace('passo', 'step');
            const targetDiv = document.querySelector(`.${targetId}`);
            if (targetDiv) { targetDiv.scrollIntoView({ behavior: 'smooth' })}
        }
    });
});

const urlApi = document.getElementById("url").textContent;
const responseContainer = document.getElementById('responseContainer');
function getData() {
    fetch(urlApi)
        .then(response => response.json())
        .then(data => {
            responseContainer.innerHTML = '';
            const preElement = document.createElement('pre');
            preElement.classList.add("preE");
            preElement.textContent = JSON.stringify(data, null, 2);
            responseContainer.appendChild(preElement);
            document.querySelector(".preE").innerHTML += `<span class="material-icons closeGet">backspace</span>`;
            document.querySelector(".closeGet").addEventListener("click", () => {
            document.querySelector(".preE").remove();
            })
        })
        .catch(error => {
            console.error('Erro ao obter dados:', error);
            responseContainer.innerHTML = 'Ocorreu um erro ao obter os dados.';
        });
};
getData();

const form = document.getElementById("postDataForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData();
    const parsedData = JSON.stringify({
        "list": [{
            id: (new Date().getTime()).toString(),
            name: document.getElementById("name").value,
            email: document.getElementById("email").value
        }]
    })
    formData.append("data", parsedData);
    fetch(urlApi, {
        method: "POST",
        body: formData
    })
        .then((response) => response.text())
        .then((result) => { alert(result); getData() })
        .catch((error) => console.error("Erro:", error));
});
