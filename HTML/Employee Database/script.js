document.addEventListener('DOMContentLoaded', function(){
    const addButton = document.querySelector('.addbutton');
    const intable = document.querySelector('.inputtable');
    const outtable = document.querySelector('.outputtable');
    const submitButton = document.querySelector('.Submitbutton');
    
    const namein = document.getElementById('nameinput');
    const dobin = document.getElementById('Dobinput');
    const departmentin = document.getElementById('Departmentinput');
    const skillin = document.getElementById('skillinput');
    const ein = document.getElementById('IDinput');
    const passin = document.getElementById('passinput');

    addButton.addEventListener('click', function(){
        submitButton.classList.remove('hidden');
        intable.classList.remove('hidden');
        addButton.classList.add('hidden');
    });

    submitButton.addEventListener('click',function(){
            
    document.getElementById('nameerror').textContent = '';
    document.getElementById('passerror').textContent = '';
    document.getElementById('doberror').textContent = '';
    document.getElementById('departmenterror').textContent = '';
    document.getElementById('skillerror').textContent = '';
    document.getElementById('iderror').textContent = '';

    let isValid = true;

    if(!namein.value.trim()){
        document.getElementById('nameerror').textContent = 'Name is required.';
        isValid = false;
    }
    
    if(!dobin.value){
        document.getElementById('doberror').textContent = 'Date of Birth is required.';
        isValid = false;
    }
    
    if(!departmentin.value.trim()){
        document.getElementById('departmenterror').textContent = 'Department is required.';
        isValid = false;
    }
    
    if(!skillin.value.trim()){
        document.getElementById('skillerror').textContent = 'Skill is required.';
        isValid = false;
    }
    
    if(!ein.value.trim()){
        document.getElementById('iderror').textContent = 'ID is required.';
        isValid = false;
    }
    
    if(!passin.value){
        document.getElementById('passerror').textContent = 'Password is required.';
        isValid = false;
    }

    if(!isValid) return;

        const empid = ein.value;
        const name = namein.value.trim();
        const dob = dobin.value;
        const department = departmentin.value.trim();
        const skill = skillin.value.trim();

    const newrow = document.createElement('tr');
    newrow.innerHTML = `<td>${empid}</td>
                        <td>${name}</td>
                        <td>${dob}</td>
                        <td>${department}</td>
                        <td>${skill}</td>
                        <td><button class="updatebutton">Update</button>
                        <button class="deletebutton">Delete</button></td>`
    outtable.appendChild(newrow);

    ein.value = '';
    namein.value = '';
    dobin.value = '';
    departmentin.value = '';
    skillin.value = '';
    passin.value = '';
    
    const upbutton = newrow.querySelector('.updatebutton');
    const delbutton = newrow.querySelector('.deletebutton');

    delbutton.addEventListener('click',function(){
        outtable.removeChild(newrow);
    });

    upbutton.addEventListener('click',function(){
        ein.value = newrow.children[0].textContent;
        namein.value = newrow.children[1].textContent;
        dobin.value = newrow.children[2].textContent;
        departmentin.value = newrow.children[3].textContent;
        skillin.value = newrow.children[4].textContent;

        outtable.removeChild(newrow);

        submitButton.classList.remove('hidden');
        intable.classList.remove('hidden');
    });

    });
});
