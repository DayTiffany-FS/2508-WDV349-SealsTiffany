const API_URL = "http://localhost:3000/gigs";

async function loadGigs() {
    try {
        const res = await fetch(API_URL);
        const gigs = await res.json();

        const gigList = document.getElementById("gig-list");
        gigList.innerHTML = "";

        gigs.forEach(gig => {
            const card = document.createElement("div");
            card.className = "gig-card";
            card.innerHTML = `
            <h3>${gig.title}</h3>
            `;
            gigList.appendChild(card);
        });
    } catch (err) {
        console.error("Error loading gig list:", err);
    }
}

document.addEventListener("DOMContentLoaded", loadGigs);