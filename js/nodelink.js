// js/nodelink.js
document.addEventListener("DOMContentLoaded", function () {
    const nodes = [
        { id: "hobby", group: "hobby" },
        { id: "film", group: "sub-hobby" },
        { id: "anime", group: "sub-hobby" },
        { id: "football", group: "sub-hobby" },
        { id: "sharing", group: "sub-hobby" },
        { id: "video production", group: "activity" },
        { id: "animation", group: "activity" },
        { id: "watch Hong Kong football", group: "activity" },
        { id: "running social media", group: "activity" }
    ];

    const links = [
        { source: "hobby", target: "film" },
        { source: "hobby", target: "anime" },
        { source: "hobby", target: "football" },
        { source: "hobby", target: "sharing" },
        { source: "film", target: "video production" },
        { source: "anime", target: "animation" },
        { source: "football", target: "watch Hong Kong football" },
        { source: "sharing", target: "running social media" },
        { source: "animation", target: "video production" }
    ];

    const width = 800;
    const height = 600;
    const svg = d3.select("#vis-nodelink")
        .append("svg")
        .attr("width", "100%")
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(150))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr("class", "link");

    const node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node");

    node.append("circle")
        .attr("r", d => d.id === "hobby" ? 16 : 12)
        .attr("fill", d => {
            if (d.group === "hobby") return "#69b3a2";
            if (d.group === "sub-hobby") return "#a3c9e2";
            return "#ff6f61";
        });

    node.append("text")
        .attr("dx", d => d.id === "hobby" ? 18 : 14)
        .attr("dy", ".35em")
        .text(d => d.id);

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    node.call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x; d.fy = d.y;
    }
    function dragged(event, d) {
        d.fx = event.x; d.fy = event.y;
    }
    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null; d.fy = null;
    }
});