import Cookies from 'js-cookie'
<<<<<<< HEAD

=======
// cookie name
>>>>>>> 7358300 (2021-11-8-1)
const TokenKey = 'vue_admin_template_token'
const Category = 'Category'

export function getToken() {
<<<<<<< HEAD
=======
//                      取值
>>>>>>> 7358300 (2021-11-8-1)
    return Cookies.get(TokenKey)
}

export function setToken(token) {
<<<<<<< HEAD
=======
//                     name     value  创建cookie
>>>>>>> 7358300 (2021-11-8-1)
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
<<<<<<< HEAD
=======
//                  删除cookie
>>>>>>> 7358300 (2021-11-8-1)
    return Cookies.remove(TokenKey)
}

export function getCategory(){
<<<<<<< HEAD
=======
//                      取值
>>>>>>> 7358300 (2021-11-8-1)
    return Cookies.get(Category)
}

export function setCategory(caty){
<<<<<<< HEAD
=======
//                      name   value 创建cookie
>>>>>>> 7358300 (2021-11-8-1)
    return Cookies.set(Category,caty)
}

export function delCategory(){
<<<<<<< HEAD
=======
//                 删除cookie
>>>>>>> 7358300 (2021-11-8-1)
    return Cookies.remove(Category)
}