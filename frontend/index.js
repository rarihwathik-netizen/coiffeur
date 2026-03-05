document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const sidebar = document.getElementById("sidebar");
  const closeBtn = document.getElementById("close");

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
});
