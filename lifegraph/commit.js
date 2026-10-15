const lifeBranches = {
    master: { label: "Life", color: "#7293f5" },
    science: { label: "Science", color: "#b58be8" },
    INFN: { label: "INFN", color: "#62c993" },
    psychology: { label: "Psychology", color: "#f2b66d" },
    physics: { label: "Physics", color: "#f47787" },
    art: { label: "Art", color: "#5bc5d2" }
};

// Keep milestones newest first. Add new experiences at the top of this list.
// type is "commit", "branch", or "merge"; branch events need parentBranch,
// while merge events need mergedBranch.
const gitHistory = [
    {
        branch: "science",
        type: "merge",
        mergedBranch: "INFN",
        time: "Dec 2025",
        title: "Finished my position at LABEC-INFN",
        desc: "My time at LABEC ended."
    },
    {
        branch: "science",
        type: "merge",
        mergedBranch: "psychology",
        time: "Sep 2025",
        title: "Finished my psychology degree at UNED",
        desc: "Finally ended my psychology degree."
    },
    {
        branch: "psychology",
        type: "branch",
        parentBranch: "science",
        time: "Sep 2022",
        title: "Resumed my degree at UNED",
        desc: "I resumed my psychology degree at UNED."
    },
    {
        branch: "INFN",
        type: "branch",
        parentBranch: "science",
        time: "Jul 2022",
        title: "Started a technologist position at LABEC-INFN",
        desc: "Joined LABEC to research and develop AI for cultural heritage analysis using nuclear physics techniques."
    },
    {
        branch: "science",
        type: "merge",
        mergedBranch: "physics",
        time: "Sep 2021",
        title: "Finished my Master's in Physics",
        desc: "Finished the degree with more questions than answers."
    },
    {
        branch: "physics",
        type: "branch",
        parentBranch: "science",
        time: "Sep 2020",
        title: "Started my Master's degree at UAB",
        desc: "Started my Master's degree at UAB."
    },
    {
        branch: "science",
        type: "merge",
        mergedBranch: "physics",
        time: "Sep 2020",
        title: "Finished my Physics degree",
        desc: "Finished the Physics degree with more questions than answers."
    },
    {
        branch: "science",
        type: "merge",
        mergedBranch: "psychology",
        time: "Sep 2017",
        title: "Paused my psychology studies",
        desc: "Paused my psychology studies."
    },
    {
        branch: "psychology",
        type: "branch",
        parentBranch: "science",
        time: "Sep 2014",
        title: "Started a Psychology degree at UNED",
        desc: "I enthusiastically started my psychology degree at UNED, naively thinking I would understand both myself and people better."
    },
    {
        branch: "physics",
        type: "branch",
        parentBranch: "science",
        time: "Sep 2014",
        title: "Started a Physics degree at UCM",
        desc: "I enthusiastically started my Physics degree at UCM, naively thinking I would understand and reveal the secrets of the universe."
    },
    {
        branch: "science",
        type: "branch",
        parentBranch: "master",
        time: "Sep 2014",
        title: "Started university",
        desc: "I started university and opened my science track."
    },
    {
        branch: "master",
        type: "commit",
        time: "Jun 2013",
        title: "Finished high school",
        desc: "Finished high school with the highest mark in Philosophy."
    },
    {
        branch: "art",
        type: "branch",
        parentBranch: "master",
        time: "Around 2010",
        title: "Learned to paint",
        desc: "I read Betty Edwards' book and started drawing and painting."
    },
    {
        branch: "master",
        type: "commit",
        time: "1996",
        title: "Initial commit",
        desc: "I like to think that I came into this world as a product of lovemaking."
    }
];
