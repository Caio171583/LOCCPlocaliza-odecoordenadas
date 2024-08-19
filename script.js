async function buscar() {
    const cp = document.getElementById('cp').value;
    const cs = document.getElementById('cs').value;

    if (!cp || !cs) {
        document.getElementById('resultado').innerHTML = 'Por favor, preencha ambos os campos.';
        return;
    }

    try {
        const data = await loadData();
        // Filtra os dados com base nos valores de CP e CS
        const items = data.filter(d => d.cp === parseInt(cp) && d.cs === parseInt(cs));

        if (items.length > 0) {
            // Cria uma lista de links para o Google Maps para todos os itens encontrados
            const links = items.map(item => {
                const [latitude, longitude] = item["Latitude e Longitude"].split(',').map(coord => coord.trim());
                return `<a href="https://www.google.com/maps?q=${latitude},${longitude}" target="_blank">Abrir no Google Maps (${latitude}, ${longitude})</a>`;
            }).join('<br>'); // Junta os links com quebra de linha

            document.getElementById('resultado').innerHTML = links;
        } else {
            document.getElementById('resultado').innerHTML = 'CP e/ou CS não encontrados.';
        }
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        document.getElementById('resultado').innerHTML = 'Erro ao buscar dados. Verifique o console para detalhes.';
    }
}

async function loadData() {
    try {
        const response = await fetch('coordenadas.json'); // Certifique-se de que o caminho está correto
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data["Sheet1"]; // Ajuste para acessar a chave correta no JSON
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        throw error;
    }
}
