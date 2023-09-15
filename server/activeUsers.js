class activeUsers {
  constructor() {
    this.activeUsers = [];
  }
  addActiveUser(socket, userInfo) {
    this.activeUsers.push({
      id: socket.id,
      userId: userInfo.id,
    });
  }
  removeActiveUser(socket) {
    const newActiveUsers = this.activeUsers.filter(
      (user) => user.id === socket.id
    );
    this.activeUsers = newActiveUsers;
  }
  getActiveUsers() {
    return this.activeUsers;
  }
}
module.exports = activeUsers;
