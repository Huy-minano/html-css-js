import { EMPLOYEES } from "./MOCK_DATA.js"

let allEmployees = EMPLOYEES

const listEmployee = document.querySelector(".listEmployee")
const location = document.querySelector(".currentPage")
const nextPage = document.querySelector(".nextPage")
const previousPage = document.querySelector(".previousPage")
const sortEmployeeAz = document.querySelector(".sort_a-z")
const sortEmployeeZa = document.querySelector(".sort_z-a")
const filterEmployee = document.querySelector(".filter-employee")
const inputEmployee = document.querySelector(".input-add-employee")
const inputJob = document.querySelector(".input-add-job")
const addEmployee = document.querySelector(".btn-add-employee")

let currentPage = 1; //trang hiện tại, set giá trị ban đầu = 1
let perPage = 40; // số employees trên 1 page
let totalPage = Math.ceil(EMPLOYEES.length / perPage) // tổng số page cần để hiển thị hết
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
    let endNumber = (currentPage !== totalPage)
        ? (currentPage - 1) * perPage + perPage
        : (currentPage - 1) * perPage + (allEmployees.length % perPage)
    location.innerHTML = `<p>${beginNumber}-${endNumber}/${EMPLOYEES.length}</p>`
}

// Sắp xếp các thành viên theo tên a-z
sortEmployeeAz.onclick = function () {
    allEmployees.sort((a, b) => {
        let c = a.name.split(" ")
        let d = b.name.split(" ")
        return ('' + c[c.length - 1]).localeCompare(d[d.length - 1]);
    })
    perEmployees = allEmployees.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage)
    renderEmployees()
}

// Sắp xếp các thành viên theo tên z-a
sortEmployeeZa.onclick = function () {
    allEmployees.sort((a, b) => {
        let c = a.name.split(" ")
        let d = b.name.split(" ")
        return ('' + d[d.length - 1]).localeCompare(c[c.length - 1]);
    })
    perEmployees = allEmployees.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage)
    renderEmployees()
}

//Filter Employee 
filterEmployee.oninput = function (e) {
    currentPage = 1;
    const filterValue = e.target.value
    const filterList = allEmployees.filter((employee) =>
        employee.name.toLowerCase().search(filterValue.toLowerCase()) !== -1
    )
    perEmployees = filterList.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage)
    renderEmployees()
}

//Add employee
addEmployee.onclick = function () {
    if (inputEmployee.value !== "" && inputJob.value !== "") {
        const nameNewEmployee = inputEmployee.value
        const newJob = inputJob.value
        const emailNewEmployee = loc_xoa_dau(nameNewEmployee.split(" ")[nameNewEmployee.split(" ").length - 1]).toLowerCase()
            + loc_xoa_dau("." + nameNewEmployee.split(" ")[0]).toLowerCase()
            + "@ntq-solution.com.vn"
        const jobNewEmployee = newJob

        allEmployees.unshift({
            id: 1,
            name: nameNewEmployee,
            email: emailNewEmployee,
            job: jobNewEmployee
        })
    }
    perEmployees = allEmployees.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage)
    renderEmployees()
}


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

function loc_xoa_dau(str) {
    // Gộp nhiều dấu space thành 1 space
    str = str.replace(/\s+/g, ' ');
    // loại bỏ toàn bộ dấu space (nếu có) ở 2 đầu của chuỗi
    str = str.trim();
    // bắt đầu xóa dấu tiếng việt  trong chuỗi
     str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
     str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
     str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
     str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
     str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
     str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
     str = str.replace(/đ/g, "d");
     str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
     str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
     str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
     str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
     str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
     str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
     str = str.replace(/Đ/g, "D");
     return str;
 }