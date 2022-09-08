//************Nav bar */
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section");
const navbarLinks = document.querySelectorAll(".navbar-link");
// Get the offset position of the navbar
const navbarOffsetTop = navbar.offsetTop;

window.addEventListener("scroll", ()=>{
    mainFn()
});
const mainFn= ()=>{
 // Making Navbar fixed to the top when start scrolling
    //console.log(window.pageYOffset, navbarOffsetTop)
    if(window.pageYOffset >= navbarOffsetTop){
        navbar.classList.add("sticky");
    }else{
        navbar.classList.remove("sticky")
    }
//to highlight navbar contents when reach to section of each nvbar content   
    sections.forEach((section,i)=>{

        if(window.pageYOffset >= section.offsetTop -10){
            navbarLinks.forEach(navbarLink =>{
                navbarLink.classList.remove("change");
            })
            navbarLinks[i].classList.add("change");
        };
    });
}
  mainFn();  

//To avoid poblems when changing the size of window becuase js codes based on pageOffset 
 //window.addEventListener("resize",()=>{
   //  window.location.reload();
   //}); 
   
  



//****** Typing text on the heading section************/
var textMessage = ["Hi, my name is Jenan", "I'm Software Developer."];
var count = 0
var letterCount = 0;

 typewriter = ()=>{
    if(count === textMessage.length){
        count = 0;
    }
    var currentWord = textMessage[count].substring(0, ++letterCount);
      document.querySelector("#text").innerHTML = currentWord;
    
      if(currentWord.length == textMessage[count].length){
         letterCount = 0;
         count++;
     }
     setTimeout(typewriter ,90)  
  }
window.addEventListener("load",typewriter)



//******************* Form Validation*********/
const form = document.querySelector(".contact-form")
const userName = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const messages = document.querySelectorAll(".message");

const error =(input,message)=>{
   input.nextElementSibling.classList.add("error")
   input.nextElementSibling.textContent= message;
}

const success = (input)=>{
    input.nextElementSibling.classList.remove("error")
}


const checkRequired =(inputAll)=>{
    inputAll.forEach(input => {
        if(input.value.trim() === ""){
            error(input, `${input.id} is required`)
        }
    });
}

const checkLength = (input,min)=>{
        if(input.value.trim().length < min){
          error(input,`${input.id} must be at least ${min} character`);
        }else{
            success(input)
        }
}

const checkEmail = (input)=>{
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(regEx.test(input.value.trim())){
        success(input)
    }else{
        error(input, "email is not valid");
    }

}

form.addEventListener("submit", e =>{
   
    //e.preventDefault() ==> this function does not allow us to submit the form ,
    // so must remove from here and call it only when error message exsits
    checkLength(userName,2);
    checkLength(message,7);
    checkEmail(email);
    checkRequired([userName,email,message])
    // To look for all messages and if error message exists ,then we have o excute preventDegualt() 
    const notValid = Array.from(messages).find(message =>{
        return  message.classList.contains("error")
      })
      // prevntDefault exists only when there is error message 
      notValid && e.preventDefault()
});

