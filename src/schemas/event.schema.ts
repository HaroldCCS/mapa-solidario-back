import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;


export default interface Interface {
  _id: string,
  title: string
  description: string
  status: boolean

  day: Date;
  ubication: string;
  location: number[]
}

@Schema()
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.Date, required: true })
  day: Date;

  @Prop({ required: true })
  ubication: string;

  @Prop({ type: [mongoose.Schema.Types.Number] })
  location: number[];

  @Prop({ type: mongoose.Schema.Types.Boolean, required: true, default: false })
  status: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user_creator: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);