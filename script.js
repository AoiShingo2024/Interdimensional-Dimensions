
// ======================================
// BASE DE DATOS DE EQUIPOS
// ======================================

const teams = [

    {
        id: 1,
        name: "Equipo de prueba 1",
        country: "🇯🇵 Japón",
        category: "japon",
        description: "Descripción del primer equipo de anime.",
        banner: "img/banners/equipo1.jpg",
        logo: "img/logos/equipo1.png",

        players: [
            {
                name: "Jugador 1",
                number: 10,
                position: "DEL",
                image: "img/jugadores/jugador1.png"
            },
            {
                name: "Jugador 2",
                number: 7,
                position: "MED",
                image: "img/jugadores/jugador2.png"
            },
            {
                name: "Jugador 3",
                number: 1,
                position: "POR",
                image: "img/jugadores/jugador3.png"
            }
        ]
    },

    {
        id: 2,
        name: "Equipo de prueba 2",
        country: "🌍 Internacional",
        category: "internacional",
        description: "Descripción del segundo equipo de anime.",
        banner: "img/banners/equipo2.jpg",
        logo: "img/logos/equipo2.png",

        players: [
            {
                name: "Jugador 4",
                number: 9,
                position: "DEL",
                image: "img/jugadores/jugador4.png"
            },
            {
                name: "Jugador 5",
                number: 8,
                position: "MED",
                image: "img/jugadores/jugador5.png"
            }
        ]
    },

    {
        id: 3,
        name: "Equipo de prueba 3",
        country: "🌎 Otros",
        category: "otros",
        description: "Descripción del tercer equipo de anime.",
        banner: "img/banners/equipo3.jpg",
        logo: "img/logos/equipo3.png",

        players: [
            {
                name: "Jugador 6",
                number: 11,
                position: "DEL",
                image: "img/jugadores/jugador6.png"
            }
        ]
    }

];

// ======================================
// ELEMENTOS HTML
// ======================================

const teamsGrid = document.getElementById("teamsGrid");
const teamCount = document.getElementById("teamCount");
const visibleCount = document.getElementById("visibleCount");
const emptyMessage = document.getElementById("emptyMessage");

const modal = document.getElementById("teamModal");
const modalClose = document.getElementById("modalClose");

const modalLogo = document.getElementById("modalLogo");
const modalName = document.getElementById("modalName");
const modalCountry = document.getElementById("modalCountry");
const rosterGrid = document.getElementById("rosterGrid");

const menuToggle = document.getElementById("menuToggle");
const navbar = document.querySelector(".navbar");

// ======================================
// MOSTRAR EQUIPOS
// ======================================

function renderTeams(category = "todos") {

    teamsGrid.innerHTML = "";

    const filteredTeams = category === "todos"
        ? teams
        : teams.filter(team => team.category === category);

    teamCount.textContent = String(teams.length).padStart(2, "0");

    visibleCount.textContent = String(filteredTeams.length).padStart(2, "0");

    emptyMessage.style.display =
        filteredTeams.length === 0 ? "block" : "none";

    filteredTeams.forEach(team => {

        const card = document.createElement("article");

        card.className = "team-card";

        card.innerHTML = `

            <div class="team-banner">

                <img
                    src="${team.banner}"
                    alt="Banner de ${team.name}"
                    onerror="this.style.display='none'"
                >

                <img
                    class="team-logo"
                    src="${team.logo}"
                    alt="Escudo de ${team.name}"
                    onerror="this.src='https://placehold.co/100x100/172438/ffffff?text=TEAM'"
                >

            </div>

            <div class="team-info">

                <span class="team-category">
                    ${team.category.toUpperCase()}
                </span>

                <h3>${team.name}</h3>

                <p>${team.description}</p>

                <div class="team-footer">

                    <span class="team-country">
                        ${team.country}
                    </span>

                    <button
                        class="view-team"
                        data-team-id="${team.id}"
                    >
                        VER PLANTILLA →
                    </button>

                </div>

            </div>

        `;

        teamsGrid.appendChild(card);

    });

}

// ======================================
// FILTRAR EQUIPOS
// ======================================

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.filter;

        renderTeams(category);

    });

});

// ======================================
// ABRIR PLANTILLA
// ======================================

teamsGrid.addEventListener("click", event => {

    const button = event.target.closest(".view-team");

    if (!button) return;

    const teamId = Number(button.dataset.teamId);

    openTeam(teamId);

});

function openTeam(teamId) {

    const team = teams.find(item => item.id === teamId);

    if (!team) return;

    modalName.textContent = team.name;

    modalCountry.textContent = team.country;

    modalLogo.src = team.logo;

    rosterGrid.innerHTML = "";

    team.players.forEach(player => {

        const playerCard = document.createElement("div");

        playerCard.className = "player-card";

        playerCard.innerHTML = `

            <img
                src="${player.image}"
                alt="${player.name}"
                onerror="this.src='https://placehold.co/200x200/172438/ffffff?text=PLAYER'"
            >

            <h4>${player.name}</h4>

            <p>
                Nº ${player.number} · ${player.position}
            </p>

        `;

        rosterGrid.appendChild(playerCard);

    });

    modal.classList.add("show");

    document.body.style.overflow = "hidden";

}

// ======================================
// CERRAR PLANTILLA
// ======================================

function closeModal() {

    modal.classList.remove("show");

    document.body.style.overflow = "";

}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", event => {

    if (event.target === modal) {
        closeModal();
    }

});

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeModal();
    }

});

// ======================================
// MENÚ PARA CELULARES
// ======================================

menuToggle.addEventListener("click", () => {

    navbar.classList.toggle("open");

});

navbar.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("open");

    });

});

// ======================================
// INICIAR PÁGINA
// ======================================

renderTeams();
