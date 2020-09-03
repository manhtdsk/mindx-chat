import { sendMsg } from '../../controller/chat.js'
class ChatScreen extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(document.getElementById('chatScreen').content.cloneNode(true))

        this.$btnShowCon = this._shadowRoot.querySelector('#btnShowCon')
        this.$btnShowMem = this._shadowRoot.querySelector('#btnShowMem')
        this.$placeHolder = this._shadowRoot.querySelector('#placeholder')
        this.$txtTitle= this._shadowRoot.querySelector('#txtTitle')

        this.$btnShowCon.addEventListener('click', () => {
            this.$placeHolder.classList.add('visble')
            this.showListCon();
        })

        this.$placeHolder.addEventListener('click', () => {
            this.$placeHolder.classList.remove('visble')
        })
        this.$chatForm = this._shadowRoot.querySelector('#chatForm')
        this.$message = this._shadowRoot.querySelector("form-input[name='message']")
        this.conList = []
        this.activeCon = ""
        this.$messageList = this._shadowRoot.querySelector('#messageList')
    }
    showListCon() {
        const $conList = document.createElement('con-list')
        $conList.list = JSON.stringify(this.conList)
        $conList.addEventListener('create-con', () => {
            console.log('hello')
            this.showCreateConForm()
        })
        $conList.addEventListener("changeActiveCon", () => {
           this.activeCon=event.detai.id;
           const selected=  this.conList.find((con)=>con.id==this.activeCon);
           this.$txtTitle.innerHTML=selected

        })
        this.$placeHolder.appendChild($conList)
    }
    changeActiveCon(id) {

    }

    showCreateConForm() {
        this.$placeHolder.innerHTML = ""
        const $conForm = document.createElement('con-form')
        this.$placeHolder.appendChild($conForm)

    }
    connectedCallback() {
        this.$chatForm.addEventListener('submit', (event) => {
            event.preventDefault()

            sendMsg(this.$message.value, "8Jc9dG0fu2dokaoVzPud")
        })
        this.addEventListener('changeActiveCon', (event) => {
            console.log('hello')

            console.log(event)

        })

        db.collection("conversations").onSnapshot((querySnapshot) => {
            const list = []
            querySnapshot.forEach((doc) => {
                const item = doc.data();
                item.id = doc.id
                this.conList.push(item)
            });
        });

        db.collection("messages").orderBy("createdAt").onSnapshot((querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
                if (change.type !== "added") return;
                const data = change.doc.data()
                const myMsg = document.createElement('my-message')
                myMsg.content = data.content
                myMsg.displayName = data.sender.displayName

                if (data.sender.email === firebase.auth().currentUser.email) {
                    myMsg.ismine = true
                }
                // msgDiv.innerHTML = data.content
                this.$messageList.appendChild(myMsg)
            })
            // querySnapshot.forEach((doc)=>{})
        })
    }

}

customElements.define('chat-screen', ChatScreen)