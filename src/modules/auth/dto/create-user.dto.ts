import { messageFactory, messages } from '@app/shared/messages.shared';
import { CommonRegExp } from '@app/shared/regex.shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MaxLength } from 'class-validator';

export class SignInDto {
	@ApiProperty()
	@IsNotEmpty({ message: messageFactory(messages.W2, ['email']) })
	@MaxLength(250, { message: messageFactory(messages.W6, ['250', 'Email']) })
	@Matches(CommonRegExp.EMAIL_REGEXP, { message: messageFactory(messages.W1, ['email address']) })
	readonly email: string;

	@ApiProperty()
	@IsNotEmpty({ message: messageFactory(messages.W2, ['password']) })
	password: string;
}

export class RefreshtokenDto {
	@ApiProperty()
	@IsNotEmpty({ message: messageFactory(messages.W2, ['Refresh token']) })
	refreshToken?: string;
}
