// function kiểm tra email và pass: start

export const login = (email, password) => {
    const error = { email: '', password: '' }
    if (!email || !validateEmail(email)) {
        error.email = 'Sai định dạng email rồi bạn ơi'
    }
    //else {error.email = ''}

    if (!password || password.length < 6) {
        error.password = 'Nhập sai mật khẩu rồi thanh niên ơi'
    }
    //else {error.password = ''}

    //kiểm tra xem có lỗi k, và lỗi là gì
    if (error.email || error.password) {

        return {
            hasError: true,
            error: error,
        }
    }
    //đăng nhập email lên firebase
    firebase.auth().signInWithEmailAndPassword(email, password)
    return {
        hasError: false
    }
}
// function kiểm tra email và pass: end



export async function register(email, displayName, password, confirmPassword) {
    const error = { email: '', displayName: '', password: '', confirmPassword: '' };
    if (!email || !validateEmail(email)) {
        error.email = 'Sai định dạng email rồi bạn ơi'
    }
    if (!displayName) {
        error.displayName = 'Sai định dạng tên rồi bạn'
    }
    if (!password || password.length < 6) {
        error.password = 'mật khẩu ngắn quá'
    }
    if (confirmPassword !== password) {
        error.confirmPassword = 'nhập sai mật khẩu rồi'
    }
    if (error.email || error.displayName || error.password || error.confirmPassword) {

        return {
            hasError: true,
            error: error,
        }
    }
    try {
        const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
        firebase.auth().currentUser.updateProfile({
            displayName: displayName
        })
        //gửi mail xác thực
        await firebase.auth().currentUser.sendEmailVerification();
        return {
            hasError: false,
        }
    } catch (err) {
        return {
            hasError: true,
            error: err,
        }
    }
    return {
        hasError: false,
        error: error,
    }
}


//hàm kiểm tra string nhập vào phải email k
//hàm này coppy trên mạng
//trả về true
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}