import { Client as Minio } from "minio";

export default async function createS3(): Promise<Minio> {
	return new Minio({
		endPoint: process.env.S3_ENDPOINT,
		accessKey: process.env.S3_ACCESS_KEY,
		secretKey: process.env.S3_SECRET_KEY
	});
}
