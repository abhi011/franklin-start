(function(){
    if(document.getElementsByClassName("user").length==0){
        return;
    }
    const loadNextUser = ()=>{
        if(offset<totalData){
            offset +=20;
            getUserData();
        }
    }

    const loadPreviousUser = ()=>{
        if(offset>0){
            offset -=20;
            getUserData();
        }
    }
    let buttonGroup = document.getElementsByClassName("load-next-data");

    const buttonGroupPressed = (e)=>{
        e.preventDefault();
        if(e.target.classList.contains('load-previous')){
            loadPreviousUser();
        }
        if(e.target.classList.contains('load-next')){
            loadNextUser();
        }
    }

    let userData = [];
    let offset = 0;
    let totalData = 0;
    const printUserData = ()=>{
        if(userData.length>0){
            let userInnerHtml = '';
            for(let i=0;i<userData.length;i++){
                userInnerHtml +='<div class="user-name">'+userData[i].name+'</div>';
            }
            userInnerHtml += '<div class="load-next-data"> <a class="load-previous" href="#">Load Previous</a><a class="load-next" href="#">Load Next</a></div>';
            document.getElementsByClassName("user")[0].innerHTML = userInnerHtml;

            buttonGroup = document.getElementsByClassName("load-next-data")[0];
            buttonGroup.addEventListener('click', buttonGroupPressed);
        }
    };
    const getUserData = ()=>{
        fetch('/user.json?limit=20&offset='+offset).then(res=>{
            return res.json();
        }).then(res=>{
            userData = res.data;
            totalData = +res.total;
            printUserData();
        });
    };
    getUserData();
})();

