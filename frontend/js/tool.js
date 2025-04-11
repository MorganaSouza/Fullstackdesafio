document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/api';
    const toolModal = document.getElementById('toolModal');
    const toolForm = document.getElementById('toolForm');
    const addToolBtn = document.getElementById('addToolBtn');
    const modalTitleTool = document.getElementById('modalTitleTool');
    let editToolId = null;

    const loadTools = async () => {
        const response = await fetch(`${apiUrl}/tools`);
        const tools = await response.json();
        const tableBody = document.querySelector('#toolsTable tbody');
        tableBody.innerHTML = '';

        tools.forEach(tool => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${tool.name}</td>
                <td>${tool.type}</td>
                <td>${tool.responsible ? tool.responsible.name : 'N/A'}</td>
                <td>${tool.description}</td>
                <td>
                    <button class="editToolBtn" data-id="${tool._id}">Editar</button>
                    <button class="deleteToolBtn" data-id="${tool._id}">Deletar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        document.querySelectorAll('.editToolBtn').forEach(button => {
            button.addEventListener('click', (e) => openEditToolModal(e.target.dataset.id));
        });

        document.querySelectorAll('.deleteToolBtn').forEach(button => {
            button.addEventListener('click', (e) => deleteTool(e.target.dataset.id));
        });
    };

    const addTool = async (tool) => {
        try {
            const response = await fetch(`${apiUrl}/tools`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tool)
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("Erro ao adicionar ferramenta:", result);
                alert(result.message || "Erro desconhecido ao adicionar ferramenta.");
                return;
            }

            loadTools();
        } catch (error) {
            console.error("Erro de rede:", error);
            alert("Erro de rede ao tentar adicionar ferramenta.");
        }
    };

    const updateTool = async (id, tool) => {
        try {
            const response = await fetch(`${apiUrl}/tools/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tool)
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("Erro ao atualizar ferramenta:", result);
                alert(result.message || "Erro desconhecido ao atualizar.");
                return;
            }

            loadTools();
        } catch (error) {
            console.error("Erro de rede:", error);
            alert("Erro de rede ao tentar atualizar ferramenta.");
        }
    };

    const deleteTool = async (id) => {
        if (!confirm('Deseja realmente excluir esta ferramenta?')) return;

        try {
            await fetch(`${apiUrl}/tools/${id}`, {
                method: 'DELETE'
            });
            loadTools();
        } catch (error) {
            console.error("Erro ao deletar ferramenta:", error);
        }
    };

    const openEditToolModal = async (id) => {
        editToolId = id;
        modalTitleTool.innerText = 'Editar Ferramenta';

        const response = await fetch(`${apiUrl}/tools/${id}`);
        if (response.status === 404) {
            console.error('Ferramenta não encontrada');
            return;
        }

        const tool = await response.json();
        document.getElementById('name').value = tool.name;
        document.getElementById('description').value = tool.description;
        document.getElementById('type').value = tool.type;
        await loadUsers(tool.responsible ? tool.responsible._id : null);

        toolModal.style.display = 'block';
    };

    const openAddToolModal = async () => {
        editToolId = null;
        modalTitleTool.innerText = 'Adicionar Ferramenta';
        toolForm.reset();
        await loadUsers();
        toolModal.style.display = 'block';
    };

    const loadUsers = async (selectedUserId = null) => {
        const response = await fetch(`${apiUrl}/users`);
        const users = await response.json();
        const select = document.getElementById('responsible');
        select.innerHTML = '';

        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user._id;
            option.text = user.name;
            if (user._id === selectedUserId) option.selected = true;
            select.appendChild(option);
        });
    };

    document.querySelector('.close').addEventListener('click', () => {
        toolModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === toolModal) {
            toolModal.style.display = 'none';
        }
    });

    toolForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const toolData = {
            name: document.getElementById('name').value.trim(),
            description: document.getElementById('description').value.trim(),
            type: document.getElementById('type').value.trim(),
            responsible: document.getElementById('responsible').value
        };

        if (!toolData.name || !toolData.description || !toolData.type || !toolData.responsible) {
            alert("Todos os campos são obrigatórios!");
            return;
        }

        console.log("Enviando dados:", toolData);

        if (editToolId) {
            await updateTool(editToolId, toolData);
        } else {
            await addTool(toolData);
        }

        toolModal.style.display = 'none';
        loadTools();
    });

    addToolBtn.addEventListener('click', openAddToolModal);
    loadTools();
});
