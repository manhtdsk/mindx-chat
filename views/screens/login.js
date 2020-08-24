import {setScreen} from "../../index.js"
import {login} from "../../controller/auth.js"
class LoginScreen extends HTMLElement {
    constructor() {

        super()
        
        this._shadowRoot = this.attachShadow({ mode: 'open' })

        this._shadowRoot.appendChild(document.getElementById('loginScreen').content.cloneNode(true))

       this._shadowRoot.querySelector('#linkToRegister').addEventListener('click',()=>{
           setScreen('register')
       })

       this.$form=this._shadowRoot.querySelector('#formLogin')
       //console.log(this.$form)

       this.$email = this.$form.querySelector("form-input[name='email']")
       this.$password= this.$form.querySelector("form-input[name='password']")

       this.$form.addEventListener('submit',(event)=>{
        event.preventDefault();
        this.login2()


    })
    }


    login2(){

        //console.log(this.$form.querySelector("form-input[name='email']").value)

        const email=this.$email.value
        const password=this.$password.value

        //gọi hàm login ở file auth
        const result= login(email,password)
        console.log(result)

        if(result.hasError){
            this.$email.error= result.error.email
            this.$password.error= result.error.password
        }
        else {
            this.$email.error=''
            this.$password.error=''
        }  
    }

}

window.customElements.define('login-screen', LoginScreen)