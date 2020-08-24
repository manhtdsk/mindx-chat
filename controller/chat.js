export function createCon(name, member) {
    //nếu name rỗng
    if (!name) {
        return {
            hasError: true,
            name: 'name cannot be empty'
        }
    }
//phần kiểm tra email đầu vào tự làm


    const conDoc = {
        name: name,
        member: [firebase.auth().currentUser.email, member]
    }
    console.log(conDoc)
    db.collection("conversations").add(conDoc)
}