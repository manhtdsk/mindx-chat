
//cú pháp khởi tạo 1 thẻ div 
//gặp nó trình duyệt sẽ bỏ qua
//bắt buộc phải là 'tamplate'
const template = document.createElement('template')

//cho nội dung bên trong thẻ template là <div...
template.innerHTML = `
<div>
    <p id="name"></p>
    
    <p></p>
    <p></p>

    <button>My first Web</button>
    <button>hello</button>

 </div>
`;

//đều phải kế thừa HTMLElement
class MyWebComponent extends HTMLElement {
    constructor() {

        super()
        //attach thẻ vào shadow dom bằng dòng này
        this._shadowRoot = this.attachShadow({ mode: 'open' })

        this._shadowRoot.appendChild(template.content.cloneNode(true))
        this.nameElm = this._shadowRoot.querySelector("#name")
        this.btnHello=this._shadowRoot.querySelector('#btnHello')
        // this.btnHello.addEventListener('click',()=>{
        //     alert('Say hello to '+ this.name)
        // })

    }
    
    //từ khóa get cho phép gán observedAttributes chính là giá trị reture của function
    //bắt buộc phải khai báo trong webcomponent
    static get observedAttributes(){
        return ["name", "grade"]
    }
    set name(newVal){
        this.setAttribute('name',newVal)

    }

    attributeChangedCallback(name, oldVal, newVal){
        if(name=="name"){
            console.log('oldVal:',oldVal)
            this.nameElm.innerHTML=newVal
        }
    }
}

//MyWebComponent.observedAttributes


window.customElements.define('my-web', MyWebComponent)