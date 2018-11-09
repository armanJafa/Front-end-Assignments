function Student(firstName, lastName, classes, grades) {
    this.firstName=firstName; 
    this.lastName=lastName; 
    this.classes = classes.slice(0); 
    this.grades = grades.slice(0); 
}

Student.prototype.getName= function() {
        return this.firstName + " " + this.lastName; 
}

Student.prototype.getFirstName=function() {
        return this.firstName; 
}

Student.prototype.getLastName=function() {
    return this.lastName; 
}

Student.prototype.getClasses=function() {
    return this.classes;
}

Student.prototype.getGrades=function() {
    return this.grades; 
}

function StudentModel() {
    this.students = new Array(); 
}

StudentModel.prototype.getStudents =  function() {
     return [].concat(this.students); 
}
   
StudentModel.prototype.addStudent=function(student) {
    this.students.push(student); 
}

StudentModel.prototype.SearchStudentByLastName=function(lastName) {
    var foundStudents = new Array(); 
    var i; 
    for(i = 0; i < this.students.length; i++){
        if(this.students[i].lastName==lastName){
            foundStudents.push(this.students[i]); 
        }
    }

    return foundStudents; 
}

function ListView(model) {
    this.model = model; 
}

ListView.prototype.createList = function(lastName){
    var ul = document.getElementById("student-list"); 
    var i;
    var li; 
    var li_content; 
    var foundStudents = this.model.SearchStudentByLastName(lastName);

    console.log(foundStudents[0].getName()); 
    for(i = 0; i < foundStudents.length; i++) {
        li = document.createElement("li"); 
        li.setAttribute("id", "student-name-" + (i+1)); 
        li_content = document.createTextNode(foundStudents[i].getName());
        li.appendChild(li_content); 
        li.addEventListener('click', function(e){
            var container = document.getElementById("grades-table-container"); 
            var clicked_student_txt = document.getElementById(e.target.id).innerHTML;  
            var tbl = document.createElement("table"); 
            var tbl_body = document.createElement("tbody"); 
 
            var found_student = foundStudents.find(function(element) {
                return element.getName() == clicked_student_txt; 
            }); 
            
            var student_classes = found_student.getClasses(); 
            var student_grades  = found_student.getGrades(); 

            var row_headers = document.createElement("tr"); 

            var class_header = document.createElement("th"); 
            var class_header_text = document.createTextNode("Classes for " + clicked_student_txt); 
            class_header.appendChild(class_header_text); 

            row_headers.appendChild(class_header); 
            tbl_body.appendChild(row_headers); 

            for( var i = 0; i < student_classes.length; i++) {
                var row = document.createElement("tr"); 

                var cellClass = document.createElement("td"); 
                var cellTextClass = document.createTextNode(student_classes[i]); 
                cellClass.appendChild(cellTextClass); 
                row.appendChild(cellClass); 

                var cellGrade = document.createElement("td"); 
                var cellTextGrade = document.createTextNode(student_grades[i]); 
                cellGrade.appendChild(cellTextGrade); 
                row.appendChild(cellGrade); 

                tbl_body.appendChild(row); 
                
            }

            tbl.appendChild(tbl_body); 
            container.appendChild(tbl); 
        }) ; 
        ul.appendChild(li);
    }

}

