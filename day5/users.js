const loadBtn = document.getElementById("load-users");
const filterInput = document.getElementById("filter-input");
const status = document.getElementById("status");
const usersList = document.getElementById("users-list");

let users = [];

function renderUsers(list) {
  usersList.innerHTML = "";
  if (list.length === 0) {
    status.textContent = "No users match your filter.";
    return;
  }
  status.textContent = `Showing ${list.length} users.`;
  list.forEach(user => {
    const li = document.createElement("li");
    li.textContent = `${user.name} — ${user.email} — ${user.address.city} — ${user.company.name}`;
    usersList.appendChild(li);
  });
}

async function loadUsers() {
  loadBtn.disabled = true;
  status.textContent = "Loading users...";
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    users = await response.json();
    status.textContent = "Users loaded successfully.";
    renderUsers(users);
  } catch (err) {
    status.textContent = `Error loading users: ${err.message}`;
  } finally {
    loadBtn.disabled = false;
  }
}

loadBtn.addEventListener("click", loadUsers);

filterInput.addEventListener("input", () => {
  const term = filterInput.value.toLowerCase();
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(term)
  );
  renderUsers(filtered);
});
