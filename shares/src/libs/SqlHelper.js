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
      this.db = openDatabase("myShares", '1.0', 'myShares', 2 * 1024 * 1024);
    }
  },

  /**
   * 创建必要的数据库表
   */
  createTables() {
    this.db.transaction(function (tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS Shares(id TEXT, name TEXT)', [], function (transaction, result) {
      }, function (transaction, error) {
        console.log('createTables Shares happen error: ', error);
      });
      tx.executeSql('CREATE TABLE IF NOT EXISTS Business(id TEXT, datetime TEXT, type INTEGER, ' +
        'shares TEXT, price DOUBLE, count INTEGER, taxes DOUBLE)', [], function (transaction, result) {
      }, function (transaction, error) {
        console.log('createTables Transaction happen error: ', error);
      });
    });
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
    this.initDatabase();

    let sharesDatas = [];
    this.db.transaction(function (tx) {
      tx.executeSql('SELECT id, name FROM Shares', [], function (transaction, resultSet) {
        for (let i = 0; i < resultSet.rows.length; i++) {
          console.log('getShares', resultSet.rows[i]);
          sharesDatas.push({id: resultSet.rows.item(i).id, name: resultSet.rows.item(i).name});
        }

        sharesDatas.push({id: '', name: ''});
      }, function (transaction, error) {
        console.log('getShares happen error: ', error);
      });
    });

    return sharesDatas;
  },

  /**
   * 删除股票信息
   */
  deleteShares(id) {
    this.db.transaction(function (tx) {
      tx.executeSql('DELETE FROM Shares where id = ?', [id], function (transaction, resultSet) {
        return true;
      }, function (transaction, error) {
        console.log('deleteShares happen error: ', error);
        return false;
      });
    });
  },

  /**
   * 插入股票信息
   */
  insertShares(id, name) {
    this.db.transaction(function (tx) {
      tx.executeSql('INSERT INTO Shares VALUES(?,?)', [id, name], function (transaction, resultSet) {
      }, function (transaction, error) {
        console.log('insertShares happen error: ', error);
      });
    });
  },

  /**
   * 修改股票信息
   */
  updateShares(id, name) {
    this.db.transaction(function (tx) {
      tx.executeSql('UPDATE Shares SET name = ? WHERE id = ?', [name, id], function (transaction, resultSet) {
      }, function (transaction, error) {
        console.log('updateShares happen error: ', error);
      });
    });
  }
}
