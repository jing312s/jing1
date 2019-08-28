/**
 * Created by 冯静 on 2019/8/27.
 */
var express = require("express");
var app = express();
var mongo=require('mongodb');
var mongoClient = require("mongodb").MongoClient;
var url="mongodb://127.0.0.1:27017";

//封装

function connectDB(callback) {
    //连接数据库  客户端连接
    mongoClient.connect(url,(err,mongo)=> {
        // 创建数据库  第一个最大的数据库对象 第二个为当前数据库
        var dbName=mongo.db("adminuser");
        if(err){
            callback(err,null)
        }
        callback(err,mongo,dbName);
    })
}
//插入
exports.add=function(collectionName,json,callback) {
    connectDB((err,mongo,dbName)=>{
        dbName.collection(collectionName).insert(json,(err,result)=>{
           if(err){
               callback(err,null);
           }
            callback(err,result);
            mongo.close();
        })
    })
}

//查找
//插入数据里面以数组形式存在
exports.find=function(collectionName,json,callback) {
    connectDB((err,mongo,dbName)=>{
        dbName.collection(collectionName).find(json).toArray((err,result)=>{
            if(err){
                callback(err,null);
            }
            callback(err,result);
            mongo.close();
        })
    })
}

//删除
exports.deleteMany=function(collectionName,json,callback) {
    connectDB((err,mongo,dbName)=>{
        dbName.collection(collectionName).deleteMany(json,(err,result)=>{
            if(err){
                callback(err,null);
            }
            callback(err,result);
            mongo.close();
        })
    })
}

//修改
exports.updateMany=function(collectionName,json1,json2,callback) {
    connectDB((err,mongo,dbName)=>{
        dbName.collection(collectionName).updateMany(json1,{$set:json2},(err,result)=>{
            if(err){
                callback(err,null);
            }
            callback(err,result);
            mongo.close();
        })
    })
}
