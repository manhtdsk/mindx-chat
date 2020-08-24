class Message extends HTMLElement{
    constructor(){
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(document.getElementById('message').content.cloneNode(true))

        this.$container = this._shadowRoot.getElementById('container')
        this.$content = this._shadowRoot.getElementById('content')
        this.$displayName = this._shadowRoot.getElementById('displayName')
        this.$msgcontainer = this._shadowRoot.getElementById('msgcontainer')
    }
    static get observedAttributes(){
        return['content','displayName','isMine']
    }
    set content(newVal){
        this.setAttribute('content',newVal)
    }
    set displayName(newVal){
        this.setAttribute('displayName',newVal)
    }
    set isMine(newVal){
        this.setAttribute('isMine',newVal)
    }

    attributeChangedCallback(name,oldVal,newVal){
        if(name==='content'){
            this.$content.innerHTML=newVal
        }
        if(name==='$displayName'){
            this.$displayName.innerHTML=newVal
        }
        if(name==='isMine' && newVal){
            this.$msgcontainer.classList.add("bg-primary")
            this.$container.classList.add("justify-end")
        }else{
            this.$msgcontainer.classList.add("bg-secondary")
        }
       
      
        
    }
}
customElements.define('my-message', Message)