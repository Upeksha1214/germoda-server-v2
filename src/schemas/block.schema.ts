import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import IBlocks from "src/interfaces/blocks.interface";

export type BlockDocument= HydratedDocument<Block>

@Schema({collection:'germoda-block'})
export class Block implements IBlocks{
    @Prop({ required: true })
    blockNum: string;

    @Prop({ required: true })
    blockName: string;
    
    @Prop({ required: true })
    blockSize: any; 
}

export const BlockSchema =SchemaFactory.createForClass(Block);

export const BlockMongooseModule = MongooseModule.forFeature([
    {name : Block.name,schema:BlockSchema}
])