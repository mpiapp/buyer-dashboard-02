import { Box } from '@mui/material';
import { v4 as uuid } from 'uuid';

const UploadProof : React.FC<any> = ({
    dataImage,
    setDataImage,
    loading,
    setLoading
}) => {

    const handleImageChange = (e : any) => {
        const random = uuid();
        setLoading(true)
        setDataImage("")
        setTimeout(() => {
            var S3 = require("aws-sdk/clients/s3");
            const s3bucket = new S3({
                endpoint: process.env.REACT_APP_S3_BUCKET_ENDPOINT,
                accessKeyId: process.env.REACT_APP_S3_BUCKET_KEY,
                secretAccessKey: process.env.REACT_APP_S3_BUCKET_SECRET
            });
        
            if (e.target.files && e.target.files[0]) {
            const blob = e.target.files[0]
            const file_name = blob.name.replace(/\s/g, "")
            const params = { Body: blob, 
                            Bucket: process.env.REACT_APP_S3_BUCKET_NAME, 
                            Key: 'buyer/' + random + file_name
                            };
            s3bucket.putObject(params)
            .on('build', (request : any) => {
                request.httpRequest.headers.Host = process.env.REACT_APP_S3_API_URL
                request.httpRequest.headers['Content-Length'] = blob.size;
                request.httpRequest.headers['Content-Type'] = blob.type;
                request.httpRequest.headers['Access-Control-Allow-Origin']= '*';
                request.httpRequest.headers['x-amz-acl'] = 'public-read';
            })
            .send((err : any, data : any) => {
                if (err){  
                    console.log(err, err.stack,);
                } 
                else {      
                    const imageUrl = `${process.env.REACT_APP_S3_CDN_URL}${random}${file_name}`
                    setLoading(false)
                    setDataImage(imageUrl)
                }}
            )} 
        }, 1000);
    }

    // console.log('render')

    return (
        <div>
            <Box>
                <Box>
                    <Box>
                        { loading ? "Loading... " : 
                        <label htmlFor={`file-upload-proof`}>
                            { dataImage !== "" ? null :
                            <input  
                                onChange={handleImageChange}
                                type="file" 
                                accept="image/*"
                                id={`file-upload-proof`}
                            /> 
                            }
                        </label>
                        }
                    </Box>
                    { dataImage === "" ? null :
                    <Box>
                        <img alt="icon file" width="300" src={dataImage} />
                    </Box>
                    }
                </Box>
            </Box>
        </div>
    )
}

export default UploadProof
