const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    region : "ap-northeast-2",
    accessKeyId: process.env.VUE_APP_AWS_accessKeyId, // 사용자의 AccessKey
    secretAccessKey: process.env.VUE_APP_AWS_secretAccessKey // 사용자의 secretAccessKey
});

exports.getVN = async (filePath) => { //단일 JSON 파일 가져오기
    const params = {
        Bucket: "vsnovel",
        Key : filePath,
    }

    var result = (async () => {
        try {
            var data;
            data = await s3.getObject(params).promise()
            .then((data)=>{
                return data.Body
            })
        } catch (err) {
            console.log(err);
            return "err"
        }
        return data
    })();
    
    return result;
}

exports.getUrl = async (filePath) => { // 특정 경로의 파일 URL 가져오기 (단일)
    const params = {
        Bucket: "vsnovel",
        Key : filePath,
        Expires: 604800
    }

    var url = new Promise((resolve, reject) => {
        s3.getSignedUrl("getObject", params, function(err, url) {
         if (err) return reject(err);
         resolve(url);
        });
    });
    return url;
}

exports.getDirList = async(filepath) => { // 해당 프로젝트 내부의 폴더목록 가져오기
    const params = {
        Bucket: "vsnovel",
        Prefix : filepath
    }

    let dirList = [];

    var data = new Promise(function(resolve, reject){
        s3.listObjectsV2(params, async(err, data) => {
            if (err) { 
                return reject(err);
            }
            var reqPath = filepath.split('/');
            reqPath.splice(-1,1);

            let contents = data.Contents;
            contents.forEach((content) => {    
                var folderName = content.Key.split('/');
                folderName.splice(-1,1);
                dirList.push({
                    name : folderName[reqPath.length],
                    key : content.Key
                });
            });
            
            dirList = dirList.reduce(function(acc, current) { //중복값 제거후 순수 폴더 리스트 추출
                if (acc.findIndex(({ name }) => name === current.name) === -1) {
                  acc.push(current);
                }
                return acc;
            }, []);

            dirList.splice(0,1); // 필요없는 빈 데이터 삭제
            resolve(dirList);
        });
    });
      
    return data;
}

exports.getUrlList = async(filePath) => { // 특정 경로의 파일 URL 리스트 가져오기
    const params = {
        Bucket: "vsnovel",
        Prefix : filePath,
    }

    let keyList = [];
    let urlList = [];

    var data = new Promise(function(resolve, reject){
        s3.listObjectsV2(params, async(err, data) => {
            if (err) { 
                return reject(err);
            }

            var reqPath = filePath.split('/');
            reqPath.splice(-1,1);

            let contents = data.Contents;
            contents.forEach((content) => {
                keyList.push(content.Key); // "ex) content.Key => assets/images/1.png"
                
                var filePath = content.Key.split('/'); // 이름
                if(filePath[filePath.length-1] == "") {
                    filePath.splice(-1,1);
                }
       
                var temp = filePath[filePath.length-1]; // 파일 이름 추출
                var extension = temp.split('.'); // 확장자 추출

                if(reqPath.length+1 == filePath.length) { // 폴더 구분 짓고 그 폴더 내부의 파일들 삽입

                    if(extension.length == 1) { //확장자가 없다면 폴더
                        urlList.push({
                            key : content.Key,
                            name: filePath[filePath.length-1],
                            ex : 'dir',
                            url : null
                        });
                    } else {
                        urlList.push({
                            key : content.Key,
                            name: filePath[filePath.length-1],
                            ex : extension[extension.length-1],
                            url : null
                        });
                    }

                }
                
            });
        
            if(keyList[0] == filePath) {
                keyList.splice(0,1);
            }

            for(var i=0; i<urlList.length; i++) {
                const params = {
                    Bucket: "vsnovel",
                    Key : keyList[i],
                    Expires: 604800 // URL 발급 유효기간 7일
                }
                var url = await s3.getSignedUrl("getObject", params);
                urlList[i].url = url;
            }
            
            resolve(urlList);
        });
    });
      
    return data;
}


