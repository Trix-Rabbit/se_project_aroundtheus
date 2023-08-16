export default class UserInfo {
  constructor(name, description) {
    this._name = name;
    this._description = description;

    // alert("UserInfo constructor. " + name + ", " + description);
  }

  getUserInfo() {
    //returns the object with info about the user
    const userData = {};
    userData["profileTitle"] = this._name.textContent;
    userData["profileDescription"] = this._description.textContent;

    // alert("getUserInfo. " + this._name.textContent + ", " + this._description.textContent);
    return userData;
  }

  setUserInfo(name, description) {
    // alert("setUserInfo . " + this._name.textContent + ", " + this._description.textContent);
    //takes new user data and adds on the the page
    this._name.textContent = name;
    this._description.textContent = description;

    // alert("setUserInfo 1. " + name + ", " + description);
    // alert("setUserInfo 2. " + this._name.textContent + ", " + this._description.textContent);
  }
}
