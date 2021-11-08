import Cookies from 'js-cookie'

const TokenKey = 'token'
const Name = 'name'
const Avatar = 'avatar'
const Category = 'Category'

//token
export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

//name
export function getName() {
  return Cookies.get(Name)
}

export function setName(name) {
  return Cookies.set(Name, name)
}

export function removeName() {
  return Cookies.remove(Name)
}

//avatar
export function getAvatar() {
  return Cookies.get(Avatar)
}

export function setAvatar(avatar) {
  return Cookies.set(Avatar, avatar)
}

export function removeAvatar() {
  return Cookies.remove(Avatar)
}

export function getCategory(){
    return Cookies.get(Category)
}

export function setCategory(caty){
    return Cookies.set(Category,caty)
}

export function delCategory(){
    return Cookies.remove(Category)
}