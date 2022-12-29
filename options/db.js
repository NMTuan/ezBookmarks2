/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2022-12-13 16:48:13
 * @LastEditTime: 2022-12-13 16:48:27
 * @LastEditors: NMTuan
 * @Description: 
 * @FilePath: \ezBookmarks2\src\options\db.js
 */
import PouchDB from 'pouchdb-browser'
import PouchFind from 'pouchdb-find';

PouchDB.plugin(PouchFind);
const db = new PouchDB('ez_bookmarks');

export default db
