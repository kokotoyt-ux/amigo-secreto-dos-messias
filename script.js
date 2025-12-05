let participants = [];

function addParticipant() {
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!name || !phone) {
        alert("Preencha nome e telefone!");
        return;
    }

    participants.push({ name, phone });

    updateList();
    nameInput.value = "";
    phoneInput.value = "";
}

function updateList() {
    const list = document.getElementById("participantList");
    list.innerHTML = "";

    participants.forEach(p => {
        const li = document.createElement("li");
        li.textContent = `${p.name} — ${p.phone}`;
        list.appendChild(li);
    });
}

function sortSecretSanta() {
    if (participants.length < 2) {
        alert("Adicione pelo menos 2 participantes!");
        return;
    }

    let shuffled = [...participants];

    // Embaralhar
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Garantir que ninguém pegue ele mesmo
    for (let i = 0; i < shuffled.length; i++) {
        if (shuffled[i].name === participants[i].name) {
            return sortSecretSanta(); // refaz se der conflito
        }
    }

    const result = document.getElementById("result");
    result.innerHTML = "";

    for (let i = 0; i < participants.length; i++) {
        const giver = participants[i];
        const receiver = shuffled[i];

        const div = document.createElement("div");
        div.classList.add("result-box");
        div.innerHTML = `<strong>${giver.name}</strong> tirou <strong>${receiver.name}</strong>`;
        result.appendChild(div);

        // Aqui você pode ativar envio por WhatsApp futuramente
        // const msg = `Olá ${giver.name}! Você tirou ${receiver.name} no amigo secreto!`;
        // window.open(`https://wa.me/55${giver.phone}?text=${encodeURIComponent(msg)}`);
    }
}
