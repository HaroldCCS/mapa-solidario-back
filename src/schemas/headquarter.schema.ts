import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose';

export type HeadquarterDocument = HydratedDocument<Headquarter>;


@Schema()
export class Headquarter {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  description: string;

  @Prop({ type: [mongoose.Schema.Types.Number], required: true })
  location: number[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: string;
}

export const HeadquarterSchema = SchemaFactory.createForClass(Headquarter);