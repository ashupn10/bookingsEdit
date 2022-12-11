let form = document.getElementById('form');
let input = form.querySelectorAll('input');
let users = document.getElementById('users');
function myobj(username, email) {
    this.username = username;
    this.email = email;
}
function showUserOnScreen() {

    axios.get('https://crudcrud.com/api/b92bd4de628747ec9fa18b20fd4399de/bookings')
        .then(res => {
                console.log(res.data);
                res.data.forEach(obj => {
                let list = document.createElement('li');
                let nametext = document.createTextNode(`Username: ${obj.username}`);
                let emailtext = document.createTextNode(`Email: ${obj.email}`);
                let editbtn = document.createElement('button');
                editbtn.textContent='Edit';
                let Deletebtn = document.createElement('button');
                Deletebtn.textContent='Delete';
                editbtn.addEventListener('click',()=>{
                    EditData(obj._id,list,obj.username,obj.email);
                });
                Deletebtn.addEventListener('click',()=>{
                    DeleteData(obj._id,list);
                })
                list.appendChild(nametext);
                list.appendChild(editbtn);
                list.appendChild(emailtext);
                list.appendChild(Deletebtn);
                users.appendChild(list);
            })
        })
        .catch(err => console.log(err));

}
function DeleteData(key,list) {
    list.remove();
    axios.delete('https://crudcrud.com/api/b92bd4de628747ec9fa18b20fd4399de/bookings/' + key).then(res=>{
        return 0;
    });
}
function EditData(key,list,username,email) {
    input[0].value=username;
    input[1].value=email;
    DeleteData(key,list);
}
// console.log(user);
input[2].addEventListener('click', (e) => {
    e.preventDefault;
    let username = input[0].value;
    let email = input[1].value;
    // let usernamestring=tooString(username);
    // let user=JSON.stringify(new myobj(username,email));
    axios.post('https://crudcrud.com/api/b92bd4de628747ec9fa18b20fd4399de/bookings', {
        "username": username,
        "email": email
    })
        .then(res =>{
            showUserOnScreen();
            console.log(res,'Done');
        })
        .catch(err => console.log(err));
})
window.addEventListener('DOMContentLoaded', () => {
    axios.get('https://crudcrud.com/api/b92bd4de628747ec9fa18b20fd4399de/bookings')
        .then(res => showUserOnScreen())
        .catch(err => console.log(err));
})
