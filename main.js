import { EMPLOYEES } from "./MOCK_DATA.js"

let allEmployees = EMPLOYEES

const listEmployee = document.querySelector(".listEmployee")
const location = document.querySelector(".currentPage")
const nextPage = document.querySelector(".nextPage")
const previousPage = document.querySelector(".previousPage")

let currentPage = 1; //trang hiện tại, set giá trị ban đầu = 1
let perPage = 40; // số employees trên 1 page
let totalPage = Math.round(EMPLOYEES.length / perPage) // tổng số page cần để hiển thị hết
let perEmployees = [] // mảng chứa các employess được hiển thị trên trang set giá trị ban đầu là mâng rỗng

// set các giá trị vào mảng perEmployees để hiện lần đầu tải trang
perEmployees = allEmployees.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage)

// chuyển trang sau khi nhấn next
nextPage.onclick = function () {
    if (currentPage >= 1 && currentPage < totalPage) {
        currentPage = currentPage + 1
        perEmployees = allEmployees.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage)
        renderEmployees()
    }
}

// chuyển trang sau khi nhấn previos
previousPage.onclick = function () {
    if (currentPage > 1 && currentPage <= totalPage) {
        currentPage = currentPage - 1
        perEmployees = allEmployees.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage)
        renderEmployees()
    }
}

// Hiển trị số thứ tự của các employee trong trang
function renderCurrentPage() {
    const beginNumber = (currentPage - 1) * perPage + 1
    const endNumber = (currentPage - 1) * perPage + perPage
    location.innerHTML = `<p>${beginNumber}-${endNumber}/${EMPLOYEES.length}</p>`
}

function sortEmployees() {
    allEmployees.sort((a, b) => {
       let c = a.name.split(" ")
       let d = b.name.split(" ")
       return ('' + c[c.length-1]).localeCompare(d[d.length-1]);
    })
    console.log(allEmployees)
}
sortEmployees()

// add element vào DOM
function renderEmployees() {
    renderCurrentPage()
    const html = perEmployees.map((employee) => (
        `<div class="employeeInlist">
            <img src="img/avatar.png" alt="">
            <div class="infor">
                <div class="infor-employee">
                    <p>${employee.name}</p>
                    <p>${employee.job}</p>
                    <p>${employee.email}</p>
                </div>
                <button>Follow</button>
            </div>
        </div>`
    ))
    listEmployee.innerHTML = html.join("")
}

renderEmployees()

