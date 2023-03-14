import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IBlocks from 'src/interfaces/blocks.interface';
import { Block, BlockDocument } from 'src/schemas/block.schema';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';


@Injectable()
export class BlocksService {
  constructor(
    @InjectModel(Block.name)
    private blockModule:Model<BlockDocument>
  ){}


  async create(block:IBlocks) {
    return await new this.blockModule(block).save();
  }

  async findAll() {
    return await this.blockModule.find();
  }

  async findOne(id: string) {
    return await this.blockModule.findById(id);
  }

  async update(id: string, updateBlockDto: UpdateBlockDto) {
    return await this.blockModule.findByIdAndUpdate(
      id,
      updateBlockDto.block,
    );
  }

  async remove(id: string) {
    return await this.blockModule.findByIdAndRemove(id);
  }
}
