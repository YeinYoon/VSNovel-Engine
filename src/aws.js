const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    region : "ap-northeast-2",
    //추후 .env로 보안관리 할것
    accessKeyId: 'AKIARKU2Y4IXVCR266PO', // 사용자의 AccessKey
    secretAccessKey: 'YJDi8K4VSP5bPhdNcC6hB/xreuKH2885200KS+LB' // 사용자의 secretAccessKey
});


exports.get = async(filePath) => {
    const params = {
        Bucket: "vsnovel",
        Key : filePath, // 가져올 파일의 경로 및 이름
    }

    await s3.getObject(params, (err, data)=>{
        if(err) {
            return "err"
        } else {
            return data.body
        }
    })
}


exports.upload = (filePath, file) =>{
    console.log(`S3 업로드 함수 동작 : ${filePath}, ${file}`);
    const params = {
        Bucket: "vsnovel",
        Key : filePath + file.name, // 저장되는 파일의 경로 및 이름
        Body : file // 파일
    }

    s3.upload(params, (err) => {
        if(err) {
            console.error("파일업로드중 에러발생" + err);
            return "err"
        }
    })
}

exports.delete = async(filePath) =>{
    const params = {
        Bucket: "vsnovel",
        Key : filePath, // 저장되는 파일의 경로 및 이름
    }

    await s3.deleteObject(params, (err)=>{
        if(err) {
            return "err"
        }
    })
}