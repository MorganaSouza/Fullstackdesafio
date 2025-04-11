document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('fertilizerModal');
    const addBtn = document.getElementById('addFertilizerBtn');
    const closeBtn = modal.querySelector('.close');
    const form = document.getElementById('fertilizerForm');
    const table = document.getElementById('fertilizersTable').querySelector('tbody');
    let editId = null;

    // Carrega todos os fertilizantes
    const loadFertilizers = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/fertilizers');
            const data = await res.json();
            table.innerHTML = '';

            data.forEach(fertilizer => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${fertilizer.name}</td>
                    <td>${fertilizer.type}</td>
                    <td>${fertilizer.amount}</td>
                    <td>${new Date(fertilizer.applyDate).toLocaleDateString()}</td>
                    <td>
                        <button onclick="editFertilizer('${fertilizer._id}')">Editar</button>
                        <button onclick="deleteFertilizer('${fertilizer._id}')">Excluir</button>
                    </td>
                `;
                table.appendChild(row);
            });
        } catch (error) {
            console.error('Erro ao carregar fertilizantes:', error);
        }
    };

    // Abrir modal para adicionar
    addBtn.onclick = () => {
        editId = null;
        form.reset();
        document.getElementById('modalTitleFertilizer').textContent = 'Adicionar Fertilizante';
        modal.style.display = 'block';
    };

    // Fechar modal
    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = e => {
        if (e.target == modal) modal.style.display = 'none';
    };

    // Enviar formulário (criar ou editar)
    form.onsubmit = async (e) => {
        e.preventDefault();

        const fertilizer = {
            name: form.name.value,
            type: form.type.value,
            amount: parseFloat(form.amount.value),
            applyDate: form.applyDate.value
        };

        const url = editId
            ? `http://localhost:3000/api/fertilizers/${editId}`
            : 'http://localhost:3000/api/fertilizers';
        const method = editId ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fertilizer)
            });

            if (!res.ok) throw new Error('Erro ao salvar fertilizante');

            modal.style.display = 'none';
            loadFertilizers();
        } catch (error) {
            console.error(error);
            alert('Erro ao salvar o fertilizante. Verifique os dados e tente novamente.');
        }
    };

    // Editar fertilizante (preenche o formulário)
    window.editFertilizer = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/fertilizers/${id}`);
            const data = await res.json();

            form.name.value = data.name;
            form.type.value = data.type;
            form.amount.value = data.amount;
            form.applyDate.value = data.applyDate.split('T')[0];

            document.getElementById('modalTitleFertilizer').textContent = 'Editar Fertilizante';
            editId = id;
            modal.style.display = 'block';
        } catch (error) {
            console.error('Erro ao buscar fertilizante:', error);
        }
    };

    // Excluir fertilizante
    window.deleteFertilizer = async (id) => {
        if (confirm('Deseja realmente excluir este fertilizante?')) {
            try {
                const res = await fetch(`http://localhost:3000/api/fertilizers/${id}`, {
                    method: 'DELETE'
                });

                if (!res.ok) throw new Error('Erro ao excluir fertilizante');

                loadFertilizers();
            } catch (error) {
                console.error('Erro ao excluir:', error);
                alert('Erro ao excluir fertilizante. Tente novamente.');
            }
        }
    };

    loadFertilizers();
});
