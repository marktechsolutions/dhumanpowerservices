const termsContent = {
    'driver': 'Write a detailed terms and conditions for driver services here...',
    'security': 'write a detailed terms and conditions for security services here...',
    'housekeeping': 'Write a detailed terms and conditions for housekeeping services here...'
};

function openModal(driverType) {
    const modal = document.getElementById("termsModal");
    const body = document.getElementById("ModalBody");
    const title = document.getElementById("modalTitle");
               
    if (termsContent[driverType]) {
        body.innerHTML = termsContent[driverType];
        title.innerHTML = "Terms & Conditions for " + driverType;
    } else {
        body.innerHTML = "Terms will be updated soon.";
    }

    modal.classList.remove("hidden");
    document.body.style.overflow = 'hidden';
}


function closeModal() {
    document.getElementById("termsModal").classList.add("hidden");
    document.body.style.overflow = 'auto';
}

const btn = document.getElementById("mobile-menu-button");
const menu = document.getElementById("mobile-menu");
if (btn && menu) {
    btn.addEventListener("click", () => {
        menu.classList.toggle("hidden");
    });
}


// PWA Service Worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("js/service-worker.js")
    .then(() => console.log("Service Worker Registered"));

}
