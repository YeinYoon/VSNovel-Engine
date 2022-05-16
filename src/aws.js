const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    region : "ap-northeast-2",
    //추후 .env로 보안관리 할것
    accessKeyId: 'AKIARKU2Y4IXVCR266PO', // 사용자의 AccessKey
    secretAccessKey: 'YJDi8K4VSP5bPhdNcC6hB/xreuKH2885200KS+LB' // 사용자의 secretAccessKey
});

exports.getJson = async (filePath) => { //단일 JSON 파일 가져오기
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
        }
        return data
    })();
    
    return result;
}

exports.getUrl = async (filePath) => { // 특정 경로의 파일 URL 가져오기 (단일)
    const params = {
        Bucket: "vsnovel",
        Key : filePath,
    }
    var url = await s3.getSignedUrl("getObject", params);
    return url;
}

exports.getDirList = async(filepath) => { // 해당 프로젝트 내부의 폴더목록 가져오기
    const params = {
        Bucket: "vsnovel",
        Prefix : filepath
    }

    let temp = [];
    let dirList = [];

    var data = new Promise(function(resolve, reject){
        s3.listObjectsV2(params, async(err, data) => {
            if (err) { 
                return reject(err);
            }
            var reqPath = filepath.split('/');
            reqPath.splice(-1,1);
            console.log("요청한 경로", reqPath);

            let contents = data.Contents;
            contents.forEach((content) => {    
                var folderName = content.Key.split('/');
                folderName.splice(-1,1);
                temp.push(folderName[reqPath.length]);
            });
            
            const set = new Set(temp);
            dirList = [...set];

            dirList.splice(0,1); // 필요없는 빈 데이터 삭제
            resolve(dirList);
        });
    });
      
    return data;
}

exports.getUrlList = async(filePath) => { // 특정 경로의 파일 URL 리스트 가져오기
    const params = {
        Bucket: "vsnovel",
        Prefix : filePath
    }

    let keyList = [];
    let urlList = [];

    var data = new Promise(function(resolve, reject){
        s3.listObjectsV2(params, async(err, data) => {
            if (err) { 
            return reject(err);
            }

            let contents = data.Contents;
            contents.forEach((content) => {
                keyList.push(content.Key); // "ex) content.Key => assets/images/1.png"

                var fileName = content.Key.split('/'); // 이름
                var temp = fileName[fileName.length-1];
                var extension = temp.split('.'); // 확장자
                urlList.push({
                    key : content.Key,
                    name: fileName[fileName.length-1],
                    ex : extension[extension.length-1],
                    url : null
                });
            });

            for(var i=0; i<keyList.length; i++) {
                const params = {
                    Bucket: "vsnovel",
                    Key : keyList[i],
                }
                var url = await s3.getSignedUrl("getObject", params);
                urlList[i].url = url;
            }
            urlList.splice(0,1); // 필요없는 빈 데이터 삭제
            
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
        console.log(parseInt((evt.loaded * 100) / evt.total) + "%");
    })
    .send((err, data)=>{
        if(err) {
            console.log("파일 업로드 실패");
            console.error(err);
            return "err"
        } else {
            console.log("파일 업로드 성공");
            console.log(data);
            return "ok"
        }
    })
}

exports.deleteFile = async(filePath) =>{
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
    return data
}