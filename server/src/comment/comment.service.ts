import { Injectable } from '@nestjs/common'
import { CommentEntity } from './comment.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CommentDto } from './comment.dto'

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>
  ) {}

  //Созданеи коментария
  async create(userId: number, dto: CommentDto) {
    //тут просто создаем новый коментарий
    const newComment = this.commentRepository.create({
      message: dto.message,
      video: { id: dto.videoId },
      user: { id: userId }
    })
    return this.commentRepository.save(newComment)
  }
}