function check_inputs(){

    const user = document.getElementById("uname").value;
    const pw = document.getElementById("psw").value;

    if(user === "admin" && pw === "admin"){
        window.location.href="../homepage/Homepage.html";
    }else{
        window.location.href="login.html";
        alert("Wrong Password or wrong Username");  
    }

}