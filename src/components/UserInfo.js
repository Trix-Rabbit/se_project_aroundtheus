export default class UserInfo {
  constructor(selectors) {
    this.name = document.querySelector(selectors.name);
    this.description = document.querySelector(selectors.description);
    this.avatar = document.querySelector(selectors.avatar);
  }

  getUserInfo() {
    return {
      name: this.name.textContent,
      description: this.description.textContent,
    };
  }

  setUserInfo(name, description) {
    this.name.textContent = name;
    this.description.textContent = description;
  }

  setUserAvatar(avatar) {
    this.avatar.src = avatar;
  }
}