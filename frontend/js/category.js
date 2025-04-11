document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('categoryModal');
    const addBtn = document.getElementById('addCategoryBtn');
    const closeBtn = modal.querySelector('.close');
    const form = document.getElementById('categoryForm');
    const table = document.getElementById('categoriesTable').querySelector('tbody');
    let editId = null;

    const loadCategories = async () => {
        const res = await fetch('http://localhost:3000/api/categories');
        const data = await res.json();
        table.innerHTML = '';
        data.forEach(category => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${category.name}</td>
                <td>${category.type}</td>
                <td>${category.growthPhase}</td>
                <td>${category.season}</td>
                <td>
                    <button onclick="editCategory('${category._id}')">Editar</button>
                    <button onclick="deleteCategory('${category._id}')">Excluir</button>
                </td>
            `;
            table.appendChild(row);
        });
    };

    addBtn.onclick = () => {
        editId = null;
        form.reset();
        document.getElementById('modalTitleCategory').textContent = 'Adicionar Categoria';
        modal.style.display = 'block';
    };

    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = e => { if (e.target == modal) modal.style.display = 'none'; };

    form.onsubmit = async (e) => {
        e.preventDefault();
        const category = {
            name: form.name.value,
            type: form.type.value,
            growthPhase: form.growthPhase.value,
            season: form.season.value
        };

        const url = editId
            ? `http://localhost:3000/api/categories/${editId}`
            : 'http://localhost:3000/api/categories';
        const method = editId ? 'PUT' : 'POST';

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(category)
        });

        modal.style.display = 'none';
        loadCategories();
    };

    window.editCategory = async (id) => {
        const res = await fetch(`http://localhost:3000/api/categories/${id}`);
        const data = await res.json();
        form.name.value = data.name;
        form.type.value = data.type;
        form.growthPhase.value = data.growthPhase;
        form.season.value = data.season;
        document.getElementById('modalTitleCategory').textContent = 'Editar Categoria';
        editId = id;
        modal.style.display = 'block';
    };

    window.deleteCategory = async (id) => {
        if (confirm('Deseja realmente excluir esta categoria?')) {
            await fetch(`http://localhost:3000/api/categories/${id}`, { method: 'DELETE' });
            loadCategories();
        }
    };

    loadCategories();
});
