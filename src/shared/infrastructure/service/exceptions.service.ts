import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import {
    IException,
    IFormatExceptionMessage,
} from '@shared/domain/exceptions.interface';

@Injectable()
export class ExceptionsService implements IException {
    badRequestException(data: IFormatExceptionMessage): void {
        throw new BadRequestException(
            data.message,
            data.description && {
                description: data.description,
            },
        );
    }
    internalServerErrorException(data?: IFormatExceptionMessage): void {
        throw new InternalServerErrorException(data);
    }
    forbiddenException(data?: IFormatExceptionMessage): void {
        throw new ForbiddenException(
            data.message,
            data.description && {
                description: data.description,
            },
        );
    }
    unauthorizedException(data?: IFormatExceptionMessage): void {
        throw new UnauthorizedException(
            data.message,
            data.description && {
                description: data.description,
            },
        );
    }
    notFoundException(data?: IFormatExceptionMessage): void {
        throw new NotFoundException(
            data.message,
            data.description && {
                description: data.description,
            },
        );
    }
}
