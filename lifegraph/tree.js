const laneGap = 36;
const rowHeight = 76;
const nodeY = rowHeight / 2;
const svgNamespace = "http://www.w3.org/2000/svg";

function validateHistory() {
    gitHistory.forEach((event, index) => {
        if (!lifeBranches[event.branch]) {
            throw new Error(`Life graph event ${index + 1} uses an unknown branch: ${event.branch}`);
        }
        if (event.type === "branch" && !lifeBranches[event.parentBranch]) {
            throw new Error(`Life graph event "${event.title}" needs a valid parentBranch.`);
        }
        if (event.type === "merge" && !lifeBranches[event.mergedBranch]) {
            throw new Error(`Life graph event "${event.title}" needs a valid mergedBranch.`);
        }
        if (!["commit", "branch", "merge"].includes(event.type)) {
            throw new Error(`Life graph event "${event.title}" has an unsupported type.`);
        }
    });
}

function getBranchLifetimes() {
    const lifetimes = Object.fromEntries(
        Object.keys(lifeBranches).map(branch => [branch, []])
    );
    lifetimes.master.push({ start: gitHistory.length - 1, end: null });

    for (let index = gitHistory.length - 1; index >= 0; index -= 1) {
        const event = gitHistory[index];
        if (event.type === "branch") {
            lifetimes[event.branch].push({ start: index, end: null });
        } else if (event.type === "merge") {
            const activeLifetime = [...lifetimes[event.mergedBranch]]
                .reverse()
                .find(lifetime => lifetime.end === null);
            if (activeLifetime) activeLifetime.end = index;
        }
    }

    return lifetimes;
}

function branchPath(branch, pathData) {
    return `<path d="${pathData}" data-branch="${branch}" style="--branch-color:${lifeBranches[branch].color}" />`;
}

function branchNode(branch, x) {
    return `<circle cx="${x}" cy="${nodeY}" r="5.5" data-branch="${branch}" style="--branch-color:${lifeBranches[branch].color}" />`;
}

function renderControls(branches) {
    const controls = document.getElementById("controls-container");
    controls.innerHTML = branches.map(branch => `
        <button type="button" data-filter-branch="${branch}" aria-pressed="true"
            style="--branch-color:${lifeBranches[branch].color}">
            <span class="btn-dot" aria-hidden="true"></span>${lifeBranches[branch].label}
        </button>
    `).join("");

    controls.addEventListener("click", event => {
        const button = event.target.closest("button[data-filter-branch]");
        if (!button) return;

        const branch = button.dataset.filterBranch;
        const active = button.getAttribute("aria-pressed") === "true";
        button.setAttribute("aria-pressed", String(!active));

        document.querySelectorAll("[data-branch]").forEach(element => {
            if (element.dataset.branch === branch) {
                element.classList.toggle("is-muted", active);
            }
        });
    });
}

function renderGraph(branches, lifetimes) {
    const container = document.getElementById("git-tree-container");
    const xForBranch = Object.fromEntries(
        branches.map((branch, index) => [branch, 24 + index * laneGap])
    );
    const svgWidth = 48 + Math.max(0, branches.length - 1) * laneGap;
    const activeBranches = branches.filter(branch =>
        lifetimes[branch].some(lifetime => lifetime.end === null)
    );

    const rows = [{
        branch: "present",
        title: "Present",
        time: "Now",
        desc: "Current state of all active branches.",
        event: null
    }, ...gitHistory.map(event => ({ ...event, event }))];

    container.innerHTML = rows.map((row, rowIndex) => {
        const event = row.event;
        let paths = "";

        if (!event) {
            activeBranches.forEach(branch => {
                paths += branchPath(branch, `M${xForBranch[branch]},${rowHeight} L${xForBranch[branch]},${nodeY}`);
            });
        } else {
            branches.forEach(branch => {
                const x = xForBranch[branch];
                const isBranchStart = event.type === "branch" && event.branch === branch;
                const isMerge = event.type === "merge" && event.mergedBranch === branch;
                const activeHere = lifetimes[branch].some(lifetime =>
                    rowIndex - 1 >= (lifetime.end ?? 0) && rowIndex - 1 <= lifetime.start
                );

                if (isBranchStart) {
                    const parentX = xForBranch[event.parentBranch];
                    paths += branchPath(branch, `M${parentX},${rowHeight} C${parentX},${nodeY + 8} ${x},${nodeY + 8} ${x},${nodeY} L${x},0`);
                } else if (isMerge) {
                    const targetX = xForBranch[event.branch];
                    paths += branchPath(branch, `M${x},${rowHeight} C${x},${nodeY + 12} ${targetX},${nodeY + 12} ${targetX},${nodeY}`);
                } else if (activeHere) {
                    paths += branchPath(branch, `M${x},${rowHeight} L${x},0`);
                }
            });
        }

        const nodeBranch = event ? event.branch : null;
        const node = nodeBranch ? branchNode(nodeBranch, xForBranch[nodeBranch]) : activeBranches.map(branch => branchNode(branch, xForBranch[branch])).join("");
        const title = event ? event.title : row.title;
        const time = event ? event.time : row.time;
        const description = event ? event.desc : row.desc;
        const contentBranch = nodeBranch || "present";

        return `
            <article class="git-row" data-branch="${contentBranch}">
                <div class="git-graph">
                    <svg width="${svgWidth}" height="${rowHeight}" viewBox="0 0 ${svgWidth} ${rowHeight}" aria-hidden="true">
                        ${paths}${node}
                    </svg>
                </div>
                <div class="git-content">
                    <h3>${title}<time>${time}</time></h3>
                    <p>${description}</p>
                </div>
            </article>
        `;
    }).join("");
}

function reportHeight() {
    window.parent.postMessage({ type: "setHeight", height: document.body.scrollHeight }, "*");
}

validateHistory();
const branchOrder = Object.keys(lifeBranches);
const branchLifetimes = getBranchLifetimes();
renderControls(branchOrder);
renderGraph(branchOrder, branchLifetimes);
window.addEventListener("load", reportHeight);
window.addEventListener("resize", reportHeight);
new ResizeObserver(reportHeight).observe(document.body);
