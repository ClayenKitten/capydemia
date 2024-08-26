import { S3Repository } from "$lib/server/s3";
import type { User } from ".";

export class AvatarRepository extends S3Repository {
	/** Creates presigned URL to download avatar. */
	public async downloadURL(user: User): Promise<string> {
		return await this.s3.presignedGetObject(
			this.bucket,
			`avatars/${user.id}`,
			7 * 24 * 60 * 60
		);
	}

	/** Creates presigned URL to upload an avatar. */
	public async uploadURL(user: User): Promise<string> {
		return await this.s3.presignedPutObject(
			this.bucket,
			`avatars/${user.id}`,
			5 * 60
		);
	}
}
