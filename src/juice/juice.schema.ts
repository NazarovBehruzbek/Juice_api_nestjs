import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Juice schema
@Schema()
export class Juice extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  imagePath: string;  // Rasm manzili

}

export const JuiceSchema = SchemaFactory.createForClass(Juice);
