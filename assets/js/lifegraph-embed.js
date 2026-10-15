const lifeGraphFrame = document.querySelector(".grafo-embed");

window.addEventListener("message", event => {
    if (event.source !== lifeGraphFrame.contentWindow) return;
    if (event.data?.type !== "setHeight") return;
    if (!Number.isFinite(event.data.height)) return;

    lifeGraphFrame.style.height = `${Math.max(320, Math.ceil(event.data.height))}px`;
});
