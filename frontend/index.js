document.addEventListener("DOMContentLoaded", () => {
  // Base URL API — remplacer par l'URL de votre backend en production
  const API_BASE = "https://moncoiffeur.onrender.com";

  const menuBtn = document.getElementById("menu-btn");
  const sidebar = document.getElementById("sidebar");
  const closeBtn = document.getElementById("close");

  const loginForm = document.getElementById("form-login");
  const rdvForm = document.getElementById("form-rdv");

  // SIDEBAR
  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  if (closeBtn && sidebar) {
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      sidebar.classList.remove("open");
    });
  }

  // LOGIN
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch(`${API_BASE}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("adminToken", data.token);
          window.location.href = "dashbord.html";
        } else {
          alert(data.message || "Erreur de connexion");
        }
      } catch (err) {
        console.error(err);
        alert("Erreur réseau");
      }
    });
  }

  // RENDEZ-VOUS
  if (rdvForm) {
    rdvForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nom = document.getElementById("nom").value;
      const prenom = document.getElementById("prenom").value;
      const telephone = document.getElementById("telephone").value;
      const date = document.getElementById("date").value;

      try {
        const response = await fetch(`${API_BASE}/api/rdv`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom,
            prenom,
            telephone,
            date_rdv: date,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Rendez-vous réservé !");
          rdvForm.reset();
        } else {
          alert(data.message || "Erreur réservation");
        }
      } catch (err) {
        console.error(err);
        alert("Erreur réseau");
      }
    });
  }
  // DASHBOARD: charger les réservations si on est sur la page admin
  const reservationTable = document.getElementById("reservation-table");
  if (reservationTable) {
    (async () => {
      const token = localStorage.getItem("adminToken");
      try {
        const response = await fetch(`${API_BASE}/api/rdv`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!response.ok) {
          console.error("Erreur fetch rdv:", response.status);
          if (response.status === 401) {
            window.location.href = "login.html";
          }
          return;
        }

        const json = await response.json();
        const rows = json.data || [];
        rows.forEach((r) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${r.nom || ""}</td>
            <td>${r.prenom || ""}</td>
            <td>${r.date_rdv || ""}</td>
            <td>${r.telephone || ""}</td>
            <td>${r.validated ? "Oui" : "Non"}</td>
          `;
          reservationTable.appendChild(tr);
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }
});
