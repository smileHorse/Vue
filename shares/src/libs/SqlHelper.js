/**
 * SQLLite数据库帮助函数
 */
export default {
  db: null,

  /**
   * 打开数据库
   */
  openDatabase() {
    if (this.db == null) {
      this.db = openDatabase("myShares", '1.0', 'myShares',
        2 * 1024 * 1024);
    }
  },

  /**
   * 创建必要的数据库表
   */
  createTables() {
    this.executeSql('CREATE TABLE IF NOT EXISTS Shares(id TEXT, name TEXT)', []);
    this.executeSql('CREATE TABLE IF NOT EXISTS Business(id TEXT, datetime TEXT, type INTEGER, ' +
      'shares TEXT, price DOUBLE, count INTEGER, taxes DOUBLE)', []);
  },

  /**
   * 数据库初始化
   */
  initDatabase() {
    if (this.db != null) {
      return;
    }

    this.openDatabase();
    this.createTables();
  },

  /**
   * 获取股票信息
   */
  getShares() {
    return this.executeSql('SELECT id, name FROM Shares', []);
  },

  /**
   * 根据id获取股票信息
   */
  getSharesById(id) {
    return this.executeSql('SELECT id, name FROM Shares WHERE id = ?', [id]);
  },

  /**
   * 删除股票信息
   */
  deleteShares(id) {
    return this.executeSql('DELETE FROM Shares where id = ?', [id]);
  },

  /**
   * 插入股票信息
   */
  insertShares(id, name) {
    return this.executeSql('INSERT INTO Shares VALUES(?,?)', [id, name]);
  },

  /**
   * 修改股票信息
   */
  updateShares(id, name) {
    return this.executeSql('UPDATE Shares SET name = ? WHERE id = ?', [name, id]);
  },

  /**
   * sql执行函数，返回一个Promise值
   * @param sql
   * @param params
   * @returns {Promise<any>}
   */
  executeSql(sql, params) {
    this.initDatabase();

    const promise = new Promise((resolve, reject) => {
      this.db.transaction(function (tx) {
        tx.executeSql(sql, params, function (transaction, resultSet) {
          resolve(resultSet);
        }, function (transaction, error) {
          console.log('executeSql ' + sql + ' happend error', error);
          reject(error);
        });
      });
    });
    return promise;
  }
}
