let students = []
let editId = null

function setActive(el){
let items=document.querySelectorAll(".sidebar li")
items.forEach(i=>i.classList.remove("active"))
el.classList.add("active")
}

function logout(){
window.location="index.html"
}

function showDashboard(){

document.getElementById("contentArea").innerHTML=""

loadStudents()

}

function showAddStudent(){

document.getElementById("contentArea").innerHTML=`

<div class="glass form">

<h2>Add Student</h2>

<input id="roll" placeholder="Roll Number">
<input id="name" placeholder="Student Name">

<select id="gender">
<option>Male</option>
<option>Female</option>
<option>Other</option>
</select>

<input id="branch" placeholder="Branch">
<input id="mobile" placeholder="Mobile Number">
<input id="parent" placeholder="Parent Number">

<div class="btnGroup">
<button onclick="addStudent()">Add</button>
<button onclick="clearForm()">Clear</button>
</div>

</div>
`
}

function clearForm(){
document.querySelectorAll(".form input").forEach(i=>i.value="")
}

async function addStudent(){

let student={
roll:document.getElementById("roll").value,
name:document.getElementById("name").value,
gender:document.getElementById("gender").value,
branch:document.getElementById("branch").value,
mobile:document.getElementById("mobile").value,
parent:document.getElementById("parent").value
}

await fetch("http://localhost:8080/students",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify(student)
})

alert("Student added successfully")

clearForm()

loadStudents()

}

async function loadStudents(){

let response = await fetch("http://localhost:8080/students")

students = await response.json()

// Update count
document.getElementById("studentCount").innerText = students.length
createCharts()
}
//creaate charts

function createCharts(){

let male=0, female=0, other=0

students.forEach(s=>{
if(s.gender==="Male") male++
else if(s.gender==="Female") female++
else other++
})

// Branch count
let branchMap = {}

students.forEach(s=>{
branchMap[s.branch] = (branchMap[s.branch] || 0) + 1
})

// Destroy old charts
if(window.genderChartInstance) window.genderChartInstance.destroy()
if(window.branchChartInstance) window.branchChartInstance.destroy()

// 🔥 Gender Chart (Big Text)
window.genderChartInstance = new Chart(
document.getElementById("genderChart"),
{
type: "pie",
data: {
labels: ["Male","Female","Other"],
datasets: [{
data: [male,female,other],
backgroundColor: ["#03C04A","#ff6384","#36a2eb"]
}]
},
options: {
plugins: {
legend: {
labels: {
font: { size: 16 }   // 🔥 bigger text
}
}
}
}
}
)

// 🔥 Branch Chart (Big Text)
window.branchChartInstance = new Chart(
document.getElementById("branchChart"),
{
type: "bar",
data: {
labels: Object.keys(branchMap),
datasets: [{
label: "Students",
data: Object.values(branchMap),
backgroundColor: "#03C04A"
}]
},
options: {
plugins: {
legend: {
labels: {
font: { size: 16 }
}
}
},
scales: {
x: {
ticks: {
font: { size: 25}
}
},
y: {
ticks: {
font: { size: 20}
}
}
}
}
}
)

}

async function showSearch(){

await loadStudents()   // 🔥 load data first

let html=`

<h2>Search Students</h2>

<div class="searchBox">
<input id="searchInput" placeholder="Search student..." oninput="searchStudent()">
</div>

<table id="studentTable">

<tr>
<th>Roll</th>
<th>Name</th>
<th>Gender</th>
<th>Branch</th>
<th>Mobile</th>
<th>Actions</th>
</tr>

</table>
`

document.getElementById("contentArea").innerHTML=html

// 🔥 show all students initially
renderTable(students)

}

function renderTable(data){

let table=document.getElementById("studentTable")

if(!table) return

table.innerHTML=`

<tr>
<th>Roll</th>
<th>Name</th>
<th>Gender</th>
<th>Branch</th>
<th>Mobile</th>
<th>Actions</th>
</tr>
`

data.forEach(s=>{

table.innerHTML+=`

<tr>

<td>${s.roll}</td>
<td>${s.name}</td>
<td>${s.gender}</td>
<td>${s.branch}</td>
<td>${s.mobile}</td>

<td>

<button onclick="editStudent(${s.id})">✏️</button>
<button onclick="deleteStudent(${s.id})">🗑️</button>

</td>

</tr>

`

})

}

async function deleteStudent(id){

await fetch(`http://localhost:8080/students/${id}`,{
method:"DELETE"
})

loadStudents()

}

function editStudent(id){

let s=students.find(st=>st.id===id)

editId=id

document.getElementById("editRoll").value=s.roll
document.getElementById("editName").value=s.name
document.getElementById("editGender").value=s.gender
document.getElementById("editBranch").value=s.branch
document.getElementById("editMobile").value=s.mobile
document.getElementById("editParent").value=s.parent

document.getElementById("editModal").style.display="flex"

}

async function updateStudent(){

let student={

roll:document.getElementById("editRoll").value,
name:document.getElementById("editName").value,
gender:document.getElementById("editGender").value,
branch:document.getElementById("editBranch").value,
mobile:document.getElementById("editMobile").value,
parent:document.getElementById("editParent").value

}

await fetch(`http://localhost:8080/students/${editId}`,{
method:"PUT",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify(student)
})

document.getElementById("editModal").style.display="none"

alert("Student updated successfully")

loadStudents()

}

function closeModal(){
document.getElementById("editModal").style.display="none"
}

function searchStudent(){

let name=document.getElementById("searchInput").value.toLowerCase()

let filtered=students.filter(s=>s.name.toLowerCase().includes(name))

renderTable(filtered)

}

window.onload = function(){

loadStudents()

}