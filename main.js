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

// add element vào DOM
function renderEmployees(listElementShowed) {
    // set các giá trị vào mảng listElementShowed để biểu diễn 
    const listElementShowedPerPage = listElementShowed.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage)
    //Render 
    renderCurrentPage(listElementShowed.length)
    // chuyển trang sau khi nhấn next
    nextPage.onclick = function () {
        if (currentPage >= 1 && currentPage < totalPage) {
            currentPage = currentPage + 1
            renderEmployees(listElementShowed)
        }
    }

    // chuyển trang sau khi nhấn previos
    previousPage.onclick = function () {
        if (currentPage > 1 && currentPage <= totalPage) {
            currentPage = currentPage - 1
            renderEmployees(listElementShowed)
        }
    }

    // Sắp xếp các thành viên theo tên a-z
    sortEmployeeAz.onclick = function () {
        const allEmployeesSortedAz = listElementShowed.sort((a, b) => {
            let c = a.name.trim().split(" ")
            let d = b.name.trim().split(" ")
            let e = !Number(c[c.length-1]) ? c[c.length-1] : c[c.length-2]
            let f = !Number(d[d.length-1]) ? d[d.length-1] : d[d.length-2]
            return ('' + e).localeCompare(f);
        })
        renderEmployees(allEmployeesSortedAz)
    }

    // Sắp xếp các thành viên theo tên z-a
    sortEmployeeZa.onclick = function () {
        const allEmployeesSortZa = listElementShowed.sort((a, b) => {
            let c = a.name.trim().split(" ")
            let d = b.name.trim().split(" ")
            let e = !Number(c[c.length-1]) ? c[c.length-1] : c[c.length-2]
            let f = !Number(d[d.length-1]) ? d[d.length-1] : d[d.length-2]
            return ('' + f).localeCompare(e);
        })
        renderEmployees(allEmployeesSortZa)
    }

    const html = listElementShowedPerPage.map((employee) => (
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

// truyền vào mảng data gốc vào hàm renderEmployee để hiện thị (mặc định)
renderEmployees(allEmployees)

// Hiển trị số thứ tự của các employee trong trang
function renderCurrentPage(quantity) {
    totalPage = Math.ceil(quantity / perPage)
    const beginNumber = (currentPage - 1) * perPage + 1
    let endNumber = (currentPage !== totalPage)
        ? (currentPage - 1) * perPage + perPage
        : (currentPage - 1) * perPage + (quantity % perPage)
    location.innerHTML = `<p>${beginNumber}-${endNumber}/${quantity}</p>`
}

//Filter Employee 
filterEmployee.oninput = function (e) {
    currentPage = 1;
    const filterValue = e.target.value
    const filterList = allEmployees.filter((employee) =>
        employee.name.toLowerCase().search(filterValue.toLowerCase()) !== -1
    )
    renderEmployees(filterList)
}


//Add employee
addEmployee.onclick = function () {
    if (inputEmployee.value !== "" && inputJob.value !== "") {
        // Tìm Id lớn nhất trong mảng
        let idList = []
        allEmployees.forEach(element => {
            idList.push(element.id)
        })
        const maxId = Math.max(...idList)

        // set name new employee 
        // tạo ra mảng mới bao gồm các tên có sẵn, xóa kí tự đầu nếu là số, mảng mới bao gồm mail, xóa kí tự số
        let nameList = []
        let emailList = []
        allEmployees.forEach(element => {
            let nameToArray = element.name.trim().split(" ")
            nameToArray = Number(nameToArray[nameToArray.length - 1]) 
                ? nameToArray.slice(0, nameToArray.length - 1) 
                : nameToArray
            const modifyName = nameToArray.join(" ")
            const modifyEmail = loc_xoa_dau(nameToArray[nameToArray.length-1]).toLowerCase() + "." + loc_xoa_dau(nameToArray[0]).toLowerCase()
            nameList.push(modifyName)
            emailList.push(modifyEmail)
        })
        console.log(emailList)
        //check new name đã có trong name list chưa, nếu có cộng thêm count
        let newEmployeeInput = inputEmployee.value

        let nameNewEmployee = ""
        let emailNewEmployee = ''
        let countName = 0
        let countEmail = 0
        nameList.forEach(name => {
            if(newEmployeeInput === name){
                countName = countName + 1
            }
        })
        if(countName > 0) {
            nameNewEmployee = newEmployeeInput + " " + countName
        } else{
            nameNewEmployee = newEmployeeInput
        } 

        //check new email đã có trong name list chưa, nếu có cộng thêm count
        const arrNewEmployeeInput = newEmployeeInput.split(" ")
        emailNewEmployee = loc_xoa_dau(arrNewEmployeeInput[arrNewEmployeeInput.length-1]).toLowerCase() 
            + "." 
            + loc_xoa_dau(arrNewEmployeeInput[0]).toLowerCase()
        emailList.forEach((email)=>{
            if(emailNewEmployee === email){
                countEmail = countEmail + 1
            }
        })
        if(countEmail > 0){ 
            emailNewEmployee = emailNewEmployee + countEmail + "@ntq-solution.com.vn"
        } else emailNewEmployee = emailNewEmployee + "@ntq-solution.com.vn"

        const jobNewEmployee = inputJob.value

        allEmployees.unshift({
            id: maxId + 1,
            name: nameNewEmployee,
            email: emailNewEmployee,
            job: jobNewEmployee
        })
    }
    renderEmployees(allEmployees)
}




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