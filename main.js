var joueur = 1;
const rows = document.getElementById("plateau").rows;
document.getElementById("replay").addEventListener("click", function () {location.reload();})
const victoire = document.createElement("span");

function manageListeners(action) {
    for (const row of rows) {
        for (const cell of row.cells) {
            if (action === "add") {
            cell.addEventListener('click', dessinerChoix);
            } else {
                cell.removeEventListener('click', dessinerChoix);
            }
            
        }
    }
}

manageListeners("add");

function dessinerChoix(elt) {
    if (joueur === 1) {
        const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg1.setAttribute("width", 70);
        svg1.setAttribute("height", 79);
        svg1.setAttribute("viewbox", "0 0 110 120");
        const circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle",
        );
        circle.setAttribute("cx", 40);
        circle.setAttribute("cy", 40);
        circle.setAttribute("r", 37);
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", "red");
        circle.setAttribute("stroke-width", 3);
        svg1.appendChild(circle);
        if (!elt.target.firstChild) {
            document.getElementById(elt.target.id).appendChild(svg1);
            elt.target.classList.add("joueur1");
            if (verifWin("joueur1")){
                victoire.textContent = `joueur ${joueur} `;
                document.querySelector(".gagnant").insertAdjacentElement("afterbegin", victoire);
                document.getElementById("replay").style.visibility = "visible";
                document.querySelector(".gagnant").style.visibility = "visible";
            }
        }
        joueur = 2;
    } else {
        const svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg2.setAttribute("width", 35);
        svg2.setAttribute("height", 90);
        svg2.setAttribute("viewbox", "0 0 110 120");
        const line1 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path",
        );
        const line2 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path",
        );
        dessinerLigne(svg2, line1, line2)
        if (!elt.target.firstChild) {
            document.getElementById(elt.target.id).appendChild(svg2);
            elt.target.classList.add("joueur2");
            if (verifWin("joueur2")){
                manageListeners("remove");
                victoire.textContent = `joueur ${joueur} `;
                document.querySelector(".gagnant").insertAdjacentElement("afterbegin", victoire);
                document.getElementById("replay").style.visibility = "visible";
                document.querySelector(".gagnant").style.visibility = "visible";
            }
        }
        joueur = 1;
    }
}
function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}
async function dessinerLigne(svg, line1, line2) {
    line1.setAttribute("d", "M0 8 L 80 80");
    line1.setAttribute("stroke", "blue");
    line1.setAttribute("stroke-width", "3");
    svg.appendChild(line1);
    await delay(.5);
    line2.setAttribute("d", "M80 8 L 0 80");
    line2.setAttribute("stroke", "blue");
    line2.setAttribute("stroke-width", "3");
    svg.appendChild(line2);
}

function verifWin(joueur) {
    // 123, 147, 258, 369, 456, 789, 159, 357
    if (document.getElementById("case1").classList.contains(joueur) &&
        document.getElementById("case2").classList.contains(joueur) &&
        document.getElementById("case3").classList.contains(joueur)) {
        verdirCases(document.getElementById("case1").id, document.getElementById("case2").id, document.getElementById("case3").id);
        return true;
    }
    if (document.getElementById("case1").classList.contains(joueur) &&
        document.getElementById("case4").classList.contains(joueur) &&
        document.getElementById("case7").classList.contains(joueur)) {
        verdirCases(document.getElementById("case1").id, document.getElementById("case4").id, document.getElementById("case7").id);
        return true;
    }
    if (document.getElementById("case2").classList.contains(joueur) &&
        document.getElementById("case5").classList.contains(joueur) &&
        document.getElementById("case8").classList.contains(joueur)) {
        verdirCases(document.getElementById("case2").id, document.getElementById("case5").id, document.getElementById("case8").id);
        return true;
    }
    if (document.getElementById("case3").classList.contains(joueur) &&
        document.getElementById("case6").classList.contains(joueur) &&
        document.getElementById("case9").classList.contains(joueur)) {
        verdirCases(document.getElementById("case3").id, document.getElementById("case6").id, document.getElementById("case9").id);
        return true;
    }
    if (document.getElementById("case4").classList.contains(joueur) &&
        document.getElementById("case5").classList.contains(joueur) &&
        document.getElementById("case6").classList.contains(joueur)) {
        verdirCases(document.getElementById("case4").id, document.getElementById("case5").id, document.getElementById("case6").id);
        return true;
    }
    if (document.getElementById("case7").classList.contains(joueur) &&
        document.getElementById("case8").classList.contains(joueur) &&
        document.getElementById("case9").classList.contains(joueur)) {
        verdirCases(document.getElementById("case7").id, document.getElementById("case8").id, document.getElementById("case9").id);
        return true;
    }
    if (document.getElementById("case1").classList.contains(joueur) &&
        document.getElementById("case5").classList.contains(joueur) &&
        document.getElementById("case9").classList.contains(joueur)) {
        verdirCases(document.getElementById("case1").id, document.getElementById("case5").id, document.getElementById("case9").id);
        return true;
    }
    if (document.getElementById("case3").classList.contains(joueur) &&
        document.getElementById("case5").classList.contains(joueur) &&
        document.getElementById("case7").classList.contains(joueur)) {
        verdirCases(document.getElementById("case3").id, document.getElementById("case5").id, document.getElementById("case7").id);
        return true;
    }
}
function verdirCases(caseA, caseB, caseC) {
    document.getElementById(caseA).style.backgroundColor = "lightgreen";
    document.getElementById(caseB).style.backgroundColor = "lightgreen";
    document.getElementById(caseC).style.backgroundColor = "lightgreen";
}