exports.uploadFile = (filePath, file) =>{
    const params = {
        Bucket: "vsnovel",
        Key : filePath + file.name, // 저장되는 파일의 경로 및 이름
        Body : file // 파일
    }

    s3.upload(params)
    .on("httpUploadProgress", evt => {
        return parseInt((evt.loaded * 100) / evt.total) + "%";
    })
    .send((err, data)=>{
        if(err) {
            console.log("파일 업로드 실패");
            console.error(err);
            return "err"
        } else {
            console.log("파일 업로드 성공", data);
            return "ok"
        }
    })
}

exports.deleteFile = async(filePath) =>{
    console.log(filePath)
    const params = {
        Bucket: "vsnovel",
        Key : filePath,
    }
    var data = new Promise((resolve, reject)=>{
        s3.deleteObject(params, async (err)=>{
            if(err){
                reject(err)
            }
            resolve("ok")
        });
    })
    console.log(data)
    return data
},

exports.createFolder = async(path) => {
    const params = {
        Bucket: "vsnovel",
        Key : path,
    }

    var data = new Promise((resolve, reject)=>{
        s3.putObject(params).send((err, data) => {
            if (err) {
                reject(err)
            }
            console.log(data);
            resolve("ok");
        });
    })

    return data

}

exports.deleteFolder = async(filePath)=> {
    const params = {
        Bucket: "vsnovel",
        Prefix : filePath,
    }

    const listedObjects = await s3.listObjectsV2(params).promise();
    const deleteParams = {
        Bucket: params.Bucket,
        Delete: { Objects: [] }
    };

    var data = new Promise((resolve, reject)=>{

        listedObjects.Contents.forEach(({ Key }) => {
            deleteParams.Delete.Objects.push({ Key });
        });
        s3.deleteObjects(deleteParams, async (err)=>{
            if(err){
                reject(err)
            }
            resolve("ok");
        });
    })
    return data
}


exports.editName = async(key, newName, filePath) => { // 폴더 및 파일 이름 수정 (새로운 이름으로 카피 후 이전 파일 삭제)

    //encodeURIComponent는 기존에 이름이 한글이었던 파일을 수정할시 해당 key값에 꼭 적용해주어야 한다.
    var copyParamKey = encodeURIComponent(key);

    const copyParams = {
        Bucket: "vsnovel",
        CopySource : "vsnovel/"+copyParamKey, // 복사할 대상 key값
        Key : filePath + newName, //새롭게 복사할 경로
    }
    console.log(copyParams);


    const deleteParams = {
        Bucket: "vsnovel",
        Key : key,        
    }
    console.log(deleteParams);
    

    var data = new Promise((resolve, reject) => {
        s3.copyObject(copyParams, (err) => {
            if (err) {
                reject(err);
            }
     
            s3.deleteObject(deleteParams, async (err)=>{
                if(err){
                    reject(err)
                }
                resolve("ok");
            });

        });
    });

    return data

}

exports.getEpList = async(filePath) => { // 특정 경로의 파일 URL 리스트 가져오기
    const params = {
        Bucket: "vsnovel",
        Prefix : filePath,
    }

    let keyList = [];
    let urlList = [];

    var data = new Promise(function(resolve, reject){
        s3.listObjectsV2(params, async(err, data) => {
            if (err) { 
                return reject(err);
            }

            var reqPath = filePath.split('/');
            reqPath.splice(-1,1);

            let contents = data.Contents;
            contents.forEach((content) => {
                keyList.push(content.Key); // "ex) content.Key => assets/images/1.png"
                
                var filePath = content.Key.split('/'); // 이름
                if(filePath[filePath.length-1] == "") {
                    filePath.splice(-1,1);
                }

                var temp = filePath[filePath.length-1]; // 확장자
                var extension = temp.split('.'); // 확장자
                

                if(reqPath.length+1 == filePath.length) {

                    if(extension.length != 1) { //확장자가 없다면 폴더
                        urlList.push({
                            key : content.Key,
                            name: filePath[filePath.length-1],
                            ex : extension[extension.length-1],
                            url : null
                        });
                    }
                }
            });

            if(keyList[0] == filePath) {
                keyList.splice(0,1);
            }
            for(var i=0; i<urlList.length; i++) {
                const params = {
                    Bucket: "vsnovel",
                    Key : keyList[i],
                    Expires: 604800 // URL 발급 유효기간 7일
                }
                var url = await s3.getSignedUrl("getObject", params);
                urlList[i].url = url;
            }
            
            resolve(urlList);
        });
    });
      
    return data;
}