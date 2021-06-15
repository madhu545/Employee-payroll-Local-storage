window.addEventListener('DOMContentLoaded', (event)=> {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function(){
        if(name.value.length==0){
           textError.textContent="";
           return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;;
            textError.textContent="";
        } catch (e) {
            textError.textContent=e;
        }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent=salary.value;
    salary.addEventListener('input', function(){
        output.textContent = salary.value;
    });
/* Date Validation */
    const startDate = document.querySelector('#startDate');
    const dateError = document.querySelector('.date-error');
    startDate.addEventListener('input', function(){
        if(startDate.value.id==null){
           dateError.dateContent="";
           return;
        }
        try {
            (new EmployeePayrollData()).startDate = startDate.value;;
            dateError.dateContent="";
        } catch (e) {
            dateError.dateContent=e;
        }
    });
});

/* UC3 Object on Save  and use UC4 for Local Storage*/
const save = () => {
    try {
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    } catch (e) {
        return;
    }
}
/*+ UC4 method use for LocalStorage */
function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("employeePayrollList"));

    if (employeePayrollList != undefined){
        employeePayrollList.push(employeePayrollData);
    } else {
        employeePayrollList = [employeePayrollData]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList))
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getSelectedValues('#salary');
    employeePayrollData.note = getSelectedValues('#notes');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+
               getInputValueById('#year');
    employeePayrollData.date = Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;           
}
/* helper method*/
const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let setItems=[];
    allItems.forEach(item => {
        if (item.checked) setItems.push(item.value);
    });
    return setItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}
/*getElementById is better supported than querySelector in older version
of the browsers , its only allows to select an element by its id(#name)*/
const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}
/*UC4 ability to save employee payroll object to local storage

/*UC5 Reset the form*/
const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#notes', '');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2020');
}

const unsetSelectedValues = (propertyValue)=> {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setTextValue = (id ,value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue =(id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}