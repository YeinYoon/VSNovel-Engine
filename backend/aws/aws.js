const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    region : "ap-northeast-2",
    //추후 .env로 보안관리 할것
    accessKeyId: 'AKIARKU2Y4IXVCR266PO', // 사용자의 AccessKey
    secretAccessKey: 'YJDi8K4VSP5bPhdNcC6hB/xreuKH2885200KS+LB' // 사용자의 secretAccessKey
});

exports.createProjectDir = async(pjCode) => {
    const params = [
        {
            Bucket:"vsnovel",
            Key : `PJ${pjCode}/bg/`
        },
        {
            Bucket:"vsnovel",
            Key : `PJ${pjCode}/bgm/`
        },
        {
            Bucket:"vsnovel",
            Key : `PJ${pjCode}/char/`
        }
    ];

    for(var i=0; i<params.length; i++) {
        s3.putObject(params[i])
        .send(err => {
            if (err) {
                throw err;
            }
        });
    }
    
}

exports.deleteProjectDir = async(pjCode) => {
    let params = {
        Bucket: "vsnovel",
        Prefix: `PJ${pjCode}/`
    };
    const listedObjects = await s3.listObjectsV2(params).promise();
    const deleteParams = {
        Bucket: params.Bucket,
        Delete: { Objects: [] }
    };
 
    listedObjects.Contents.forEach(({ Key }) => {
        deleteParams.Delete.Objects.push({ Key });
    });
 
    await s3.deleteObjects(deleteParams).promise(); 
}